import React, { useState } from "react";
import axios from "axios";
import '../../css/Popup.css'; 

function SuivreDmdPopup() {
  const [cin, setCin] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [demandes, setDemandes] = useState([]);

  const checkCin = async () => {
    if (!cin.trim()) {
      setError('Veuillez entrer un CIN valide');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    setDemandes([]);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/demandes/by-cin", { 
        CIN: cin 
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.success) {
        if (response.data.data.length > 0) {
          setDemandes(response.data.data);
          setSuccess(true);
        } else {
          setError('Aucune demande trouvée pour ce CIN');
        }
      } else {
        setError(response.data.message || 'Erreur lors de la recherche');
      }
    } catch (err) {
      handleRequestError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestError = (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 422:
          setError('Format de CIN invalide');
          break;
        case 404:
          setError(err.response.data.message || 'CIN non trouvé');
          break;
        default:
          setError('Erreur du serveur');
      }
    } else if (err.request) {
      setError('Erreur de connexion au serveur');
    } else {
      setError('Erreur lors de la requête');
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset state when opening
      setCin('');
      setDemandes([]);
      setError('');
      setSuccess(false);
    }
  };

  return (
    <div className="popup-container">
      <button 
        onClick={togglePopup}
        className="popup-trigger"
        aria-expanded={isOpen}
        aria-controls="popup-content"
      >
        {isOpen ? 'Fermer' : 'Suivre vos demandes'}
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div 
            id="popup-content"
            className="popup-content"
            role="dialog"
            aria-modal="true"
          >
            <button 
              onClick={togglePopup}
              className="popup-close"
              aria-label="Fermer la popup"
            >
              &times;
            </button>
            
            <div className="popup-body">
              <h2>Entrez votre CIN pour consulter vos demandes</h2>
              
              <div className="input-group">
                <input 
                  type="text" 
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                  placeholder="Votre numéro de CIN"
                  disabled={loading}
                />
                <button 
                  onClick={checkCin}
                  disabled={loading}
                  className="search-button"
                >
                  {loading ? 'Recherche en cours...' : 'Voir vos demandes'}
                </button>
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">Demandes trouvées: {demandes.length}</div>}

              {demandes.length > 0 && (
                <div className="demandes-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Référence</th>
                        <th>Type</th>
                        <th>Statut</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandes.map((demande) => (
                        <tr key={demande.id}>
                          <td>{demande.reference}</td>
                          <td>{demande.type}</td>
                          <td className={`status-${demande.status.toLowerCase()}`}>
                            {demande.status}
                          </td>
                          <td>{new Date(demande.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuivreDmdPopup;