import React from 'react';
import Calendar from './Calendar'; // Importando o Calendar

const Home = () => {
    return (
        <div>
            <h2>Bem vindo!</h2>            
            <Calendar /> {/* Chamando o componente Calendar aqui */}
        </div>
    );
};

export default Home;
