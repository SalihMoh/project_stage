import React, { useState, useEffect } from "react";
import axios from "axios";

const DemandesTable = () => {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/demandes")
      .then((response) => {
        console.log(response.data);  
        if (response.data && Array.isArray(response.data.data)) {
          setDemandes(response.data.data); 
        } else {
          console.error("Expected an array of demandes in response.data.data");
        }
      })
      .catch((error) => {
        console.error("Error fetching demandes:", error);
      });
  }, []);

  return (
    <div>
      <h1>Demandes</h1>
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
          {Array.isArray(demandes) && demandes.length > 0 ? (
            demandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.CIN}</td>
                <td>{demande.type}</td>
                <td>{new Date(demande.date_demande).toLocaleString()}</td>
                <td>{demande.status}</td>
                <td>{new Date(demande.created_at).toLocaleString()}</td> 
                <td>{new Date(demande.updated_at).toLocaleString()}</td> 
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No demandes available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DemandesTable;
