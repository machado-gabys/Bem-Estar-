import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate e Link

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('paciente');

    const navigate = useNavigate(); // Usar o hook useNavigate

    const handleRegister = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para salvar o usuário (por exemplo, no localStorage ou em um backend)
        console.log({ username, password, userType });
        alert('Cadastro realizado com sucesso!');
        
        // Redireciona para a página de login após o cadastro
        navigate('/'); // Redireciona para a página de login
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
