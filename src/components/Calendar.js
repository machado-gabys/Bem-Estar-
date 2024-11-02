import React, { useEffect, useState } from 'react';

const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState({}); // Armazena notas por dia

    useEffect(() => {
        // Carregar notas do localStorage ao iniciar o componente
        const storedNotes = JSON.parse(localStorage.getItem('notes'));
        if (storedNotes) {
            setNotes(storedNotes);
        }
        createCalendar();
    }, []);

    const createCalendar = () => {
        const calendar = document.getElementById("calendar");
        calendar.innerHTML = ''; // Limpa o calendário existente

        for (let day = 1; day <= 31; day++) {
            const dayContainer = document.createElement("div");
            dayContainer.classList.add("day");
            dayContainer.textContent = `Dia ${day}`;
            dayContainer.onclick = () => handleDayClick(day);
            calendar.appendChild(dayContainer);
        }
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setNote(notes[day] || ''); // Carrega a nota existente, se houver
    };

    const handleSaveNote = () => {
        if (selectedDay) {
            const updatedNotes = {
                ...notes,
                [selectedDay]: note,
            };
            setNotes(updatedNotes);
            localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Salva as notas no localStorage
            console.log(`Nota salva para o dia ${selectedDay}: ${note}`); // Log para depuração
            setSelectedDay(null); // Fecha o campo de nota
            setNote(''); // Limpa o campo de nota
            createCalendar(); // Atualiza o calendário para refletir as mudanças
        }
    };

    return (
        <div>
            <div id="calendar" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}></div>

            {selectedDay && (
                <div className="note-modal">
                    <h3>Notas para o Dia {selectedDay}</h3>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={4}
                        placeholder="Digite sua anotação aqui..."
                    />
                    <button onClick={handleSaveNote}>Salvar Nota</button>
                    <button onClick={() => setSelectedDay(null)}>Fechar</button>
                </div>
            )}
        </div>
    );
};

export default Calendar;
