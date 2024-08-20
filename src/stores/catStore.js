import { defineStore } from "pinia";
import axios from "axios";

export const useCatStore = defineStore("cats", {
  state: () => ({
    cats: [],
    loading: false,
    error: null,
  }),
  getters: {
    // optionsLength: (state) => state.options.length,
  },
  actions: {
    async fetchCat() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/catuser/get/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched options", response.data.response);
        this.cats = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },
    async addCat(option) {
      try {
        let data = new FormData();
        data.append("designation", option);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/catuser/enregistrer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added cat", response.data);
        await this.fetchCat();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updateCat(option) {
      try {
        let data = new FormData();
        data.append("designation", option.designation);
        data.append("Id_cat", option.Id_cat);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/catuser/modifier/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated option", response.data);
        await this.fetchCat();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteCat(Id_cat) {
      try {
        let f = new FormData();
        f.append("Id_cat", Id_cat);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/catuser/supprimer/?user=emmanuel&mdp=isc",
          f,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted option", response.data);
        await this.fetchCat();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
