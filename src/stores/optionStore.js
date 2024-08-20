import { defineStore } from "pinia";
import axios from "axios";

export const useOptionsStore = defineStore("options", {
  state: () => ({
    options: [],
    loading: false,
    error: null,
  }),
  getters: {
    optionsLength: (state) => state.options.length,
  },
  actions: {
    async fetchOptions() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/GESTION_ANONYMAT/api/options/get_option/?user=blondy&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched options", response.data.response);
        this.options = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },
    async addOption(option) {
      try {
        let data = new FormData();
        data.append("desOption", option);
        const response = await axios.post(
          "http://localhost/GESTION_ANONYMAT/api/options/enregistrer/?user=blondy&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added option", response.data);
        await this.fetchOptions();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updateOption(option) {
      try {
        let data = new FormData();
        data.append("desOption", option.desOption);
        data.append("id", option.id);
        const response = await axios.post(
          "http://localhost/GESTION_ANONYMAT/api/options/modifier/?user=blondy&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated option", response.data);
        await this.fetchOptions();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteOption(id) {
      try {
        let f = new FormData();
        f.append("id", id);
        const response = await axios.post(
          "http://localhost/GESTION_ANONYMAT/api/options/supprimer/?user=blondy&mdp=isc",
          f,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted option", response.data);
        await this.fetchOptions();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
