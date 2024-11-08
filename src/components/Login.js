// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ users }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            // Redireciona para a página adequada, baseada no tipo de usuário
            if (user.userType === 'psicologo') {
                navigate('/psychologist'); // Psicólogo
            } else {
                navigate('/home'); // Paciente
            }
        } else {
            alert('Usuário ou senha inválidos. Por favor, tente novamente.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
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
                <p>
                    Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
