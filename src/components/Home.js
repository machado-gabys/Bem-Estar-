import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const location = useLocation();
    const userType = location.state?.userType; // Obtém o tipo de usuário do estado da navegação

    const [selectedDate, setSelectedDate] = useState(null);
    const [patientName, setPatientName] = useState('');
    const [notes, setNotes] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [annotations, setAnnotations] = useState({}); // Usar um objeto para armazenar anotações por data

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [...Array(daysInMonth).keys()].map(i => i + 1);
    const firstDay = new Date(year, month, 1).getDay();

    const handleDayClick = (day) => {
        setSelectedDate(day);
        const dateKey = `${year}-${month + 1}-${day}`; // Formata a data como chave
        const existingAnnotation = annotations[dateKey] || { patientName: '', notes: '' };
        setPatientName(existingAnnotation.patientName);
        setNotes(existingAnnotation.notes);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        const dateKey = `${year}-${month + 1}-${selectedDate}`; // Formata a data como chave
        setAnnotations({
            ...annotations,
            [dateKey]: {
                patientName: userType === 'psicologo' ? patientName : null,
                notes: notes,
            },
        });
        console.log('Anotações salvas:', { ...annotations, [dateKey]: { patientName, notes } }); // Para verificar no console
        setPatientName(''); // Limpa os campos após salvar
        setNotes('');
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2>{userType === 'psicologo' ? 'Calendário do Psicólogo' : 'Calendário do Paciente'}</h2>
            <div className="calendar">
                <div className="calendar-header">
                    <div>Dom</div>
                    <div>Seg</div>
                    <div>Ter</div>
                    <div>Qua</div>
                    <div>Qui</div>
                    <div>Sex</div>
                    <div>Sab</div>
                </div>
                <div className="calendar-body">
                    {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} className="calendar-day empty"></div>)}
                    {daysArray.map(day => (
                        <div key={day} className="calendar-day" onClick={() => handleDayClick(day)}>
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="note-modal">
                        <h3>Anotações para {selectedDate}</h3>
                        {userType === 'psicologo' && (
                            <input
                                type="text"
                                placeholder="Nome do Paciente"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                        )}
                        <textarea
                            placeholder="Anotações"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={() => setIsModalOpen(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
