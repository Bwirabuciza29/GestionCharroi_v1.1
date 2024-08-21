<template>
  <q-page class="q-pa-md w-full px-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Gestion Vehicules
    </div>
    <q-card class="px-6 mx-auto shadow-lg rounded-lg overflow-hidden">
      <q-table
        class="min-w-full border-gray-200 square"
        title="Nos Vehicules"
        :rows="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="id"
        :grid="mode == 'grid'"
        :filter="filter"
        v-model:pagination="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn
            @click="addVehicule"
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
                @click="editVehicule(props.row)"
              />
              <q-btn
                dense
                outline
                size="sm"
                color="red"
                icon="delete"
                @click="deleteVehicule(props.row.id)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="addEditVehicule" :maximized="$q.platform.is.mobile">
      <q-card
        :style="
          $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
        "
      >
        <q-card-section>
          <div class="text-h6 q-px-md">
            {{ addFlag ? "Ajouter vehicule" : "Editer vehicule" }}
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
                  <q-item-label class="q-pb-xs">id</q-item-label>
                  <q-input dense outlined v-model="vehicule.id" disable />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nom Agent</q-item-label>
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
                  <q-item-label class="q-pb-xs">Designation</q-item-label>
                  <q-input dense outlined v-model="vehicule.designation" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Marque</q-item-label>
                  <q-input dense outlined v-model="vehicule.marque" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Numéro plaque</q-item-label>
                  <q-input dense outlined v-model="vehicule.numP" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Catégorie</q-item-label>
                  <q-input dense outlined v-model="vehicule.category" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Type de carburant</q-item-label>
                  <q-input dense outlined v-model="vehicule.type_carburant" />
                </q-item-section>
              </q-item>
            </q-list>
            <div class="q-px-md q-pt-sm">
              <q-btn
                class="full-width"
                label="Enregistrer"
                type="submit"
                color="primary"
                v-close-popup
                @click="saveVehicule"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useVehiculeStore } from "src/stores/vehiculeStore";
import { useAgentStore } from "src/stores/agentStore";

export default defineComponent({
  name: "NosVehicules",
  setup() {
    // Le Var select
    const les_agents = ref([]);
    // end var
    const store = useVehiculeStore();
    const stor = useAgentStore();
    // End call stors
    const filter = ref("");
    const id = ref("");
    const idAgent = ref(null);
    const designation = ref("");
    const marque = ref("");
    const numP = ref("");
    const category = ref("");
    const type_carburant = ref("");
    const vehicule = ref({});
    const addEditVehicule = ref(false);
    const addFlag = ref(true);
    const mode = ref("list");
    const columns = ref([
      {
        name: "id",
        align: "left",
        label: "Id",
        field: "id",
        sortable: true,
      },
      {
        name: "idAgent",
        align: "left",
        label: "Agent",
        field: "idAgent",
        sortable: true,
      },
      {
        name: "designation",
        align: "left",
        label: "Designation",
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
        name: "category",
        align: "left",
        label: "Categorie",
        field: "category",
        sortable: true,
      },
      {
        name: "action",
        align: "left",
        label: "Action",
        field: "action",
        sortable: false,
      },
    ]);

    const pagination = ref({ rowsPerPage: 10 });

    function addVehicule() {
      console.log("addVehicule method called");
      addFlag.value = true;
      vehicule.value = {};
      addEditVehicule.value = true;
    }

    function editVehicule(val) {
      addFlag.value = false;
      vehicule.value = val;
      console.log(vehicule.value);
      addEditVehicule.value = true;
    }
    // SELECTS FETCHS
    // select agents
    stor.fetchAgents().then((result) => {
      result.forEach((t) => {
        les_agents.value.push({ value: t.id, label: t.noms });
      });
    });
    // end
    // ENREGISTRER ET MODIFIER VEHICULES
    async function saveVehicule() {
      agent.value.idAgent = idAgent.value.value;
      console.log("saving agent", agent.value);
      if (addFlag.value) {
        store.addVehicule(vehicule.value).then((res) => {
          console.log(res);
        });
      } else {
        store.updateVehicule(vehicule.value).then((res) => {
          console.log(res);
        });
      }
    }

    async function deleteVehicule(id) {
      console.log("Deleting Vehicule with id", id);
      store.deleteVehicule(id).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchVehicule();
    });

    const data = computed(() => store.vehicules);

    return {
      les_agents,
      id,
      idAgent,
      designation,
      marque,
      numP,
      category,
      type_carburant,
      filter,
      addEditVehicule,
      addFlag,
      mode,
      vehicule,
      columns,
      data,
      pagination,
      addVehicule,
      editVehicule,
      saveVehicule,
      deleteVehicule,
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
