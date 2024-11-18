import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    // Estados para armazenar os valores dos campos de entrada
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
    const navigate = useNavigate();

    // Função para lidar com o registro do usuário
    const handleRegister = async (e) => {
        e.preventDefault();

        // Verifica se todos os campos estão preenchidos
        if (!username || !password || !confirmPassword || !name || !email || !phone || !birthdate || !city) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        // Valida o formato do e-mail
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Validação de telefone (apenas números e tamanho mínimo de 10)
        const phonePattern = /^[0-9]{10,11}$/;
        if (!phonePattern.test(phone)) {
            alert('Por favor, insira um telefone válido.');
            return;
        }

        // Validação da senha (mínimo de 6 caracteres)
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        // Criação do objeto do usuário para enviar para o backend
        const newUser = {
            username,
            password,
            userType,
            name,
            email,
            phone,
            birthdate,
            city,
            gender,
        };

        try {
            // Requisição POST para o backend usando axios
            const response = await axios.post('http://localhost:5000/api/register', newUser);

            if (response.status === 201) {
                alert('Cadastro realizado com sucesso!');
                navigate('/');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);

            // Caso o backend retorne uma mensagem de erro específica
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Erro ao cadastrar: ${error.response.data.message}`);
            } else {
                alert('Erro ao cadastrar. Por favor, tente novamente mais tarde.');
            }
        }
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

                    {/* Seção para selecionar o tipo de usuário */}
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

                    {/* Campos de Perfil */}
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

                    {/* Opção de Gênero */}
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
