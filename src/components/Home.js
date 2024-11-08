// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Sidebar from './Sidebar';

function Home() {
    const [notes, setNotes] = useState({});
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [currentNote, setCurrentNote] = useState('');

    const navigate = useNavigate();

    // Função para salvar anotações
    const handleSaveNote = () => {
        setNotes(prevNotes => ({
            ...prevNotes,
            [currentDate]: currentNote,
        }));
        setModalVisible(false);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const showModal = (date) => {
        setCurrentDate(date);
        setCurrentNote(notes[date] || '');
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // Função de logout que redireciona para a página de login
    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="home-container">
            {/* Menu lateral (Sidebar) */}
            <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
                <Sidebar onLogout={handleLogout} />
            </div>

            <div className="content">
                {/* Ícone do menu hambúrguer */}
                <div className="hamburger-icon" onClick={toggleSidebar}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>

                <h1>Bem-vindo à Home</h1>

                <p>Aqui você pode ver o calendário e adicionar suas anotações.</p>

                {/* Calendário */}
                <div className="calendar">
                    <div className="calendar-header">
                        <div>Dom</div>
                        <div>Seg</div>
                        <div>Ter</div>
                        <div>Qua</div>
                        <div>Qui</div>
                        <div>Sex</div>
                        <div>Sáb</div>
                    </div>
                    <div className="calendar-body">
                        {/* Simulação de dias (substituir com dados reais do calendário) */}
                        {Array.from({ length: 30 }, (_, index) => {
                            const day = index + 1;
                            const date = `2024-11-${String(day).padStart(2, '0')}`;
                            return (
                                <div
                                    key={date}
                                    className={`calendar-day ${day % 7 === 0 ? 'empty' : ''}`}
                                    onClick={() => showModal(date)} 
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Modal de anotações */}
                {isModalVisible && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="note-modal" onClick={(e) => e.stopPropagation()}>
                            <h3>Adicionar Anotação</h3>
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                placeholder="Digite sua anotação aqui..."
                            />
                            <button onClick={handleSaveNote}>Salvar</button>
                            <button onClick={closeModal}>Fechar</button> {/* Botão para fechar o modal */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
