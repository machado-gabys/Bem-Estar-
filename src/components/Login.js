import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            alert('Por favor, preencha ambos os campos.');
            return;
        }
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        const foundUser = storedUsers.find(user => user.username.trim() === username.trim() && user.password.trim() === password.trim());

        if (foundUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

            if (foundUser.userType === 'psicologo') {
                navigate('/psychologist'); //Psicologo
            } else {
                navigate('/home'); //Paciente
            }
        } else {
            alert('Usuário ou senha inválidos. Por favor, tente novamente.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Bem vindo ao seu BemEstar+</h1>
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
