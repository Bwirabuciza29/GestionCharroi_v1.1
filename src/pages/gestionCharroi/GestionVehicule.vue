<template>
  <q-page class="q-pa-md w-full px-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Gestion Vehicules
    </div>
    <q-card class="px-6 mx-auto shadow-lg rounded-lg overflow-hidden">
      <q-table
        class="custom-table"
        title="Nos Vehicules"
        :rows="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="matricule"
        :grid="mode == 'grid'"
        :filter="filter"
        v-model:pagination="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn
            label="Voir Liste des Charrois"
            color="primary"
            no-caps
            @click="alert = true"
          />
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
                @click="editVehicule(props.row)"
              />
              <q-btn
                dense
                outline
                size="sm"
                color="red"
                icon="delete"
                @click="deleteVehicule(props.row)"
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
    <q-dialog v-model="alert" full-width>
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
          <div v-if="data.length === 0" class="text-center text-gray-500">
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
                  Marque
                </th>
                <th
                  class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
                >
                  Plaque
                </th>
                <th
                  class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
                >
                  Categorie
                </th>
                <th
                  class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
                >
                  Type Carburant
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in data"
                :key="index"
                class="hover:bg-gray-100"
              >
                <td class="px-6 py-4 border-b border-gray-200">
                  {{ item.designation }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200">
                  {{ item.marque }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200">
                  {{ item.numP }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200">
                  {{ item.vehicule_category }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200">
                  {{ item.type_carburant }}
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
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useVehiculeStore } from "src/stores/vehiculeStore";
import { useAgentStore } from "src/stores/agentStore";

export default defineComponent({
  name: "NosVehicules",
  setup() {
    const printModal = () => {
      window.print();
    };
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
    stor.fetchChauffeur().then((result) => {
      result.forEach((t) => {
        les_agents.value.push({ value: t.id, label: t.noms });
      });
    });
    // end
    // ENREGISTRER ET MODIFIER VEHICULES
    async function saveVehicule() {
      vehicule.value.idAgent = idAgent.value.value;
      console.log("saving agent", vehicule.value);
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
    // SUPPRIMER VEHICULE
    async function deleteVehicule(val) {
      store.deleteVehicule(val).then((res) => {
        console.log(res);
      });
    }
    onMounted(async () => {
      await store.fetchVehicule();
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
