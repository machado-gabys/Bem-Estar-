import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Usar o hook useNavigate

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verifica se o usuário existe e se a senha está correta
        const user = users.find(user => user.username === username && user.password === password);
        
        if (user) {
            // Redireciona com base no tipo de usuário
            if (user.userType === 'psicologo') {
                navigate('/psychologist'); // Redireciona para o menu do psicólogo
            } else {
                navigate('/home'); // Redireciona para o menu do paciente
            }
        } else {
            alert('Usuário ou senha inválidos!');
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
                    Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
