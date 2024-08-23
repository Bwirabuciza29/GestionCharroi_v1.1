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
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { usePieceStore } from "src/stores/pieceStore";
// import { useStore } from "src/stores/store";

export default defineComponent({
  name: "StockManagements",
  setup() {
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
