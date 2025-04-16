import React, { useState } from "react";
import axios from "axios";

function Test() {
  const [CIN, setCIN] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/demandes", {
        CIN: CIN,
        type: "naissance", // hardcoded just for test — change later
        date_demande: new Date().toISOString().split("T")[0], // today's date
        Archive: false,
        status: "en_attente"
      });

      console.log("Response:", response.data);
      alert("Demande ajoutée !");
    } catch (error) {
      console.error("Erreur:", error.response?.data || error.message);
      alert("Erreur lors de l'envoi !");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="CIN">CIN</label></td>
              <td>
                <input
                  type="text"
                  id="CIN"
                  value={CIN}
                  onChange={(e) => setCIN(e.target.value)}
                />
              </td>
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Test;
