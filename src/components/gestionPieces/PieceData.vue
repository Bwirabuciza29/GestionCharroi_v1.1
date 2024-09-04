<template>
  <q-table
    title="Fiche de Stock Pièces"
    :rows="datas"
    :hide-header="mode === 'grid'"
    :columns="columns"
    row-key="id"
    :grid="mode == 'grid'"
    :filter="filter"
    v-model:pagination="pagination"
    class="custom-table"
  >
    <template v-slot:top-right="props">
      <q-btn
        @click="addPiece()"
        flat
        size="lg"
        color="primary"
        icon="add_circle"
        class="q-mr-xs q-pa-none"
      />
      <q-input
        dense
        borderless
        v-model="filter"
        placeholder="Search"
        class="custom-border bg-grey-3 q-pl-sm"
        style="border-radius: 10px"
      >
        <template v-slot:append>
          <q-icon class="q-pr-sm" color="grey-8" name="search" />
        </template>
      </q-input>
      <q-btn
        flat
        round
        dense
        class="q-ml-xs"
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
        v-if="mode === 'list'"
      >
        <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
          {{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
        </q-tooltip>
      </q-btn>
      <q-toggle
        v-model="viewToggle"
        @click="
          mode = mode === 'grid' ? 'list' : 'grid';
          separator = mode === 'grid' ? 'none' : 'horizontal';
        "
        v-if="!props.inFullscreen"
      >
        <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
          {{ mode === "grid" ? "List View" : "Grid View" }}
        </q-tooltip>
      </q-toggle>
    </template>
    <template v-slot:body-cell-action="props">
      <q-td :props="props">
        <div class="q-gutter-sm">
          <q-btn
            dense
            outline
            size="sm"
            color="primary"
            icon="edit"
            @click="editPiece(props.row)"
          />
          <q-btn
            dense
            outline
            size="sm"
            color="red"
            icon="delete"
            @click="deletePiece(props.row)"
          />
        </div>
      </q-td>
    </template>
  </q-table>

  <!-- Modale pour ajouter une pièce -->
  <q-dialog v-model="addPieceDialog" :maximized="$q.platform.is.mobile">
    <q-card
      :style="
        $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
      "
    >
      <q-card-section>
        <div class="text-h6 q-px-md">
          Ajouter Pièce
          <q-btn
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
            v-close-popup
          ></q-btn>
        </div>
      </q-card-section>
      <q-separator class="q-px-md" inset></q-separator>
      <q-card-section class="q-pt-md">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Id Piece</q-item-label>
                <q-input dense outlined v-model="piece.id" disable />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Categorie Piece</q-item-label>
                <q-select :options="les_cats" dense outlined v-model="idCat" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Designation Piece</q-item-label>
                <q-input dense outlined v-model="piece.designation" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Quantite</q-item-label>
                <q-input dense outlined v-model="piece.quantite" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"
                  >Date Approvisionnement</q-item-label
                >
                <q-input
                  dense
                  type="date"
                  outlined
                  v-model="piece.dateEntree"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Type</q-item-label>
                <q-select
                  :options="['Entree', 'Sortie']"
                  behavior="menu"
                  dense
                  outlined
                  v-model="piece.type"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Quantite Mouvement</q-item-label>
                <q-input dense outlined v-model="piece.quantiteMouv" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
        <div class="q-px-md q-pt-sm">
          <q-btn
            class="full-width"
            label="Enregistrer"
            type="submit"
            color="primary"
            v-close-popup
            @click="saveNewPiece"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Modale pour modifier une pièce -->
  <q-dialog v-model="editPieceDialog" :maximized="$q.platform.is.mobile">
    <q-card
      :style="
        $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
      "
    >
      <q-card-section>
        <div class="text-h6 q-px-md">
          Modifier Pièce
          <q-btn
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
            v-close-popup
          ></q-btn>
        </div>
      </q-card-section>
      <q-separator class="q-px-md" inset></q-separator>
      <q-card-section class="q-pt-md">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Id Piece</q-item-label>
                <q-input dense outlined v-model="piece.id" disable />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Categorie Piece</q-item-label>
                <q-select :options="les_cats" dense outlined v-model="idCat" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Designation Piece</q-item-label>
                <q-input dense outlined v-model="piece.designation" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Quantite</q-item-label>
                <q-input dense outlined v-model="piece.quantite" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Type</q-item-label>
                <q-select
                  :options="['Entree', 'Sortie']"
                  dense
                  outlined
                  v-model="piece.type"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Quantite Mouvement</q-item-label>
                <q-input dense outlined v-model="piece.quantiteMouv" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
        <div class="q-px-md q-pt-sm">
          <q-btn
            class="full-width"
            label="Modifier"
            type="submit"
            color="primary"
            v-close-popup
            @click="saveEditedPiece"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { usePieceStore } from "src/stores/pieceStore";
import { useCategoryStore } from "src/stores/categoryStore";

export default defineComponent({
  name: "StockManagements",
  setup() {
    // Variables réactives pour les modales
    const addPieceDialog = ref(false);
    const editPieceDialog = ref(false);

    // Les Vars Selects
    const les_cats = ref([]);

    const store = usePieceStore();
    const stores = useCategoryStore();

    const filter = ref("");
    const idCat = ref(null);
    const piece = ref({});
    const mode = ref("list");
    const columns = ref([
      {
        name: "designation",
        align: "left",
        label: "Designation",
        field: "designation",
        sortable: true,
      },
      {
        name: "quantitePiece",
        required: true,
        label: "Quantite",
        align: "left",
        field: "quantitePiece",
        sortable: true,
      },
      {
        name: "quantiteMouvement",
        align: "left",
        label: "Quantite Mouvement",
        field: "quantiteMouvement",
        sortable: true,
      },
      {
        name: "typeMouvement",
        align: "left",
        label: "Type",
        field: "typeMouvement",
        sortable: true,
      },
      {
        name: "QteEntree",
        align: "left",
        label: "Quantité Entrante",
        field: "QteEntree",
        sortable: true,
      },
      {
        name: "QteSortie",
        align: "left",
        label: "Quantité Sortante",
        field: "QteSortie",
        sortable: true,
      },
      {
        name: "action",
        align: "right",
        label: "Actions",
        field: "action",
        sortable: false,
      },
    ]);
    const pagination = ref({ rowsPerPage: 10 });

    onMounted(async () => {
      les_cats.value = await stores.getCategories();
      await store.getAllPieces();
    });

    // Ouvrir la modale d'ajout
    function addPiece() {
      piece.value = {};
      idCat.value = null;
      addPieceDialog.value = true;
    }

    // Ouvrir la modale de modification
    function editPiece(val) {
      piece.value = { ...val }; // Charger les données existantes
      idCat.value = les_cats.value.find((cat) => cat.value === val.idCat); // Trouver la catégorie associée
      editPieceDialog.value = true;
    }
    // SELECTS FETCHS
    // select category
    stores.fetchCategory().then((result) => {
      result.forEach((t) => {
        les_cats.value.push({ value: t.id, label: t.designation });
      });
    });
    // Enregistrer une nouvelle pièce
    async function saveNewPiece() {
      piece.value.idCat = idCat.value.value;
      console.log("Saving new piece", piece.value);
      store.addPiece(piece.value).then((res) => {
        console.log(res);
      });
    }

    // Enregistrer les modifications
    async function saveEditedPiece() {
      piece.value.idCat = idCat.value.value;
      console.log("Saving edited piece", piece.value);
      store.editPiece(piece.value).then((res) => {
        console.log(res);
      });
    }

    // Supprimer une pièce
    function deletePiece(val) {
      console.log("Deleting piece", val);
      store.deletePiece(val.id).then((res) => {
        console.log(res);
      });
    }
    onMounted(() => {
      store.fetchPiece();
    });

    const datas = computed(() => store.pieces);
    console.log(datas.value);

    return {
      les_cats,
      addPieceDialog,
      editPieceDialog,
      piece,
      store,
      filter,
      idCat,
      datas,
      pagination,
      saveNewPiece,
      saveEditedPiece,
      editPiece,
      addPiece,
      deletePiece,
      mode,
      columns,
      viewToggle: ref(false),
    };
  },
});
</script>
<style scoped>
.custom-border {
  border-radius: 5px;
}

.custom-table {
  overflow: hidden;
}

.custom-table ::-webkit-scrollbar {
  display: none;
}

.custom-table {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
