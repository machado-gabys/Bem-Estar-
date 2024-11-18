const { Client } = require('pg');
require('dotenv').config({ path: './App.env' });

// Exibir a URL de conexão usada
console.log('Valor atual de DATABASE_URL:', process.env.DATABASE_URL);

// Verificar se a conexão é local (localhost)
const isLocalhost = process.env.DATABASE_URL.includes('localhost');

// Função para testar a conexão com o banco de dados
async function testConnection() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: isLocalhost ? false : { rejectUnauthorized: false },
    });

    try {
        await client.connect();
        console.log('Conectado ao banco de dados com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar:', err);
    } finally {
        await client.end();
    }
}

// Chamar a função para testar a conexão
testConnection();
