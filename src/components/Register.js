import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('paciente');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        // Chama a função para adicionar o usuário
        onRegister({ username, password, userType });
        alert('Cadastro realizado com sucesso!');
        
        // Redireciona para a página de login após o cadastro
        navigate('/');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Cadastro</h2>
                <form onSubmit={handleRegister}>
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
                    <input 
                        type="password" 
                        placeholder="Confirme a Senha" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="paciente">Paciente</option>
                        <option value="psicologo">Psicólogo</option>
                    </select>
                    <button type="submit">Cadastrar</button>
                </form>
                <p>
                    Já tem uma conta? <Link to="/">Faça login aqui</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
