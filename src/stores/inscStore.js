import { defineStore } from "pinia";
import axios from "axios";

export const useInscStore = defineStore("inscriptions", {
  state: () => ({
    inscriptions: [],
    loading: false,
    error: null,
  }),
  getters: {
    optionsLength: (state) => state.inscriptions.length,
  },
  actions: {
    async fetchInscriptions() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/GESTION_ANONYMAT/api/inscription/get/?user=blondy&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched inscriptions", response.data.response);
        this.inscriptions = Array.isArray(response.data.response)
          ? response.data.response
          : [];
      } catch (err) {
        this.error = err;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async filterStudents(datas) {
      try {
        let data = new FormData();
        data.append("id_option", datas.id_option);
        data.append("id_promotion", datas.id_promotion);
        data.append("id_annee", datas.id_annee);
        const response = await axios.post(
          "http://localhost/GESTION_ANONYMAT/api/inscription/filter/?user=blondy&mdp=isc",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // console.log("Fetched filtered inscriptions", response.data.response);
        this.inscriptions = Array.isArray(response.data.response)
          ? response.data.response
          : [];
        return response.data.response;
      } catch (err) {
        console.error(err);
      }
    },
    async addInscription(inscription) {
      try {
        let data = new FormData();
        data.append("nom", inscription.Nom);
        data.append("postnom", inscription.Postnom);
        data.append("prenom", inscription.Prenom);
        data.append("genre", inscription.Genre);
        data.append("lieu_naissance", inscription.LieuNaissance);
        data.append("date_naissance", inscription.DateNaissance);
        data.append("id_quartier", inscription.id_quartier);
        data.append("id_avenue", inscription.id_avenue);
        data.append("id_option", inscription.id_option);
        data.append("id_promotion", inscription.id_promotion);
        data.append("id_annee", inscription.id_annee);
        data.append("photo", inscription.photo[0]);
        const response = await axios.post(
          "http://localhost/GESTION_ANONYMAT/api/inscription/inscrire/?user=blondy&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added inscription", response.data);
        await this.fetchInscriptions();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updateInscription(inscription) {
      try {
        let data = new FormData();
        data.append("nom", inscription.Nom);
        data.append("postnom", inscription.Postnom);
        data.append("prenom", inscription.Prenom);
        data.append("genre", inscription.Genre);
        data.append("lieu_naissance", inscription.LieuNaissance);
        data.append("date_naissance", inscription.DateNaissance);
        data.append("id_quartier", inscription.id_quartier);
        data.append("id_avenue", inscription.id_avenue);
        data.append("id_option", inscription.id_option);
        data.append("id_promotion", inscription.id_promotion);
        data.append("id_annee", inscription.id_annee);
        data.append("photo", inscription.photo[0]);
        data.append("matricule", inscription.matriculeEt);
        const response = await axios.post(
          "http://localhost/GESTION_ANONYMAT/api/inscription/modifier/?user=blondy&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated inscription", response.data);
        await this.fetchInscriptions();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteInscription(obj) {
      try {
        let f = new FormData();
        f.append("matricule", obj.matriculeEt);
        const response = await axios.post(
          "http://localhost/GESTION_ANONYMAT/api/inscription/supprimer/?user=blondy&mdp=isc",
          f,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted inscription", response.data);
        await this.fetchInscriptions();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
