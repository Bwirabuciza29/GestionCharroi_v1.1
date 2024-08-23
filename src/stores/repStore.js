import { defineStore } from "pinia";
import axios from "axios";

export const useRepStore = defineStore("reparations", {
  state: () => ({
    reparations: [],
    loading: false,
    error: null,
  }),
  getters: {
    optionsLength: (state) => state.inscriptions.length,
  },
  actions: {
    async fetchReparations() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/reparation/get/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched reparations", response.data.response);
        this.reparations = Array.isArray(response.data.response)
          ? response.data.response
          : [];
      } catch (err) {
        this.error = err;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async addReparation(reparation) {
      try {
        let data = new FormData();
        data.append("idAgent", reparation.idAgent);
        data.append("idVehicule", reparation.idVehicule);
        data.append("panne", reparation.panne);
        data.append("dateRep", reparation.dateRep);
        data.append("duree", reparation.duree);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/reparation/enregistrer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added reparations", response.data);
        await this.fetchReparations();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updateReparation(reparation) {
      try {
        let data = new FormData();
        data.append("id", inscription.id);
        data.append("idAgent", reparation.idAgent);
        data.append("idVehicule", reparation.idVehicule);
        data.append("panne", reparation.panne);
        data.append("dateRep", reparation.dateRep);
        data.append("duree", reparation.duree);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/reparation/modifier/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated reparations", response.data);
        await this.fetchReparations();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteReparation(id) {
      try {
        const data = new FormData();
        data.append("id", id);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/reparation/supprimer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted reparations", response.data);
        await this.fetchReparations();
        return response.data;
      } catch (err) {
        console.error(err);
        this.error = err;
      }
    },
  },
});
