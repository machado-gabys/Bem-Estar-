import React from 'react';
import Calendar from './Calendar'; // Importando o Calendar
import Sidebar from './Sidebar'; // Importando o Sidebar

const Home = () => {
    return (
        <div>
            <Sidebar /> {/* Adicionando Sidebar */}
            <h2>Bem vindo!</h2>            
            <Calendar /> {/* Chamando o componente Calendar aqui */}
        </div>
    );
};

export default Home;
