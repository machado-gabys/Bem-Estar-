import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/psychologist.css';
import Sidebar from './Sidebar';

function Psychologist() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);
    const [patients, setPatients] = useState([
        { id: 1, name: 'João Silva', notes: {} },
        { id: 2, name: 'Maria Oliveira', notes: {} },
    ]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [currentNote, setCurrentNote] = useState('');
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(event.target)
            ) {
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

        // Atualiza as notas do paciente selecionado
        setPatients((prevPatients) =>
            prevPatients.map((patient) =>
                patient.id === selectedPatient.id
                    ? {
                          ...patient,
                          notes: {
                              ...patient.notes,
                              [currentDate]: currentNote,
                          },
                      }
                    : patient
            )
        );
        setCurrentNote('');
        setCurrentDate('');
    };

    const showModal = (date) => {
        setCurrentDate(date);
        setCurrentNote(selectedPatient.notes[date] || '');
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

    const renderPatientList = () => (
        <div className="patient-list">
            <h2>Pacientes</h2>
            {patients.map((patient) => (
                <div
                    key={patient.id}
                    className="patient-item"
                    onClick={() => setSelectedPatient(patient)}
                >
                    {patient.name}
                </div>
            ))}
        </div>
    );

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

                <p>
                    Clique em um paciente para visualizar o calendário e as anotações.
                </p>

                {/* Renderiza lista de pacientes ou calendário do paciente */}
                {!selectedPatient ? (
                    renderPatientList()
                ) : (
                    <>
                        <h2>Calendário de {selectedPatient.name}</h2>
                        {renderCalendar()}
                        <button
                            className="back-button"
                            onClick={() => setSelectedPatient(null)}
                        >
                            Voltar à lista de pacientes
                        </button>
                    </>
                )}

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
                            <button onClick={() => setCurrentDate('')}>
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Psychologist;
