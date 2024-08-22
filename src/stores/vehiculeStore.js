import { defineStore } from "pinia";
import axios from "axios";

export const useVehiculeStore = defineStore("vehicules", {
  state: () => ({
    vehicules: [],
    loading: false,
    error: null,
  }),
  getters: {
    // optionsLength: (state) => state.options.length,
  },
  actions: {
    async fetchVehicule() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/vehicule/get/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched Vehicules", response.data.response);
        this.vehicules = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },
    async addVehicule(vehicule) {
      try {
        let data = new FormData();
        data.append("idAgent", vehicule.idAgent);
        data.append("designation", vehicule.designation);
        data.append("marque", vehicule.marque);
        data.append("numP", vehicule.numP);
        data.append("category", vehicule.category);
        data.append("type_carburant", vehicule.type_carburant);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/vehicule/enregistrer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added Vehicule", response.data);
        await this.fetchVehicule();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updateVehicule(vehicule) {
      try {
        let data = new FormData();
        data.append("id", vehicule.id);
        data.append("idAgent", vehicule.idAgent);
        data.append("designation", vehicule.designation);
        data.append("marque", vehicule.marque);
        data.append("numP", vehicule.numP);
        data.append("category", vehicule.category);
        data.append("type_carburant", vehicule.type_carburant);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/vehicule/modifier/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated Vehicule", response.data);
        await this.fetchVehicule();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteVehicule(id) {
      try {
        let f = new FormData();
        f.append("id", id);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/vehicule/supprimer/?user=emmanuel&mdp=isc",
          f,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted Vehicule", response.data);
        await this.fetchVehicule();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
