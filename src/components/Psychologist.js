import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/psychologist.css';
import Sidebar from './Sidebar';

const Psychologist = () => {
    const [patients, setPatients] = useState([]);
    const [patientName, setPatientName] = useState('');
    const [note, setNote] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [dailyNotes, setDailyNotes] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const addNoteForDate = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };
    const addPatient = () => {
        if (patientName && selectedDate) {
            const updatedDailyNotes = { ...dailyNotes };
            if (!updatedDailyNotes[selectedDate]) {
                updatedDailyNotes[selectedDate] = [];
            }
            updatedDailyNotes[selectedDate].push({ patientName, note });
            setDailyNotes(updatedDailyNotes);
            setPatientName('');
            setNote('');
            setIsModalOpen(false); 
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPatientName('');
        setNote('');
    };

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const handleLogout = () => {
        navigate('/');
    };
    const handleExitNote = () => {
        setIsModalOpen(false);
        setPatientName('');
        setNote('');
    };
    const renderCalendar = () => {
        const days = [];
        for (let day = 1; day <= 30; day++) {
            const date = `2024-11-${String(day).padStart(2, '0')}`;
            days.push(
                <button key={date} onClick={() => addNoteForDate(date)}>
                    {day}
                </button>
            );
        }
        return days;
    };
    const renderNotesForDate = () => {
        const notesForDate = dailyNotes[selectedDate] || [];
        return notesForDate.map((entry, index) => (
            <div key={index}>
                <strong>Paciente:</strong> {entry.patientName}
                <br />
                <strong>Anotação:</strong> {entry.note}
            </div>
        ));
    };

    return (
        <div className="psychologist-container">
            {/* Menu lateral (Sidebar) */}
            <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
                <Sidebar onLogout={handleLogout} /> {/* Passando a função de logout para o Sidebar */}
            </div>

            <div className="main-content">
                {/* Ícone do menu hambúrguer */}
                <div className="hamburger-icon" onClick={toggleSidebar}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>

                <h2>Página do Psicólogo</h2>

                {/* Calendário */}
                <div className="calendar">
                    <h3>Calendário</h3>
                    <div className="calendar-grid">
                        {renderCalendar()}
                    </div>
                </div>

                {/* Pop-up Modal para adicionar anotações */}
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-btn" onClick={closeModal}>&times;</span>
                            <h3>Anotações para o Dia {selectedDate}</h3>
                            <input
                                type="text"
                                placeholder="Nome do Paciente"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                            <textarea
                                placeholder="Anotação"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <button onClick={addPatient}>Salvar Anotação</button>
                            {/* Exibe as anotações salvas para o dia selecionado */}
                            <div className="saved-notes">
                                {renderNotesForDate()}
                            </div>
                            {/* Botão para sair do modal sem salvar */}
                            <button onClick={handleExitNote}>Sair sem salvar</button>
                        </div>
                    </div>
                )}

                {/* As anotações não serão mais exibidas na parte inferior da tela */}
            </div>
        </div>
    );
};

export default Psychologist;
