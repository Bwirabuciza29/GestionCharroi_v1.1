<template>
  <div class="q-pa-md">
    <q-table
      title="Fiche de Stock Pieces"
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
          label="Imprimer la Liste des Pièces"
          color="primary"
          no-caps
          @click="alert = true"
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
    </q-table>
  </div>
  <q-dialog v-model="alert">
    <div
      class="print-me bg-white p-6 rounded-lg shadow-md w-full print:max-w-full print:p-0 max-w-2xl"
    >
      <div
        class="flex flex-col print:flex-row md:flex-row print:justify-center print:items-center text-center items-center justify-between mb-4"
      >
        <img
          src="~assets/logo.jpeg"
          alt="Logo 1"
          class="h-14 w-14 mb-4 md:mb-0"
        />
        <div class="text-left md:text-center flex-1 mx-4">
          <h1 class="text-lg font-bold leading-relaxed">OFFICE DES ROUTES</h1>
          <h2 class="text-md leading-relaxed">NORD-KIVU/GOMA</h2>
          <a href="http://www.or.org" class="text-blue-600 leading-relaxed"
            >www.or.org</a
          >
        </div>
        <img
          src="~assets/logo.jpeg"
          alt="Logo 2"
          class="h-14 w-14 mb-4 md:mb-0"
        />
      </div>
      <div class="border-t border-b border-gray-300 py-2 text-center mb-4">
        <h3 class="text-xl font-bold leading-relaxed">
          Liste des Charrois Automobiles
        </h3>
      </div>
      <div class="flex no-wrap text-base leading-relaxed">
        <div v-if="datas.length === 0" class="text-center text-gray-500">
          Aucun charroi disponible
        </div>
        <table v-else class="min-w-full bg-white">
          <thead>
            <tr>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Designation
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Quantité Totale
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in datas"
              :key="index"
              class="hover:bg-gray-100"
            >
              <td class="px-6 py-4 border-b border-gray-200">
                {{ item.designation }}
              </td>
              <td class="px-6 py-4 border-b border-gray-200">
                {{ item.total }}
              </td>
            </tr>
          </tbody>
          <div clas="flex flex-center items-center justify-between ">
            <p class="text-gray-500 leading-relaxed text-center">
              Goma,Nord-Kivu @2024
            </p>

            <div
              @click="printModal()"
              class="no-print-me bg-blue-500 text-white px-4 text-center w-1/2 font-semibold"
            >
              <span> Imprimer </span>
            </div>
          </div>
        </table>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { usePieceStore } from "src/stores/pieceStore";
// import { useStore } from "src/stores/store";

export default defineComponent({
  name: "StockManagements",
  setup() {
    const printModal = () => {
      window.print();
    };
    // Les Vars Selects
    const store = usePieceStore();
    // end vars

    // const store = useStore();

    const filter = ref("");
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
        name: "total",
        align: "left",
        label: "Total",
        field: "total",
        sortable: true,
      },
      {
        name: "dateStock",
        align: "left",
        label: "Date",
        field: "dateStock",
        sortable: true,
      },
    ]);
    const pagination = ref({ rowsPerPage: 10 });

    onMounted(() => {
      store.fetchPiece();
    });

    const datas = computed(() => store.pieces);
    console.log(datas.value);

    return {
      store,
      filter,
      datas,
      pagination,
      mode,
      columns,
      viewToggle: ref(false),
      alert: ref(false),
      printModal,
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
