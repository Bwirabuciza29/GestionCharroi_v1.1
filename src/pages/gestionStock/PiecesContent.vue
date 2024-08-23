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
        <div class="q-pa-md">
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              switch-toggle-side
              expand-separator
              icon="perm_identity"
              label="Catégories Pièces"
            >
              <q-card>
                <CatPiece />
              </q-card>
            </q-expansion-item>
          </q-list>
          <q-list bordered class="rounded-borders mt-4">
            <q-expansion-item
              default-opened
              switch-toggle-side
              expand-separator
              icon="perm_identity"
              label="Fiche de Stock Pièces"
            >
              <q-card>
                <AddPiece />
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
      <!-- Ajouter Piece -->
      <div class="q-pa-sm"></div>
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

