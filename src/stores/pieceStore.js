import { defineStore } from "pinia";
import axios from "axios";

export const usePieceStore = defineStore("pieces", {
  state: () => ({
    pieces: [],
    loading: false,
    error: null,
  }),
  getters: {
    optionsLength: (state) => state.options.length,
  },
  actions: {
    async fetchPiece() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost/PROJETTUTORE/api/stock/get/?user=emmanuel&mdp=isc",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched pieces", response.data.response);
        this.pieces = response.data.response;
        return response.data.response;
      } catch (err) {
        this.error = err;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async addPiece(stock) {
      try {
        let data = new FormData();
        data.append("idCat", idCat.Nom);
        data.append("designation", stock.designation);
        data.append("quantite", stock.quantite);
        data.append("dateEntree", stock.dateEntree);
        data.append("type", stock.type);
        data.append("quantiteMouv", stock.quantiteMouv);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/stock/enregistrer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Added Piece", response.data);
        await this.fetchPiece();
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async editPiece(stock) {
      try {
        const data = new FormData();
        data.append("idMouv", stock.idMouv);
        data.append("quantite", stock.quantite);
        data.append("type", stock.type);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/stock/modifier/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Updated Mouvement", response.data);
        await this.fetchPiece();
        return response.data;
      } catch (err) {
        console.error(err);
        this.error = err;
      }
    },
    async deletePiece(idStock) {
      try {
        const data = new FormData();
        data.append("idStock", idStock);
        const response = await axios.post(
          "http://localhost/PROJETTUTORE/api/stock/supprimer/?user=emmanuel&mdp=isc",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Deleted piece", response.data);
        await this.fetchPiece();
        return response.data;
      } catch (err) {
        console.error(err);
        this.error = err;
      }
    },
  },
});
