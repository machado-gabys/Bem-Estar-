import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Verifica se ambos os campos foram preenchidos
        if (!username.trim() || !password.trim()) {
            alert('Por favor, preencha ambos os campos.');
            return;
        }

        try {
            // Requisição para o backend para validar o login
            const response = await axios.post('http://localhost:5000/api/login', { username, password });

            if (response.status === 200) {
                // Login bem-sucedido, redirecionar para a página apropriada
                const { user } = response.data;

                // Salva os dados do usuário no localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(user));

                // Redireciona com base no tipo de usuário
                if (user.userType === 'psicologo') {
                    navigate('/psychologist'); // Página do psicólogo
                } else {
                    navigate('/home'); // Página do paciente
                }
            } else {
                // Caso o login falhe, exibe a mensagem de erro
                alert(response.data.message || 'Erro ao fazer login.');
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
                        autoComplete="current-user"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        autoComplete="current-password"
                        required
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
