"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import "./Contact.css"
import {FaMapMarkerAlt,FaPhone,FaEnvelope,FaClock,FaFacebook,FaTwitter,FaInstagram,FaYoutube,} from "react-icons/fa"
import "./Contact.css"

const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(2, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

const defaultValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

const Contact = () => {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  })

  const contactMutation = useMutation({
    mutationFn: (data) => {
      return fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to send message")
        return res.json()
      })
    },
    onSuccess: () => {
      alert("Message envoyé avec succès. Nous vous répondrons bientôt.")
      form.reset()
    },
    onError: () => {
      alert("Une erreur est survenue. Veuillez réessayer.")
    },
  })

  const onSubmit = (data) => {
    contactMutation.mutate(data)
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contactez-nous</h1>

        <div className="contact-content">
          <div className="contact-form-container">
            <h2 className="contact-section-title">Envoyez-nous un message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nom complet:</label>
                <input
                  id="name"
                  type="text"
                  className={form.formState.errors.name ? "input-error" : ""}
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <div className="error-message">{form.formState.errors.name.message}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  className={form.formState.errors.email ? "input-error" : ""}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <div className="error-message">{form.formState.errors.email.message}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet:</label>
                <input
                  id="subject"
                  type="text"
                  className={form.formState.errors.subject ? "input-error" : ""}
                  {...form.register("subject")}
                />
                {form.formState.errors.subject && (
                  <div className="error-message">{form.formState.errors.subject.message}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  rows={6}
                  className={form.formState.errors.message ? "input-error" : ""}
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <div className="error-message">{form.formState.errors.message.message}</div>
                )}
              </div>

              <button type="submit" className="submit-button" disabled={contactMutation.isPending}>
                {contactMutation.isPending ? "Envoi en cours..." : "Envoyer"}
              </button>
            </form>
          </div>

          <div className="contact-info-container">
            <h2 className="contact-section-title">Informations de contact</h2>
            <div className="contact-info">
              <div className="contact-info-item">
                <FaMapMarkerAlt className="contact-icon" />
                <p>Commune Dcheira-Jihadia, Avenue Hassan II, Dcheira, Agadir, Maroc</p>
              </div>
              <div className="contact-info-item">
                <FaPhone className="contact-icon" />
                <p>+212 5288-36069</p>
              </div>
              <div className="contact-info-item">
                <FaEnvelope className="contact-icon" />
                <p>communedcheira@gmail.com</p>
              </div>
              <div className="contact-info-item">
                <FaClock className="contact-icon" />
                <div>
                  <p className="hours-title">Heures d'ouverture:</p>
                  <p>Lundi - Vendredi: 8h30 - 16h30</p>
                  <p>Fermé le dimanche / Samedi</p>
                </div>
              </div>
            </div>

            <div className="social-media">
              <h3 className="social-title">Suivez-nous:</h3>
             <div className="social-icons">
                       <a className="social-icon" href="https://www.facebook.com/CommuneDcheiraOfficiel" target="_blank" aria-label="Facebook">
                         <FaFacebook size={20} />
                       </a>
                       <a className="social-icon " href="https://x.com/CommuneDcheira" target="_blank" aria-label="Twitter">
                         <FaTwitter size={20} />
                       </a>
                       <a className="social-icon " href="https://www.instagram.com/communedcheira?igsh=OTlxMnljcWhpcWkx" target="_blank" aria-label="Instagram">
                         <FaInstagram size={20} />
                       </a>
                       <a className="social-icon " href="https://youtube.com/@ctdcheira9637?si=Msp-8G-FCm0rjMLs" target="_blank" aria-label="Youtube">
                         <FaYoutube size={20} />
                       </a>
                     </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
