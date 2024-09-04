import { defineStore } from "pinia";
import axios from "axios";

export const useChauStore = defineStore("chauffeurs", {
  state: () => ({
    chauffeurs: [],
    loading: false,
    error: null,
  }),
  getters: {
    optionsLength: (state) => state.chauffeurs.length,
  },
  actions: {
    // AFFICHER SEULEMENT LES CHAUFFEURS
    async fetchChauffeur() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/agent/chauffeurs/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched Chauffeur", response.data.response);
        this.chauffeurs = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },
    // AFFICHER SEULEMENT LES MECANICIENS
    // async fetchMecanicien() {
    //   this.loading = true;
    //   this.error = null;
    //   try {
    //     const response = await axios.get(
    //       "http://localhost/PROJETTUTORE/api/agent/mecaniciens/?user=emmanuel&mdp=isc",
    //       {
    //         headers: { "Content-Type": "application/json" },
    //       }
    //     );
    //     console.log("Fetched Mecanicien", response.data.response);
    //     this.agents = response.data.response;
    //     return response.data.response;
    //   } catch (err) {
    //     this.error = err;
    //     console.error(err);
    //   }
    // }
  },
});
