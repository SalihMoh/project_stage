import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Admin/CitoyensTable.css';

const CitoyensTable = () => {
  const [citoyens, setCitoyens] = useState([]);
  const [filteredCitoyens, setFilteredCitoyens] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");
  const [searchNom, setSearchNom] = useState("");

  const [newCitoyen, setNewCitoyen] = useState({
    CIN: "",
    Nom_personelle: "",
    Nom_familliale: "",
    Adresse: "",
    telephone: ""
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch all citoyens
  const fetchCitoyens = () => {
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
  };

  useEffect(fetchCitoyens, []);

  // Filtering
  useEffect(() => {
    let results = [...citoyens];

    if (searchCIN) {
      results = results.filter((citoyen) =>
        citoyen.CIN.toLowerCase().includes(searchCIN.toLowerCase())
      );
    }

    if (searchNom) {
      results = results.filter(
        (citoyen) =>
          citoyen.Nom_personelle.toLowerCase().includes(searchNom.toLowerCase()) ||
          citoyen.Nom_familliale.toLowerCase().includes(searchNom.toLowerCase())
      );
    }

    setFilteredCitoyens(results);
  }, [citoyens, searchCIN, searchNom]);

  // Create
  const handleCreate = () => {
    axios
      .post("http://127.0.0.1:8000/citoyens", newCitoyen)
      .then(() => {
        fetchCitoyens();
        setNewCitoyen({
          CIN: "",
          Nom_personelle: "",
          Nom_familliale: "",
          Adresse: "",
          telephone: ""
        });
      })
      .catch((err) => console.error("Erreur création:", err));
  };

  // Start editing
  const handleEdit = (citoyen) => {
    setEditingId(citoyen.id);
    setNewCitoyen({ ...citoyen });
  };

  // Update
  const handleUpdate = () => {
    axios
      .put(`http://127.0.0.1:8000/citoyens/${editingId}`, newCitoyen)
      .then(() => {
        fetchCitoyens();
        setEditingId(null);
        setNewCitoyen({
          CIN: "",
          Nom_personelle: "",
          Nom_familliale: "",
          Adresse: "",
          telephone: ""
        });
      })
      .catch((err) => console.error("Erreur modification:", err));
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous supprimer ce citoyen ?")) {
      axios
        .delete(`http://127.0.0.1:8000/citoyens/${id}`)
        .then(() => fetchCitoyens())
        .catch((err) => console.error("Erreur suppression:", err));
    }
  };

  return (
    <div className="ListCitoyens">
      <h1>Liste Des Citoyens</h1>

      {/* Filtres */}
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

      {/* Formulaire Ajout / Modification */}
      <div className="form-create-edit">
        <input
          placeholder="CIN"
          value={newCitoyen.CIN}
          onChange={(e) => setNewCitoyen({ ...newCitoyen, CIN: e.target.value })}
          disabled={editingId !== null}
        />
        <input
          placeholder="Nom personnel"
          value={newCitoyen.Nom_personelle}
          onChange={(e) =>
            setNewCitoyen({ ...newCitoyen, Nom_personelle: e.target.value })
          }
        />
        <input
          placeholder="Nom familial"
          value={newCitoyen.Nom_familliale}
          onChange={(e) =>
            setNewCitoyen({ ...newCitoyen, Nom_familliale: e.target.value })
          }
        />
        <input
          placeholder="Adresse"
          value={newCitoyen.Adresse}
          onChange={(e) => setNewCitoyen({ ...newCitoyen, Adresse: e.target.value })}
        />
        <input
          placeholder="Téléphone"
          value={newCitoyen.telephone}
          onChange={(e) => setNewCitoyen({ ...newCitoyen, telephone: e.target.value })}
        />

        {editingId ? (
          <button onClick={handleUpdate}>Modifier</button>
        ) : (
          <button onClick={handleCreate}>Ajouter</button>
        )}
      </div>

      {/* Tableau des citoyens */}
      <table>
        <thead>
          <tr>
            <th>CIN</th>
            <th>Nom Personnel</th>
            <th>Nom Familial</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCitoyens.length > 0 ? (
            filteredCitoyens.map((citoyen) => (
              <tr key={citoyen.id}>
                <td>{citoyen.CIN}</td>
                <td>{citoyen.Nom_personelle}</td>
                <td>{citoyen.Nom_familliale}</td>
                <td>{citoyen.Adresse}</td>
                <td>{citoyen.telephone}</td>
                <td>
                  <button onClick={() => handleEdit(citoyen)}>Éditer</button>
                  <button onClick={() => handleDelete(citoyen.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucun citoyen trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CitoyensTable;
