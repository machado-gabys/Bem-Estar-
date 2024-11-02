import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const correctUsername = 'admin'; // Exemplo de usuário
    const correctPassword = '1234'; // Exemplo de senha

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === correctUsername && password === correctPassword) {
            window.location.href = '/calendar'; // Redireciona para o calendário
        } else {
            alert('Usuário ou senha incorretos');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Usuário" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
