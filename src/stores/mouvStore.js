import { defineStore } from "pinia";
import axios from "axios";

export const useMouveStore = defineStore("mouves", {
  state: () => ({
    mouves: [],
    loading: false,
    error: null,
  }),
  getters: {
    mouvesLength: (state) => state.mouves.length,
  },
  actions: {
    async fetchMouve() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/mouvementvh/get/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched Mouvement Vehicule", response.data.response);
        this.mouves = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },
    async addMouve(mouve) {
      try {
        let data = new FormData();
        data.append("idVeh", mouve.idVeh);
        data.append("destination", mouve.destination);
        data.append("trajet", mouve.trajet);
        data.append("consommation", mouve.consommation);
        data.append("type_carburant", mouve.type_carburant);
        data.append("dateSortie", mouve.dateSortie);
        data.append("dateRetour", mouve.dateRetour);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/mouvementvh/enregistrer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added MouvementVh", response.data);
        await this.fetchMouve();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updateMouve(mouve) {
      try {
        let data = new FormData();
        data.append("id", mouve.id);
        data.append("trajet", mouve.trajet);
        data.append("consommation", mouve.consommation);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/mouvementvh/modifier/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated Mouvement", response.data);
        await this.fetchMouve();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteMouve(obj) {
      try {
        let f = new FormData();
        f.append("id", obj.id);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/mouvementvh/supprimer/?user=emmanuel&mdp=isc",
          f,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted Mouvement", response.data);
        await this.fetchMouve();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
