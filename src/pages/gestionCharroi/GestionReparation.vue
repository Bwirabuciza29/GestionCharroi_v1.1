<template>
  <q-page class="q-pa-md w-full px-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Reparation Véhicules
    </div>
    <q-card class="px-6 mx-auto shadow-lg rounded-lg overflow-hidden">
      <q-table
        title="Reparation Vehicules"
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
            @click="addReparation()"
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
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                dense
                outline
                size="sm"
                color="primary"
                icon="edit"
                @click="editReparation(props.row)"
              />
              <q-btn
                dense
                outline
                size="sm"
                color="red"
                icon="delete"
                @click="deleteReparation(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="addEditReparation" :maximized="$q.platform.is.mobile">
      <q-card
        :style="
          $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
        "
      >
        <q-card-section>
          <div class="text-h6 q-px-md">
            {{ addFlag ? "Add Reparation" : "Edit Reparation" }}
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
                  <q-item-label class="q-pb-xs">ID</q-item-label>
                  <q-input dense outlined v-model="reparation.id" disable />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Mecanicien</q-item-label>
                  <q-select
                    :options="les_agents"
                    dense
                    outlined
                    v-model="idAgent"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs"
                    >Vehucule à reparer</q-item-label
                  >
                  <q-select
                    :options="les_vh"
                    dense
                    outlined
                    v-model="idVehicule"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">description panne</q-item-label>
                  <q-input dense outlined v-model="reparation.panne" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Date</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="reparation.dateRep"
                    type="date"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Duree en Jours</q-item-label>
                  <q-input dense outlined v-model="reparation.duree" />
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
              @click="saveReparation"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-teal"></q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRepStore } from "src/stores/repStore";
import { useAgentStore } from "src/stores/agentStore";
import { useVehiculeStore } from "src/stores/vehiculeStore";
// import { useStore } from "src/stores/store";

export default defineComponent({
  name: "RepManagement",
  setup() {
    const printModal = () => {
      window.print();
    };
    // Les Vars Selects
    const les_agents = ref([]);
    const les_vh = ref([]);

    // end vars
    const store = useRepStore();
    const stores = useAgentStore();
    const storer = useVehiculeStore();
    // const store = useStore();

    const filter = ref("");
    const id = ref("");
    const idAgent = ref(null);
    const idVehicule = ref(null);
    const panne = ref("");
    const dateRep = ref("");
    const duree = ref("");
    const reparation = ref({});
    const addEditReparation = ref(false);
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
        label: "Matricule Mecanicien",
        field: "matricule",
        sortable: true,
      },
      {
        name: "noms",
        required: true,
        label: "Nom Mecanicien",
        align: "left",
        field: "noms",
        sortable: true,
      },
      {
        name: "designation",
        align: "left",
        label: "Vehicule à Reparer",
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
        label: "Plaque",
        field: "numP",
        sortable: true,
      },
      {
        name: "panne",
        align: "left",
        label: "Description Panne",
        field: "panne",
        sortable: true,
      },
      {
        name: "dateRep",
        align: "left",
        label: "Date Reparation",
        field: "dateRep",
        sortable: true,
      },
      {
        name: "duree",
        align: "left",
        label: "Duree en Jours",
        field: "duree",
        sortable: true,
      },
      {
        name: "action",
        align: "left",
        label: "Action",
        field: "action",
        sortable: true,
      },
    ]);

    const pagination = ref({ rowsPerPage: 10 });

    function addReparation() {
      addFlag.value = true;
      reparation.value = {};
      addEditReparation.value = true;
    }

    function editReparation(val) {
      addFlag.value = false;
      reparation.value = val;
      console.log(reparation.value);
      console.log(val);
      addEditReparation.value = true;
    }
    // SELECTS FETCHS
    // select mecanicien
    stores.fetchMecanicien().then((result) => {
      result.forEach((t) => {
        les_agents.value.push({ value: t.id, label: t.noms });
      });
    });
    // select vehicules
    storer.fetchVehicule().then((result) => {
      result.forEach((p) => {
        les_vh.value.push({ value: p.id, label: p.designation });
      });
    });

    // End Fetch Select
    // ENREGISTRER ET MODIFIER ETUDIANT
    async function saveReparation() {
      vehicule.value.idAgent = idAgent.value.value;
      vehicule.value.idVehicule = idVehicule.value.value;
      console.log("Saving Reparation", reparation.value);
      if (addFlag.value) {
        console.log(reparation.value);
        store.addReparation(reparation.value).then((res) => {
          console.log(res);
        });
      } else {
        store.updateReparation(reparation.value).then((res) => {
          console.log(res);
        });
      }
    }
    // SUPPRIMER ETUDIANT
    async function deleteReparation(val) {
      store.deleteReparation(val).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchReparations();
    });

    const datas = computed(() => store.reparations);
    console.log(datas.value);

    return {
      les_agents,
      les_vh,
      addEditReparation,
      reparation,
      addFlag,
      store,
      filter,
      id,
      idAgent,
      idVehicule,
      panne,
      dateRep,
      duree,
      datas,
      pagination,
      saveReparation,
      editReparation,
      deleteReparation,
      addReparation,
      mode,
      columns,
      printModal,
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
