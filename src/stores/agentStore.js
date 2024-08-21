import { defineStore } from "pinia";
import axios from "axios";

export const useAgentStore = defineStore("agents", {
  state: () => ({
    agents: [],
    loading: false,
    error: null,
  }),
  getters: {
    optionsLength: (state) => state.agents.length,
  },
  actions: {
    async fetchAgents() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/agent/get/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched agent", response.data.response);
        this.agents = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },

    async addAgent(agent) {
      try {
        let data = new FormData();
        data.append("noms", agent.noms);
        data.append("category", agent.category);
        data.append("dateNaissance", agent.dateNaissance);
        data.append("lieuNaissance", agent.lieuNaissance);
        data.append("email", agent.email);
        data.append("tel", agent.tel);
        data.append("photo", agent.photo[0]);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/agent/enregistrer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added Agents", response.data);
        await this.fetchAgents();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updateAgent(agent) {
      try {
        let data = new FormData();
        data.append("id", agent.id);
        data.append("noms", agent.noms);
        data.append("category", agent.category);
        data.append("dateNaissance", agent.dateNaissance);
        data.append("lieuNaissance", agent.lieuNaissance);
        data.append("email", agent.email);
        data.append("tel", agent.tel);
        data.append("photo", agent.photo[0]);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/agent/modifier/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated Agents", response.data);
        await this.fetchAgents();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteAgent(obj) {
      try {
        let f = new FormData();
        f.append("id", obj.id);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/agent/supprimer/?user=emmanuel&mdp=isc",
          f,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted Agent", response.data);
        await this.fetchAgents();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
