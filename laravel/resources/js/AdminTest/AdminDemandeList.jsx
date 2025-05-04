import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Admin/DemandeList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DemandesTable = () => {
  const [demandes, setDemandes] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const statusOptions = ["en_attente", "approuvé", "rejeté"];

  const fetchDemandes = () => {
    axios.get("http://127.0.0.1:8000/demandes")
      .then((response) => {
        const formatted = response.data.data.map(d => ({
          ...d,
          date_demande: new Date(d.date_demande).toISOString().split('T')[0]
        }));
        setDemandes(formatted);
        setFilteredDemandes(formatted);
      })
      .catch((error) => {
        console.error("Erreur récupération:", error);
        toast.error("Erreur lors du chargement des demandes", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  useEffect(fetchDemandes, []);

  useEffect(() => {
    let results = [...demandes];
    if (searchCIN) {
      results = results.filter(d => d.CIN.toLowerCase().includes(searchCIN.toLowerCase()));
    }
    if (filterType !== "all") {
      results = results.filter(d => d.type === filterType);
    }
    if (filterStatus !== "all") {
      results = results.filter(d => d.status === filterStatus);
    }
    if (filterDate) {
      results = results.filter(d => {
        const demandeDate = new Date(d.date_demande).toISOString().split('T')[0];
        const selectedDate = new Date(filterDate).toISOString().split('T')[0];
        return demandeDate === selectedDate;
      });
    }
    setFilteredDemandes(results);
  }, [demandes, searchCIN, filterType, filterStatus, filterDate]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "en_attente": return { backgroundColor: "yellow", fontWeight: "bold" };
      case "approuvé": return { backgroundColor: "#4CAF50", color: "white", fontWeight: "bold" };
      case "rejeté": return { backgroundColor: "#f44336", color: "white", fontWeight: "bold" };
      default: return {};
    }
  };

  const cycleStatus = (current) => {
    const idx = statusOptions.indexOf(current);
    return statusOptions[(idx + 1) % statusOptions.length];
  };

  const handleStatusClick = (id, currentStatus) => {
    const newStatus = cycleStatus(currentStatus);
    axios.put(`http://127.0.0.1:8000/demandes/${id}`, { status: newStatus })
      .then(() => {
        fetchDemandes();
        toast.success(`Statut changé à ${newStatus}`, {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.error("Erreur update statut:", err);
        toast.error("Erreur lors du changement de statut", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const handleDelete = (id) => {
    toast.warning(
      <div>
        <p>Voulez-vous vraiment supprimer cette demande ?</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
          <button 
            onClick={() => {
              toast.dismiss();
              confirmDelete(id);
            }}
            style={{ padding: '5px 10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Oui, supprimer
          </button>
          <button 
            onClick={() => toast.dismiss()}
            style={{ padding: '5px 10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Annuler
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
        closeOnClick: false,
      }
    );
  };

  const confirmDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/demandes/${id}`)
      .then(() => {
        fetchDemandes();
        toast.success("Demande supprimée avec succès", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.error("Erreur suppression:", err);
        toast.error("Erreur lors de la suppression", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const uniqueTypes = [...new Set(demandes.map(d => d.type))];
  const uniqueStatuses = [...new Set(demandes.map(d => d.status))];

  return (
    <div className="ListDemandes">  

      <ToastContainer />
      <h1>Liste Des Demandes</h1>
      <div className="div-Filtre">
        <input placeholder="Recherche CIN" value={searchCIN} onChange={(e) => setSearchCIN(e.target.value)} />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">Tous les types</option>
          {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">Tous les statuts</option>
          {uniqueStatuses.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="date-filter-input" />
      </div>

      <table>
        <thead>
          <tr>
            <th>CIN</th>
            <th>Type</th>
            <th>Date Demande</th>
            <th>Status</th>
            <th>Créée</th>
            <th>Modifiée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDemandes.length > 0 ? (
            filteredDemandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.CIN}</td>
                <td>{demande.type}</td>
                <td>{new Date(demande.date_demande).toLocaleDateString()}</td>
                <td
                  style={{ ...getStatusStyle(demande.status), cursor: "pointer" }}
                  onClick={() => handleStatusClick(demande.id, demande.status)}
                  title="Cliquez pour changer le statut"
                >
                  {demande.status}
                </td>
                <td>{new Date(demande.created_at).toLocaleString()}</td>
                <td>{new Date(demande.updated_at).toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(demande.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Aucune demande trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DemandesTable;