import React, { useState } from 'react';
import '../styles/App.css';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [note, setNote] = useState('');
    const [patientName, setPatientName] = useState('');
    const [notes, setNotes] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true); // Abre o modal ao clicar em um dia
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        if (selectedDate && patientName && note) {
            const newNote = {
                patient: patientName,
                note,
                date: selectedDate,
            };

            setNotes((prevNotes) => ({
                ...prevNotes,
                [selectedDate]: [...(prevNotes[selectedDate] || []), newNote],
            }));

            setNote('');
            setPatientName('');
            setIsModalOpen(false); // Fecha o modal após adicionar a nota
            alert('Nota adicionada com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    const renderDays = () => {
        const days = [];
        for (let day = 1; day <= 30; day++) {
            const date = `${day}/11/2024`; // Exemplo de data
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
                        <input 
                            type="text" 
                            placeholder="Nome do Paciente" 
                            value={patientName} 
                            onChange={(e) => setPatientName(e.target.value)} 
                            required
                        />
                        <textarea 
                            placeholder="Escreva sua nota aqui..." 
                            value={note} 
                            onChange={(e) => setNote(e.target.value)} 
                            required
                        />
                        <button onClick={handleAddNote}>Adicionar Nota</button>
                        <button onClick={() => setIsModalOpen(false)}>Fechar</button>

                        {/* Exibir notas anteriores para esta data */}
                        <h4>Notas Anteriores</h4>
                        <ul>
                            {(notes[selectedDate] || []).map((item, index) => (
                                <li key={index}>
                                    <strong>{item.patient}</strong> - {item.note}
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
