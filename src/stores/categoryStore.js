import { defineStore } from "pinia";
import axios from "axios";

export const useCategoryStore = defineStore("categorys", {
  state: () => ({
    categorys: [],
    loading: false,
    error: null,
  }),
  getters: {
    optionsLength: (state) => state.options.length,
  },
  actions: {
    async fetchCategory() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/category/get/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched category", response.data.response);
        this.categorys = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async addCategory(designation) {
      try {
        const data = new FormData();
        data.append("designation", designation);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/category/enregistrer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added Category", response.data);
        await this.fetchCategory();
        return response.data;
      } catch (err) {
        console.error(err);
        this.error = err;
      }
    },
    async editCategory(designation) {
      try {
        const data = new FormData();
        data.append("designation", designation.designation);
        data.append("id", designation.id);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/category/modifier/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated Category", response.data);
        await this.fetchCategory();
        return response.data;
      } catch (err) {
        console.error(err);
        this.error = err;
      }
    },
    async deleteCategory(id) {
      try {
        const data = new FormData();
        data.append("id", id);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/category/supprimer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted option", response.data);
        await this.fetchCategory();
        return response.data;
      } catch (err) {
        console.error(err);
        this.error = err;
      }
    },
  },
});
