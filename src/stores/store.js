import { defineStore } from "pinia";
// import axios from "src/boot/axios";
import axios from "axios";
import { useRouter } from "vue-router";

export const useStore = defineStore("store", {
  state() {
    return {
      // accessing the route
      router: useRouter(),
      // accessing the route
      loggedIn: localStorage.getItem("token") ? true : false,
      user: localStorage.getItem("user") ?? null,
      n_user: sessionStorage.getItem("n_user") ?? null,
      token_user: sessionStorage.getItem("token_user") ?? null,
      token: localStorage.getItem("token") ?? false,
      users: [],
      l_user: "",
      loggedIn: "",
      user: "",
      personnes: [],
      naissances: [],
      dernierePersonneAjoutee: [],
      cat_partenaires: [],
      partenaires: [],
      pays: [],
      message: [],
      province: [],
      groupements: [],
      avenues: [],
      errors: [],
      options: [],
      promotions: [],
      annees: [],
      loading: false,
      error: null,
    };
  },
  getters: {
    nombreUser(state) {
      return state.users.length;
    },
  },
  actions: {
    // Authentification de l'utilisateur
    async authen(login, psw) {
      try {
        const datas = new FormData();
        datas.append("login", login);
        datas.append("psw", psw);
        const url =
          "http://localhost/PROJETTUTORE/api/authen/?user=emmanuel&mdp=isc";
        const res = await axios({
          method: "post",
          url: url,
          params: {
            user: "emmanuel",
            mdp: "isc",
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: datas,
        });
        // Gestion de la reponse
        if (res.status === 200) {
          console.log(res.data);
          const user = res.data.n_user;
          const token = res.data.token;
          this.l_user = res.data.n_user;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("nom", res.data.nom);
          localStorage.setItem("user", res.data.user);
          localStorage.setItem("phone", res.data.phone);
          localStorage.setItem("token", token);
          sessionStorage.setItem("n_user", user);
          sessionStorage.setItem("token_user", token);
          axios.defaults.headers.common["Authorization"] = token;
          this.loggedIn = true;
          this.user = token;
          // redirection vers le dashboard chef charroi
          if (res.data.u_role == "admin") {
            this.router.push({ path: "/Dash" });
            // redirection vers le dashboard du Magasinier
          } else if (res.data.u_role == "chef") {
            this.router.push({ path: "/Ch" });
          } else if (res.data.u_role == "magasinier") {
            this.router.push({ path: "/St" });
          }
        } else {
          alert("Erreur serveur. Veuillez réessayer plus tard svp.");
        }
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    // logout user
    async logout(id) {
      try {
        this.errors = [];
        //  Managing the response
        if (this.user === id) {
          this.token = null;
          this.loggedIn = false;
          localStorage.clear();
          this.$reset;
        }
        return user;
      } catch (err) {
        if (err.status == 422) {
          for (const key in err.data.errors) {
            this.errors.push(err.data.errors[key][0] + " ");
          }
          return this.errors;
        }
      }
    },
  },
});
