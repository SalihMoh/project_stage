import React, { useState } from "react";
//import '../../css/Forms/FormSignalement.css';
import '../../css/Forms/FromS.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormSignalement() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    lieu: '',
    date_incident: '',
    temoins: '',
    preuves: null,
    contact: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['type', 'description', 'lieu', 'date_incident', 'contact'];

    requiredFields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
        newErrors[field] = 'Ce champ est obligatoire';
      }
    });

    // Validate email or phone format for contact
    if (formData.contact) {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact);
      const isPhone = /^[0-9]{10}$/.test(formData.contact);
      
      if (!isEmail && !isPhone) {
        newErrors.contact = 'Veuillez entrer un email ou un numéro de téléphone valide';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const formDataToSend = new FormData();

      // Append all form data to FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch("/api/signalements", {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission');
      }

      toast.success('Votre signalement a été envoyé avec succès', {
        position: "top-right",
        autoClose: 5000,
      });

      // Reset form
      setFormData({
        type: '',
        description: '',
        lieu: '',
        date_incident: '',
        temoins: '',
        preuves: null,
        contact: ''
      });

    } catch (error) {
      toast.error('Erreur lors de l\'envoi du signalement', {
        position: "top-right",
        autoClose: 3000,
      });
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormField = (name, label, type = 'text', options = null) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>
          {label}:
          {type === 'select' ? (
            <select
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={errors[name] ? 'error' : ''}
            >
              <option value="">Sélectionner...</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === 'file' ? (
            <input
              type="file"
              id={name}
              name={name}
              onChange={handleChange}
              accept="image/*,.pdf,.doc,.docx"
              className={errors[name] ? 'error' : ''}
            />
          ) : type === 'textarea' ? (
            <textarea
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={errors[name] ? 'error' : ''}
              rows="4"
            />
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={errors[name] ? 'error' : ''}
              min={type === 'date' ? '2000-01-01' : undefined}
              max={type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
            />
          )}
        </label>
        {errors[name] && (
          <span className="error-message">{errors[name]}</span>
        )}
      </div>
    );
  };

  const signalementTypes = [
    { value: 'incivilité', label: 'Incivilité' },
    { value: 'nuisance', label: 'Nuisance' },
    { value: 'infraction', label: 'Infraction' },
    { value: 'danger', label: 'Situation dangereuse' },
    { value: 'autre', label: 'Autre' }
  ];

  return (
    <div className="signalement-container">
      <ToastContainer />
      
      <h1>Formulaire de Signalement</h1>
      <p>Utilisez ce formulaire pour signaler un incident ou un problème dans votre communauté.</p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {renderFormField('type', 'Type de signalement', 'select', signalementTypes)}
        {renderFormField('description', 'Description détaillée', 'textarea')}
        {renderFormField('lieu', 'Lieu exact', 'text')}
        {renderFormField('date_incident', 'Date et heure de l\'incident', 'datetime-local')}
        {renderFormField('temoins', 'Témoins éventuels (noms et contacts)', 'text')}
        {renderFormField('preuves', 'Preuves (photos, documents)', 'file')}
        {renderFormField('contact', 'Votre email ou téléphone', 'text')}

        <div className="form-footer">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le signalement'}
          </button>
          <p className="disclaimer">
            Toutes les informations fournies seront traitées de manière confidentielle.
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormSignalement;