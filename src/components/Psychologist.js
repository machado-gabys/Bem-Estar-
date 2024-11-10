import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/psychologist.css';
import Sidebar from './Sidebar';

function Psychologist() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);
    const [notes, setNotes] = useState({});
    const [currentDate, setCurrentDate] = useState('');
    const [currentNote, setCurrentNote] = useState('');
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    // Fecha o menu quando clicar fora do menu lateral
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && 
                hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
                setSidebarVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleLogout = () => {
        navigate('/login');
    };

    const handleSaveNote = () => {
        if (currentNote.trim() === '') {
            alert('A anotação não pode estar vazia!');
            return;
        }

        setNotes((prevNotes) => ({
            ...prevNotes,
            [currentDate]: currentNote,
        }));
        setCurrentNote('');
        setCurrentDate('');
    };


    const showModal = (date) => {
        setCurrentDate(date);
        setCurrentNote(notes[date] || '');
    };

    const renderCalendar = () => {
        return (
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
        );
    };

    return (
        <div className="psychologist-container">
            {/* Menu lateral (Sidebar) */}
            <div
                className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}
                ref={sidebarRef}
            >
                <Sidebar onLogout={handleLogout} />
            </div>

            <div className="content">
                {/* Ícone do menu hambúrguer */}
                <div
                    className={`hamburger-icon ${isSidebarVisible ? 'open' : ''}`}
                    onClick={toggleSidebar}
                    ref={hamburgerRef}
                >
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>

                <h1>Bem-vindo, Psicólogo</h1>

                <p>Aqui você pode ver suas consultas, adicionar pacientes e anotações.</p>

                {/* Calendário */}
                {renderCalendar()}

                {/* Modal de anotações */}
                {currentDate && (
                    <div className="modal-overlay">
                        <div className="note-modal">
                            <h3>Adicionar Anotação para {currentDate}</h3>
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                placeholder="Digite sua anotação aqui..."
                            />
                            <button onClick={handleSaveNote}>Salvar</button>
                            <button onClick={() => setCurrentDate('')}>Fechar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Psychologist;
