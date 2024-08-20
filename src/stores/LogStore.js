import { defineStore } from "pinia";
import axios from "axios";

export const useLogStore = defineStore("logs", {
  state: () => ({
    logs: [],
    loading: false,
    error: null,
  }),
  getters: {
    // optionsLength: (state) => state.options.length,
  },
  actions: {
    async fetchLog() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/alllog/get/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched Logs", response.data.response);
        this.logs = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },
    async addLog(log) {
      try {
        let data = new FormData();
        data.append("Id_adm", log.Id_adm);
        data.append("psw", log.psw);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/alllog/enregistrer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added Logs", response.data);
        await this.fetchLog();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updateLog(log) {
      try {
        let data = new FormData();
        data.append("id_psw", log.id_psw);
        data.append("Id_adm", log.Id_adm);
        data.append("psw", log.psw);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/alllog/modifier/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated Loggers", response.data);
        await this.fetchLog();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteLog(id_psw) {
      try {
        let f = new FormData();
        f.append("id_psw", id_psw);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/alllog/supprimer/?user=emmanuel&mdp=isc",
          f,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted Log", response.data);
        await this.fetchLog();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
