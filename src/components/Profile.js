import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Profile.css';

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(""); 
  const [gender, setGender] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setFullName(storedUser.profile.name);
      setEmail(storedUser.profile.email);
      setPhone(storedUser.profile.phone);
      setCity(storedUser.profile.city);
      setGender(storedUser.profile.gender);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    //informações pelo localstorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      storedUser.profile = {
        ...storedUser.profile,
        name: fullName,
        email,
        phone,
        city,
        gender, 
      };

      // Salva os dados atualizados no localStorage
      localStorage.setItem("user", JSON.stringify(storedUser));
    }

    alert("Informações do perfil atualizadas com sucesso!");
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

          {/* Campo de gênero após os campos de texto */}
          <div>
            <label>Gênero:</label>
            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
              <div>
                <input
                  type="radio"
                  id="masculino"
                  value="masculino"
                  checked={gender === "masculino"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="masculino">Masculino</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="feminino"
                  value="feminino"
                  checked={gender === "feminino"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="feminino">Feminino</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="naoInformar"
                  value="preferNotToAnswer"
                  checked={gender === "preferNotToAnswer"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="naoInformar">Prefiro não responder</label>
              </div>
            </div>
          </div>

          <button type="submit" className="save-button">Salvar</button>
        </form>
        {/* Link para a página Home */}
        <Link to="/home">Voltar para a Home</Link>
      </div>
    </div>
  );
}

export default Profile;
