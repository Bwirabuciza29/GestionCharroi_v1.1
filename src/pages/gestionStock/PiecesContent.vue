<template>
  <div class="container mx-auto p-4">
    <div class="q-pa-md">
      <div
        class="q-pa-sm text-2xl font-bold text-center mb-4 p-4 blondy text-white rounded-lg shadow-lg"
      >
        Gestion Pieces
      </div>
      <!-- Categorie Piece -->
      <div class="q-pa-sm">
        <CatPiece />
      </div>
      <!-- Ajouter Piece -->
      <div class="q-pa-sm">
        <AddPiece />
      </div>
    </div>
  </div>
</template>

<script>
import CatPiece from "components/gestionPieces/CatPiece.vue";
import AddPiece from "components/gestionPieces/AddPiece.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: { CatPiece, AddPiece },
});
</script>

