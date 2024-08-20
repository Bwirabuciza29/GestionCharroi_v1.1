import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),
  getters: {
    // optionsLength: (state) => state.options.length,
  },
  actions: {
    async fetchUser() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/useradmin/get/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched Users", response.data.response);
        this.users = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },
    async addUser(user) {
      try {
        let data = new FormData();
        data.append("Id_cat", user.Id_cat);
        data.append("nom_a", user.nom_a);
        data.append("prenom_a", user.prenom_a);
        data.append("email_a", user.email_a);
        data.append("phone_a", user.phone_a);
        data.append("adresse", user.adresse);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/useradmin/enregistrer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added User", response.data);
        await this.fetchUser();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updateUser(user) {
      try {
        let data = new FormData();
        data.append("Id_cat", user.Id_cat);
        data.append("nom_a", user.nom_a);
        data.append("prenom_a", user.prenom_a);
        data.append("email_a", user.email_a);
        data.append("phone_a", user.phone_a);
        data.append("Id_adm", user.Id_adm);
        data.append("adresse", user.adresse);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/useradmin/modifier/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated Users", response.data);
        await this.fetchUser();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteUser(Id_adm) {
      try {
        let f = new FormData();
        f.append("Id_adm", Id_adm);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/useradmin/supprimer/?user=emmanuel&mdp=isc",
          f,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted Users", response.data);
        await this.fetchUser();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
