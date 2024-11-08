import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  // Estados para armazenar as informações do usuário
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  // Função de envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica para salvar as informações do perfil (por exemplo, chamando uma API)
    console.log({ fullName, email, phone, city, gender });
    navigate("/"); // Redireciona o usuário após salvar os dados
  };

  return (
    <div className="profile-container">
      <h2>Perfil</h2>
      <div className="profile-info">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome Completo:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Telefone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Cidade:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Gênero:</label>
            <div>
              <input
                type="radio"
                id="masculino"
                value="Masculino"
                checked={gender === "Masculino"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="masculino">Masculino</label>
            </div>
            <div>
              <input
                type="radio"
                id="feminino"
                value="Feminino"
                checked={gender === "Feminino"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="feminino">Feminino</label>
            </div>
            <div>
              <input
                type="radio"
                id="naoInformar"
                value="Prefiro não responder"
                checked={gender === "Prefiro não responder"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="naoInformar">Prefiro não responder</label>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
        <Link to="/">Voltar para a Home</Link>
      </div>
    </div>
  );
}

export default Profile;
