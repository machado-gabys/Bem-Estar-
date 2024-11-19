const { Client } = require('pg');
const bcrypt = require('bcrypt');

// Verifica se a variável DATABASE_URL está definida, caso contrário, define um valor padrão para desenvolvimento
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/postgres';

// Função para criar um cliente PostgreSQL
function createClient() {
    const isLocalhost = process.env.DATABASE_URL.includes('localhost');

    // Cria um novo cliente PostgreSQL com a configuração apropriada de SSL
    return new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: isLocalhost ? false : { rejectUnauthorized: false }  // Desativa SSL se estiver em localhost
    });
}

// Função para adicionar um usuário ao banco de dados
async function addUser(username, name, email, password, role, phone, birthdate, city, gender) {
    const client = createClient();
    try {
        await client.connect(); // Conecta ao banco de dados
        console.log('Conectado ao banco de dados'); // Verifica se a conexão foi estabelecida

        // Hash da senha antes de armazená-la
        const hashedPassword = await bcrypt.hash(password, 10);

        // Consulta SQL para inserir um novo usuário no banco de dados
        const query = `
            INSERT INTO users (username, name, email, password, role, phone, birthdate, city, gender)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
        const values = [username, name, email, hashedPassword, role, phone, birthdate, city, gender];

        // Executa a consulta SQL
        const res = await client.query(query, values);

        // Loga o resultado da inserção
        console.log('Usuário inserido com sucesso:', res.rows[0]);

        // Retorna o usuário recém-criado
        return res.rows[0];
    } catch (err) {
        console.error('Erro ao adicionar usuário:', err); // Logando o erro completo
        throw new Error('Erro ao adicionar usuário');
    } finally {
        await client.end(); // Fecha a conexão ao final
    }
}

// Função para obter a lista de usuários do banco de dados
async function getUsers() {
    const client = createClient();
    try {
        await client.connect();
        console.log('Conectado ao banco de dados para obter usuários');

        // Consulta SQL para selecionar alguns campos dos usuários
        const res = await client.query('SELECT id, username, name, email, role FROM users');

        // Retorna a lista de usuários
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter usuários:', err);
        throw err;
    } finally {
        await client.end(); // Fecha a conexão ao final
    }
}

// Função para obter o perfil de um usuário pelo ID
async function getUserProfile(id) {
    const client = createClient();
    try {
        await client.connect();
        console.log('Conectado ao banco de dados para obter perfil do usuário');

        // Consulta SQL para obter os dados do usuário pelo ID (sem a senha)
        const query = 'SELECT id, username, name, email, role, phone, birthdate, city, gender FROM users WHERE id = $1';
        const res = await client.query(query, [id]);

        if (res.rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        // Retorna os dados do usuário, sem a senha
        return res.rows[0];
    } catch (err) {
        console.error('Erro ao obter perfil do usuário:', err);
        throw new Error('Erro ao obter perfil do usuário');
    } finally {
        await client.end(); // Fecha a conexão ao final
    }
}

// Exporta as funções para uso em outros arquivos
module.exports = {
    addUser,
    getUsers,
    getUserProfile,  // Função adicionada para obter o perfil do usuário
    createClient,
};

// Log para verificar a configuração da URL do banco de dados
console.log('DATABASE_URL:', process.env.DATABASE_URL);
