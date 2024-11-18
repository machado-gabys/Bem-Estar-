const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./Db'); // Arquivo Db.js para conexão com o banco de dados
const bcrypt = require('bcrypt'); // Biblioteca para hash de senhas
require('dotenv').config({ path: './App.env' }); // Carrega variáveis de ambiente do arquivo App.env

const app = express();
const PORT = process.env.PORT || 5000;

// Habilitar CORS para permitir requisições do frontend que está rodando na porta 3000
app.use(cors({
    origin: 'http://localhost:3000' // Permitir o acesso do frontend
}));

// Middleware para ler JSON no corpo das requisições
app.use(bodyParser.json());

// Endpoint para registro de usuário
app.post('/api/register', async (req, res) => {
    const { username, password, userType, name, email, phone, birthdate, city, gender } = req.body;

    console.log('Requisição de registro recebida:', req.body); // Log para verificar os dados recebidos

    try {
        // Conectar ao banco de dados
        const client = db.createClient();
        await client.connect();
        console.log('Conexão com o banco de dados estabelecida');

        // Hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Salvar o novo usuário no banco de dados
        const result = await client.query(
            'INSERT INTO users (username, password, role, name, email, phone, birthdate, city, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [username, hashedPassword, userType, name, email, phone, birthdate, city, gender]
        );

        console.log('Usuário registrado:', result.rows[0]);
        await client.end();

        res.status(201).json({ message: 'Usuário registrado com sucesso', user: result.rows[0] });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});

// Endpoint para login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Requisição de login recebida:', req.body); // Log para verificar os dados recebidos

    try {
        // Conectar ao banco de dados
        const client = db.createClient();
        await client.connect();
        console.log('Conexão com o banco de dados estabelecida');

        // Consultar o banco de dados para encontrar o usuário pelo username
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        console.log('Resultado da consulta ao banco:', result.rows);

        // Verificar se encontrou o usuário
        const user = result.rows[0];

        if (!user) {
            console.log('Usuário não encontrado');
            await client.end();
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        console.log('Usuário encontrado:', user);

        // Comparar a senha fornecida com a senha armazenada (hash)
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log('Resultado da comparação de senha:', isValidPassword);

        if (isValidPassword) {
            await client.end();
            // Remover a senha antes de retornar os dados do usuário por segurança
            const { password, ...userData } = user;
            return res.status(200).json({ message: 'Login bem-sucedido', user: userData });
        } else {
            console.log('Senha inválida');
            await client.end();
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

    } catch (error) {
        console.error('Erro ao validar login:', error);
        res.status(500).json({ message: 'Erro ao validar login' });
    }
});

// Configuração do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
