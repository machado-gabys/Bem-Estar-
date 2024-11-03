import React, { useState } from 'react';

const Psychologist = () => {
    const [patients, setPatients] = useState([]);
    const [patientName, setPatientName] = useState('');
    const [note, setNote] = useState('');
    
    const addPatient = () => {
        if (patientName) {
            setPatients([...patients, { name: patientName, notes: [] }]);
            setPatientName('');
        }
    };

    const addNote = (index) => {
        const updatedPatients = [...patients];
        updatedPatients[index].notes.push(note);
        setPatients(updatedPatients);
        setNote('');
    };

    return (
        <div>
            <h2>Página do Psicólogo</h2>
            <input 
                type="text" 
                placeholder="Nome do Paciente" 
                value={patientName} 
                onChange={(e) => setPatientName(e.target.value)} 
            />
            <button onClick={addPatient}>Adicionar Paciente</button>

            <h3>Pacientes</h3>
            <ul>
                {patients.map((patient, index) => (
                    <li key={index}>
                        {patient.name}
                        <input 
                            type="text" 
                            placeholder="Anotação" 
                            value={note} 
                            onChange={(e) => setNote(e.target.value)} 
                        />
                        <button onClick={() => addNote(index)}>Adicionar Anotação</button>
                        <ul>
                            {patient.notes.map((n, i) => <li key={i}>{n}</li>)}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Psychologist;
