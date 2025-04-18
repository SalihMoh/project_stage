import React, { useState, useEffect } from "react";
import axios from "axios";
//import '../../css/Admin/CitoyenList.css';

const CitoyensTable = () => {
  const [citoyens, setCitoyens] = useState([]);
  const [filteredCitoyens, setFilteredCitoyens] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");
  const [searchNom, setSearchNom] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/citoyens")
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setCitoyens(response.data.data);
          setFilteredCitoyens(response.data.data);
        } else {
          console.error("Expected an array of citoyens in response.data.data");
        }
      })
      .catch((error) => {
        console.error("Error fetching citoyens:", error);
      });
  }, []);

  useEffect(() => {
    let results = [...citoyens];

    // Filter by CIN
    if (searchCIN) {
      results = results.filter(citoyen => 
        citoyen.CIN.toLowerCase().includes(searchCIN.toLowerCase())
      );
    }

    // Filter by Nom (personnel or familial)
    if (searchNom) {
      results = results.filter(citoyen => 
        citoyen.Nom_personelle.toLowerCase().includes(searchNom.toLowerCase()) ||
        citoyen.Nom_familliale.toLowerCase().includes(searchNom.toLowerCase())
      );
    }

    setFilteredCitoyens(results);
  }, [citoyens, searchCIN, searchNom]);

  return (
    <div className="ListCitoyens">
      <h1>Liste Des Citoyens</h1>
      <div className="div-Filtre">
        <input 
          placeholder="Recherche par CIN"
          value={searchCIN}
          onChange={(e) => setSearchCIN(e.target.value)}
        />
        
        <input 
          placeholder="Recherche par Nom"
          value={searchNom}
          onChange={(e) => setSearchNom(e.target.value)}
        />
        
      </div>
      
      <table>
        <thead>
          <tr>
            <th>CIN</th>
            <th>Nom Personnel</th>
            <th>Nom Familial</th>
            <th>Adresse</th>
            <th>Téléphone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCitoyens.length > 0 ? (
            filteredCitoyens.map((citoyen) => (
              <tr key={citoyen.CIN}>
                <td>{citoyen.CIN}</td>
                <td>{citoyen.Nom_personelle}</td>
                <td>{citoyen.Nom_familliale}</td>
                <td>{citoyen.Adresse}</td>
                <td>{citoyen.telephone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucun citoyen trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CitoyensTable;