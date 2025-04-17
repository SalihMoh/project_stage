import React, { useState } from "react";
import '../../css/Forms/FormEC.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormEC() {
  const [activeForm, setActiveForm] = useState("naissance");
  const [activeButton, setActiveButton] = useState("Acte de Naissance");
  const [formData, setFormData] = useState({
    naissance: {
      CIN: '',
      nomComplet: '',
      dateNaissance: '',
      lieuNaissance: ''
    },
    mariage: {
      CIN: '',
      conjoint1: '',
      conjoint2: '',
      dateMariage: '',
      lieuMariage: ''
    },
    deces: {
      CIN: '',
      nomDefunt: '',
      dateDeces: '',
      lieuDeces: '',
      causeDeces: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [showRdvModal, setShowRdvModal] = useState(false);
  const [rdvTime, setRdvTime] = useState('');
  const [rdvDate, setRdvDate] = useState('');
  const [submittedCIN, setSubmittedCIN] = useState(''); // ✅ NEW STATE

  const handleButtonClick = (formType, buttonName) => {
    setActiveForm(formType);
    setActiveButton(buttonName);
    setErrors({});
  };

  const handleChange = (e, formType, field) => {
    setFormData({
      ...formData,
      [formType]: {
        ...formData[formType],
        [field]: e.target.value
      }
    });
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (formType) => {
    const currentForm = formData[formType];
    const newErrors = {};

    Object.entries(currentForm).forEach(([field, value]) => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        newErrors[field] = 'Ce champ est obligatoire';
      }
    });

    if (formType === 'naissance' && currentForm.dateNaissance) {
      const birthDate = new Date(currentForm.dateNaissance);
      if (birthDate > new Date()) {
        newErrors.dateNaissance = 'La date de naissance ne peut pas être dans le futur';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, formType) => {
    e.preventDefault();

    if (!validateForm(formType)) {
      toast.error('Veuillez remplir tous les champs obligatoires', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

      const response = await fetch("/api/check-citoyen", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({
          CIN: formData[formType].CIN
        })
      });

      const data = await response.json();
      if (!data.exists) {
        toast.error('Le CIN fourni n\'existe pas dans notre système', {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      setSubmittedCIN(formData[formType].CIN); 

      setShowRdvModal(true);
      setFormData({
        ...formData,
        [formType]: Object.fromEntries(
          Object.keys(formData[formType]).map(key => [key, ''])
        )
      });

    } catch (error) {
      toast.error('Erreur, demande non envoyée', {
        position: "top-right",
        autoClose: 3000,
      });
      console.error('Erreur lors de la soumission', error);
    }
  };

  const handleRdvSubmit = async (e) => {
    e.preventDefault();

    const [selectedHours, selectedMinutes] = rdvTime.split(':').map(Number);
    const selectedTimeInMinutes = selectedHours * 60 + selectedMinutes;
    const openingTime = 8 * 60 + 30;
    const closingTime = 16 * 60 + 30;

    if (selectedTimeInMinutes < openingTime || selectedTimeInMinutes > closingTime) {
      toast.error('Veuillez choisir un horaire entre 8h30 et 16h30', {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    const endTimeInMinutes = selectedTimeInMinutes + 15;
    if (endTimeInMinutes > closingTime) {
      toast.error('Le rendez-vous doit se terminer avant 16h30', {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const fullRdvDate = `${rdvDate} ${String(selectedHours).padStart(2, '0')}:${String(selectedMinutes).padStart(2, '0')}:00`;

      const demandeData = {
        CIN: submittedCIN,
        type: activeButton,
        date_demande: fullRdvDate,
        Archive: false,
        status: "en_attente"
      };

      console.log("Sending demandeData:", demandeData);

      const response = await fetch('/api/demandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify(demandeData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      toast.success(`Demande Rendez-vous confirmé à ${fullRdvDate}`, {
        position: "top-right",
        autoClose: 3000,
      });

      setShowRdvModal(false);
      setRdvDate('');
      setRdvTime('');
      setSubmittedCIN('');
      setFormData({
        naissance: { CIN: '', nomComplet: '', dateNaissance: '', lieuNaissance: '' },
        mariage: { CIN: '', conjoint1: '', conjoint2: '', dateMariage: '', lieuMariage: '' },
        deces: { CIN: '', nomDefunt: '', dateDeces: '', lieuDeces: '', causeDeces: '' }
      });

    } catch (error) {
      toast.error('Erreur lors de la confirmation du rendez-vous', {
        position: "top-right",
        autoClose: 3000,
      });
      console.error('Error:', error);
    }
  };

  const renderFormField = (formType, fieldName, label, type = 'text') => {
    return (
      <label>
        {label}:
        <input
          type={type}
          value={formData[formType][fieldName]}
          onChange={(e) => handleChange(e, formType, fieldName)}
          className={errors[fieldName] ? 'error' : ''}
        />
        {errors[fieldName] && (
          <span className="error-message">{errors[fieldName]}</span>
        )}
      </label>
    );
  };

  return (
    <div className="EC-acte">
      <ToastContainer />

      {/* RDV Modal */}
      {showRdvModal && (
        <div className="modal-overlay">
          <div className="rdv-modal">
            <h3>Planifier un Rendez-vous</h3>
            <p>Votre demande a été soumise avec succès. Veuillez choisir un créneau de 30 minutes maximum.</p>

            <form onSubmit={handleRdvSubmit}>
              <label>
                Date du rendez-vous:
                <input
                  type="date"
                  value={rdvDate}
                  onChange={(e) => setRdvDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </label>

              <label>
                Heure du rendez-vous:
                <input
                  type="time"
                  value={rdvTime}
                  onChange={(e) => setRdvTime(e.target.value)}
                  required
                />
              </label>

              <div className="modal-buttons">
                <button type="button" onClick={() => setShowRdvModal(false)}>
                  Annuler
                </button>
                <button type="submit">
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="buttons">
        <button
          className={activeButton === "Acte de Naissance" ? "active" : ""}
          onClick={() => handleButtonClick("naissance", "Acte de Naissance")}
        >
          Acte de Naissance
        </button>
        <button
          className={activeButton === "Acte de Mariage" ? "active" : ""}
          onClick={() => handleButtonClick("mariage", "Acte de Mariage")}
        >
          Acte de Mariage
        </button>
        <button
          className={activeButton === "Acte de Décès" ? "active" : ""}
          onClick={() => handleButtonClick("deces", "Acte de Décès")}
        >
          Acte de Décès
        </button>
      </div>

      <div className="forms-container">
        {activeForm === "naissance" && (
          <div className="form-naissance">
            <h2>Formulaire d'Acte de Naissance</h2>
            <form onSubmit={(e) => handleSubmit(e, "naissance")}>
              {renderFormField("naissance", "CIN", "CIN de demandeur")}
              {renderFormField("naissance", "nomComplet", "Nom complet")}
              {renderFormField("naissance", "dateNaissance", "Date de naissance", "date")}
              {renderFormField("naissance", "lieuNaissance", "Lieu de naissance")}
              <button type="submit">Soumettre</button>
            </form>
          </div>
        )}

        {activeForm === "mariage" && (
          <div className="form-mariage">
            <h2>Formulaire d'Acte de Mariage</h2>
            <form onSubmit={(e) => handleSubmit(e, "mariage")}>
              {renderFormField("mariage", "CIN", "CIN de demandeur")}
              {renderFormField("mariage", "conjoint1", "Nom du conjoint 1")}
              {renderFormField("mariage", "conjoint2", "Nom du conjoint 2")}
              {renderFormField("mariage", "dateMariage", "Date de mariage", "date")}
              {renderFormField("mariage", "lieuMariage", "Lieu de mariage")}
              <button type="submit">Soumettre</button>
            </form>
          </div>
        )}

        {activeForm === "deces" && (
          <div className="form-deces">
            <h2>Formulaire d'Acte de Décès</h2>
            <form onSubmit={(e) => handleSubmit(e, "deces")}>
              {renderFormField("deces", "CIN", "CIN de demandeur")}
              {renderFormField("deces", "nomDefunt", "Nom du défunt")}
              {renderFormField("deces", "dateDeces", "Date de décès", "date")}
              {renderFormField("deces", "lieuDeces", "Lieu de décès")}
              {renderFormField("deces", "causeDeces", "Cause du décès")}
              <button type="submit">Soumettre</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormEC;
