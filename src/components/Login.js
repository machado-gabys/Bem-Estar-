import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            alert('Por favor, preencha ambos os campos.');
            return;
        }

        try {
            // Fazer requisição para o backend para validar o login
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log('Resposta do backend:', data); // Log para ver a resposta do backend

            if (response.ok) {
                // Login bem-sucedido, redirecionar com base no tipo de usuário
                const { user } = data;
                localStorage.setItem('loggedInUser', JSON.stringify(user));

                if (user.userType === 'psicologo') {
                    navigate('/psychologist'); // Psicólogo
                } else {
                    navigate('/home'); // Paciente
                }
            } else {
                // Se o login falhar, exibir a mensagem de erro
                alert(data.message);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
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
