<template>
  <q-page class="q-pa-md w-full px-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Nos Vehicules et Affectations
    </div>
    <q-card class="px-6 mx-auto shadow-lg rounded-lg overflow-hidden">
      <q-table
        class="custom-table"
        :rows="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="matricule"
        :grid="mode == 'grid'"
        :filter="filter"
        v-model:pagination="pagination"
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
        </template>
        <template v-slot:body-cell-photo="props">
          <q-td :props="props">
            <q-avatar>
              <img
                class="object-cover"
                :src="'http://localhost/PROJETTUTORE' + props.row.photo"
              />
            </q-avatar>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useVehiculeStore } from "src/stores/vehiculeStore";

export default defineComponent({
  name: "NosVehicules",
  setup() {
    const printModal = () => {
      window.print();
    };
    // Le Var select
    // end var
    const store = useVehiculeStore();

    // End call stors
    const filter = ref("");
    const addFlag = ref(true);
    const mode = ref("list");
    const columns = ref([
      {
        name: "photo",
        align: "left",
        field: "photo",
        sortable: true,
      },
      {
        name: "matricule",
        align: "left",
        label: "Matricule",
        field: "matricule",
        sortable: true,
      },
      {
        name: "noms",
        align: "left",
        label: "Agent",
        field: "noms",
        sortable: true,
      },
      {
        name: "agent_category",
        align: "left",
        label: "Categorie",
        field: "agent_category",
        sortable: true,
      },
      {
        name: "designation",
        align: "left",
        label: "Vehicule",
        field: "designation",
        sortable: true,
      },
      {
        name: "marque",
        align: "left",
        label: "Marque",
        field: "marque",
        sortable: true,
      },
      {
        name: "numP",
        align: "left",
        label: "Numero plaque",
        field: "numP",
        sortable: true,
      },
      {
        name: "vehicule_category",
        align: "left",
        label: "Categorie",
        field: "vehicule_category",
        sortable: true,
      },
      {
        name: "type_carburant",
        align: "left",
        label: "Type Carburant",
        field: "type_carburant",
        sortable: true,
      },
    ]);

    const pagination = ref({ rowsPerPage: 10 });
    onMounted(async () => {
      await store.fetchVehicule();
    });

    const data = computed(() => store.vehicules);

    return {
      filter,
      addFlag,
      mode,
      columns,
      data,
      pagination,
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
