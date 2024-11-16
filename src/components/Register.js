import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('paciente');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('preferNotToAnswer');
    const [selectedPsychologist, setSelectedPsychologist] = useState('');
    const navigate = useNavigate();

    const psychologists = JSON.parse(localStorage.getItem('users'))?.filter(user => user.userType === 'psicologo') || [];

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword || !name || !email || !phone || !birthdate || !city) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        if (userType === 'paciente' && !selectedPsychologist) {
            alert('Por favor, selecione um psicólogo.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.username === username);
        if (userExists) {
            alert('Nome de usuário já existe. Escolha outro.');
            return;
        }

        const newUser = {
            username,
            password,
            userType,
            profile: {
                name,
                email,
                phone,
                birthdate,
                city,
                gender,
            },
            assignedPsychologist: userType === 'paciente' ? selectedPsychologist : null,
        };

        if (userType === 'paciente') {
            const psychologistIndex = users.findIndex(user => user.username === selectedPsychologist);
            if (psychologistIndex !== -1) {
                if (!users[psychologistIndex].assignedPatients) {
                    users[psychologistIndex].assignedPatients = [];
                }
                users[psychologistIndex].assignedPatients.push(newUser.username);
            }
        }

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Cadastro realizado com sucesso!');
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
                    
                    <div>
                        <label><strong>Tipo de Usuário</strong></label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <label>
                                <input 
                                    type="radio" 
                                    name="userType" 
                                    value="paciente" 
                                    checked={userType === 'paciente'} 
                                    onChange={() => setUserType('paciente')} 
                                />
                                Paciente
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="userType" 
                                    value="psicologo" 
                                    checked={userType === 'psicologo'} 
                                    onChange={() => setUserType('psicologo')} 
                                />
                                Psicólogo
                            </label>
                        </div>
                    </div>

                    {userType === 'paciente' && (
                        <div>
                            <label><strong>Selecione um Psicólogo</strong></label>
                            <select
                                value={selectedPsychologist}
                                onChange={(e) => setSelectedPsychologist(e.target.value)}
                            >
                                <option value="">Escolha um psicólogo</option>
                                {psychologists.map((psychologist, index) => (
                                    <option key={index} value={psychologist.username}>
                                        {psychologist.profile?.name || psychologist.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <input 
                        type="text" 
                        placeholder="Nome Completo" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Telefone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        placeholder="Data de Nascimento" 
                        value={birthdate} 
                        onChange={(e) => setBirthdate(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Cidade" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                    />

                    <div>
                        <label><strong>Opção de Gênero</strong></label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <label>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="masculino" 
                                    checked={gender === 'masculino'} 
                                    onChange={() => setGender('masculino')} 
                                />
                                Masculino
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="feminino" 
                                    checked={gender === 'feminino'} 
                                    onChange={() => setGender('feminino')} 
                                />
                                Feminino
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="preferNotToAnswer" 
                                    checked={gender === 'preferNotToAnswer'} 
                                    onChange={() => setGender('preferNotToAnswer')} 
                                />
                                Prefiro não responder
                            </label>
                        </div>
                    </div>

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
