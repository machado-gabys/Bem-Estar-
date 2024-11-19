const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Assumindo que você tem um arquivo db.js para configurar a conexão com o banco de dados

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Chave secreta para o JWT (idealmente, mova isso para uma variável de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || 'secrect-key';

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Assumindo "Bearer token"

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user; // Adiciona os dados do usuário ao request
        next();
    });
};

// Endpoint para login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const client = db.createClient();
        await client.connect();

        // Verificar se o usuário existe
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            await client.end();
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        const user = result.rows[0];

        // Comparar a senha fornecida com a senha armazenada no banco de dados
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            await client.end();
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        // Gerar um token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h', // Expiração do token
        });

        await client.end();

        // Retornar o token e o usuário
        res.status(200).json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('Erro ao tentar autenticar o usuário:', error);
        res.status(500).json({ message: 'Erro ao autenticar o usuário' });
    }
});

// Endpoint para pegar os dados do perfil do usuário
app.get('/api/user/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar se o id do usuário no token corresponde ao id solicitado
        if (parseInt(req.user.id) !== parseInt(id)) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        const client = db.createClient();
        await client.connect();

        // Buscar dados do usuário no banco de dados pelo ID
        const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            await client.end();
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const user = result.rows[0];
        await client.end();

        // Retornar os dados do usuário (sem a senha)
        const { password, ...userData } = user;
        res.status(200).json(userData);
    } catch (error) {
        console.error('Erro ao buscar o perfil:', error);
        res.status(500).json({ message: 'Erro ao buscar o perfil' });
    }
});

// Endpoint para atualizar os dados do perfil do usuário
app.put('/api/user/update', authenticateToken, async (req, res) => {
    const { username, name, email, phone, city, gender } = req.body;

    try {
        const client = db.createClient();
        await client.connect();

        // Atualizar os dados do usuário no banco de dados PostgreSQL
        const query = `
            UPDATE users
            SET name = $1, email = $2, phone = $3, city = $4, gender = $5
            WHERE username = $6
            RETURNING *;
        `;
        const values = [name, email, phone, city, gender, username];
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            await client.end();
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const updatedUser = result.rows[0];
        await client.end();

        // Retornar os dados atualizados do usuário (sem a senha)
        const { password, ...userData } = updatedUser;
        res.status(200).json(userData);
    } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
        res.status(500).json({ message: 'Erro ao atualizar o perfil' });
    }
});

// Endpoint para registro de novo usuário
app.post('/api/register', async (req, res) => {
    const { username, password, name, email, phone, city, gender } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Criptografando a senha

        const client = db.createClient();
        await client.connect();

        // Inserir o novo usuário no banco de dados
        const query = `
            INSERT INTO users (username, password, name, email, phone, city, gender)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const values = [username, hashedPassword, name, email, phone, city, gender];
        const result = await client.query(query, values);

        const newUser = result.rows[0];
        await client.end();

        // Retornar os dados do usuário, sem a senha
        const { password: _, ...userData } = newUser;
        res.status(201).json(userData);
    } catch (error) {
        console.error('Erro ao registrar o usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar o usuário' });
    }
});

// Inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
