import React, { useState } from 'react';
import '../styles/App.css';

const Calendar = ({ userType }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [note, setNote] = useState('');
    const [patientName, setPatientName] = useState('');
    const [notes, setNotes] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        const newNote = { note, date: selectedDate };

        if (userType === 'psicologo') {
            newNote.patient = patientName;
        }

        setNotes((prevNotes) => ({
            ...prevNotes,
            [selectedDate]: [...(prevNotes[selectedDate] || []), newNote],
        }));

        setNote('');
        setPatientName('');
        setIsModalOpen(false);
    };

    const renderDays = () => {
        const days = [];
        for (let day = 1; day <= 30; day++) {
            const date = `${day}/11/2024`;
            days.push(
                <div 
                    key={day} 
                    className="day" 
                    onClick={() => handleDayClick(date)}
                >
                    {day}
                </div>
            );
        }
        return days;
    };

    return (
        <div>
            <h2>Calendário</h2>
            <div id="calendar">{renderDays()}</div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="note-modal">
                        <h3>Adicionar Anotação para {selectedDate}</h3>
                        {userType === 'psicologo' && (
                            <input 
                                type="text" 
                                placeholder="Nome do Paciente" 
                                value={patientName} 
                                onChange={(e) => setPatientName(e.target.value)} 
                            />
                        )}
                        <textarea 
                            placeholder="Escreva sua nota aqui..." 
                            value={note} 
                            onChange={(e) => setNote(e.target.value)} 
                        />
                        <button onClick={handleAddNote}>Adicionar Nota</button>
                        <button onClick={() => setIsModalOpen(false)}>Fechar</button>

                        <h4>Notas Anteriores</h4>
                        <ul>
                            {(notes[selectedDate] || []).map((item, index) => (
                                <li key={index}>
                                    {userType === 'psicologo' && <strong>{item.patient}</strong>}
                                    {item.note}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
