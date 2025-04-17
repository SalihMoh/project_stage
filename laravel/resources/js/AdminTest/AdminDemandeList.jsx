import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Admin/DemandeList.css';

const DemandesTable = () => {
  const [demandes, setDemandes] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/demandes")
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          const formattedDemandes = response.data.data.map(demande => ({
            ...demande,

            date_demande: new Date(demande.date_demande).toISOString().split('T')[0]
          }));
          setDemandes(formattedDemandes);
          setFilteredDemandes(formattedDemandes);
        } else {
          console.error("Expected an array of demandes in response.data.data");
        }
      })
      .catch((error) => {
        console.error("Error fetching demandes:", error);
      });
  }, []);

  useEffect(() => {
    let results = [...demandes];

    // Filter by CIN
    if (searchCIN) {
      results = results.filter(demande => 
        demande.CIN.toLowerCase().includes(searchCIN.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== "all") {
      results = results.filter(demande => demande.type === filterType);
    }

    // Filter by status
    if (filterStatus !== "all") {
      results = results.filter(demande => demande.status === filterStatus);
    }

    // Filter by date (fixed)
    if (filterDate) {
      results = results.filter(demande => {
        const demandeDate = new Date(demande.date_demande).toISOString().split('T')[0];
        const selectedDate = new Date(filterDate).toISOString().split('T')[0];
        return demandeDate === selectedDate;
      });
    }

    setFilteredDemandes(results);
  }, [demandes, searchCIN, filterType, filterStatus, filterDate]);


  const uniqueTypes = [...new Set(demandes.map(demande => demande.type))];
  const uniqueStatuses = [...new Set(demandes.map(demande => demande.status))];

  return (
    <div className="ListDemandes">
      <h1>Liste Des Demandes</h1>
      <div className="div-Filtre">
        <input 
          placeholder="Recherche CIN"
          value={searchCIN}
          onChange={(e) => setSearchCIN(e.target.value)}
        />
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Tous les types</option>
          {uniqueTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          {uniqueStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="date-filter-input"
        />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>CIN</th>
            <th>Type</th>
            <th>Date Demande</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {filteredDemandes.length > 0 ? (
            filteredDemandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.CIN}</td>
                <td>{demande.type}</td>
                <td>{new Date(demande.date_demande).toLocaleDateString()}</td>
                <td>{demande.status}</td>
                <td>{new Date(demande.created_at).toLocaleString()}</td>
                <td>{new Date(demande.updated_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucune demande trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DemandesTable;