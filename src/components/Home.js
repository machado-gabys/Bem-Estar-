import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Sidebar from './Sidebar';

function Home({ userType }) {
    const [notes, setNotes] = useState({});
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [currentNote, setCurrentNote] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null); // Apenas para psicólogo
    const [patients, setPatients] = useState([
        { id: 1, name: 'João Silva', notes: {} },
        { id: 2, name: 'Maria Oliveira', notes: {} },
    ]); // Apenas para psicólogo

    const navigate = useNavigate();
    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);

    // Simulação de notícias sobre saúde mental
    const mentalHealthNews = [
        {
            title: '10 dicas para melhorar sua saúde mental',
            description: 'Descubra como pequenas mudanças podem impactar positivamente seu bem-estar emocional.',
            link: 'https://www.example.com/10-dicas-saude-mental',
            image: 'https://via.placeholder.com/150',
        },
        {
            title: 'Como lidar com o estresse diário',
            description: 'Especialistas explicam como técnicas simples podem ajudar no manejo do estresse.',
            link: 'https://www.example.com/como-lidar-estresse',
            image: 'https://via.placeholder.com/150',
        },
        {
            title: 'A importância do sono para a saúde mental',
            description: 'Entenda como o sono afeta diretamente sua qualidade de vida e saúde mental.',
            link: 'https://www.example.com/sono-saude-mental',
            image: 'https://via.placeholder.com/150',
        },
    ];

    const handleSaveNote = () => {
        if (userType === 'psychologist' && selectedPatient) {
            // Atualiza notas do paciente selecionado
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
        } else {
            // Atualiza notas do paciente
            setNotes((prevNotes) => ({
                ...prevNotes,
                [currentDate]: currentNote,
            }));
        }
        setModalVisible(false);
    };

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

    const showModal = (date) => {
        setCurrentDate(date);
        if (userType === 'psychologist' && selectedPatient) {
            setCurrentNote(selectedPatient.notes[date] || '');
        } else {
            setCurrentNote(notes[date] || '');
        }
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleLogout = () => {
        navigate('/login');
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

    const renderCalendar = () => {
        const patientName = userType === 'psychologist' && selectedPatient ? selectedPatient.name : '';
        return (
            <div className="calendar-section">
                {userType === 'psychologist' && selectedPatient && (
                    <h2>Calendário de {patientName}</h2>
                )}
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
            </div>
        );
    };

    const renderNews = () => (
        <div className="news-section">
            <h2>Notícias sobre Saúde Mental</h2>
            <div className="news-list">
                {mentalHealthNews.map((news, index) => (
                    <div key={index} className="news-item">
                        <img src={news.image} alt={news.title} className="news-image" />
                        <div className="news-content">
                            <h3>{news.title}</h3>
                            <p>{news.description}</p>
                            <a href={news.link} target="_blank" rel="noopener noreferrer">
                                Leia mais
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="home-container">
            <div
                className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}
                ref={sidebarRef}
            >
                <Sidebar onLogout={handleLogout} />
            </div>

            <div className="content">
                <div
                    className={`hamburger-icon ${isSidebarVisible ? 'open' : ''}`}
                    onClick={toggleSidebar}
                    ref={hamburgerRef}
                >
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>

                <h1>Bem-vindo, {userType === 'psychologist' ? 'Psicólogo' : 'Paciente'}</h1>

                {userType === 'psychologist' ? (
                    !selectedPatient ? (
                        renderPatientList()
                    ) : (
                        <>
                            {renderCalendar()}
                            <button
                                className="back-button"
                                onClick={() => setSelectedPatient(null)}
                            >
                                Voltar à lista de pacientes
                            </button>
                        </>
                    )
                ) : (
                    <>
                        <p>Aqui você pode ver o calendário, adicionar anotações e acessar informações sobre saúde mental.</p>
                        {renderCalendar()}
                        {renderNews()}
                    </>
                )}

                {isModalVisible && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="note-modal" onClick={(e) => e.stopPropagation()}>
                            <h3>Adicionar Anotação</h3>
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                placeholder="Digite sua anotação aqui..."
                            />
                            <button onClick={handleSaveNote}>Salvar</button>
                            <button onClick={closeModal}>Fechar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
