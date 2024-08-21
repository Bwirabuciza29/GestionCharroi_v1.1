<template>
  <q-page class="q-pa-md w-full px-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Gestion des Agents
    </div>
    <q-card class="px-6 mx-auto shadow-lg rounded-lg overflow-hidden">
      <q-table
        title="Nos Agents"
        :rows="datas"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="nom"
        :grid="mode == 'grid'"
        :filter="filter"
        v-model:pagination="pagination"
        class="custom-table"
      >
        <template v-slot:top-right="props">
          <q-btn
            @click="addAgent()"
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
                @click="editAgent(props.row)"
              />
              <q-btn
                dense
                outline
                size="sm"
                color="primary"
                icon="visibility"
                @click="openModal(props.row)"
              />
              <q-btn
                dense
                outline
                size="sm"
                color="red"
                icon="delete"
                @click="deleteAgent(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="addEditAgent" :maximized="$q.platform.is.mobile">
      <q-card
        :style="
          $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
        "
      >
        <q-card-section>
          <div class="text-h6 q-px-md">
            {{ addFlag ? "Ajouter Agent" : "Editer Agent" }}
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
                  <q-item-label class="q-pb-xs">Matricule Agent</q-item-label>
                  <q-input dense outlined v-model="agent.matricule" disable />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Noms Complet</q-item-label>
                  <q-input dense outlined v-model="agent.noms" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Category Agent</q-item-label>
                  <q-select
                    :options="['Chauffeur', 'Mecanicien']"
                    behavior="menu"
                    dense
                    outlined
                    v-model="agent.category"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Date de Naissance</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="agent.dateNaissance"
                    type="date"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Lieu de Naissance</q-item-label>
                  <q-input dense outlined v-model="agent.lieuNaissance" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Email</q-item-label>
                  <q-input dense outlined v-model="agent.email" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Téléphone</q-item-label>
                  <q-input dense outlined v-model="agent.tel" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-center">
                  <q-item-label class="q-pb-xs">Photo</q-item-label>
                  <q-input filled dense type="file" v-model="agent.photo" />
                  <q-img
                    :src="agent.photo"
                    v-if="!addFlag"
                    class="mt-4 border-2 border-gray-300 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover mx-auto my-auto"
                  />
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
              @click="saveAgent"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-teal"></q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="viewAgent">
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
          <h3 class="text-md font-semibold leading-relaxed">
            A Propos de l'Agent
          </h3>
        </div>
        <div class="flex no-wrap text-base leading-relaxed">
          <div class="mb-4 flex-1 p-4">
            <p class="mb-2">
              <span class="font-semibold">Matricule:</span>
              {{ selectedAgent.matricule }}
            </p>
            <p class="mb-2">
              <span class="font-semibold">noms:</span>
              {{ selectedAgent.noms }}
            </p>
            <p class="mb-2">
              <span class="font-semibold">Category:</span>
              {{ selectedAgent.category }}
            </p>
            <p class="mb-2">
              <span class="font-semibold">Date:</span>
              {{ selectedAgent.dateNaissance }}
            </p>

            <p class="mb-2">
              <span class="font-semibold">Lieu Naiss.:</span>
              {{ selectedAgent.lieuNaissance }}
            </p>
            <p class="mb-2">
              <span class="font-semibold">Email.:</span>
              {{ selectedAgent.email }}
            </p>
            <p class="mb-2">
              <span class="font-semibold">Téléphone.:</span>
              {{ selectedAgent.tel }}
            </p>
          </div>
          <div class="mb-4 ml-0 md:ml-4 flex-none">
            <div class="w-full md:w-48 mt-6">
              <img
                :src="'http://localhost/PROJETTUTORE' + selectedAgent.photo"
                alt="Agent Photo"
                class="w-[300px] h-[300px] object-cover border border-gray-300"
              />
            </div>
            <div
              class="flex flex-col md:flex-row items-center justify-between mt-4"
            >
              <div class="text-center"></div>
              <div class="text-center">
                <!-- <p class="text-gray-500 leading-relaxed">Office de Routes</p> -->
                <p class="text-gray-500 leading-relaxed text-center">
                  Goma,Nord-Kivu @2024
                </p>

                <div
                  @click="printModal()"
                  class="no-print-me bg-blue-500 text-white font-semibold"
                >
                  <span> Imprimer </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useAgentStore } from "src/stores/agentStore";

export default defineComponent({
  name: "AgentManagement",
  setup() {
    const printModal = () => {
      window.print();
    };

    const store = useAgentStore();
    // const store = useStore();

    const filter = ref("");
    const noms = ref("");
    const category = ref("");
    const dateNaissance = ref("");
    const lieuNaissance = ref("");
    const email = ref("");
    const tel = ref("");
    const photo = ref("");
    const agent = ref({});
    const id = ref("");
    const matricule = ref("");
    const addEditAgent = ref(false);
    const addFlag = ref(true);
    const mode = ref("list");
    const selectedAgent = ref(null);
    const viewAgent = ref(false);
    const columns = ref([
      {
        name: "matricule",
        required: true,
        align: "left",
        label: "Matricule",
        field: "matricule",
        sortable: true,
      },
      {
        name: "noms",
        required: true,
        label: "Noms Agent",
        align: "left",
        field: "noms",
        sortable: true,
      },
      {
        name: "category",
        align: "left",
        label: "Category",
        field: "category",
        sortable: true,
      },
      {
        name: "lieuNaissance",
        align: "left",
        label: "Lieu de Naissance",
        field: "lieuNaissance",
        sortable: true,
      },
      {
        name: "dateNaissance",
        align: "left",
        label: "Date de Naissance",
        field: "dateNaissance",
        sortable: true,
      },
      {
        name: "email",
        align: "left",
        label: "Email",
        field: "email",
        sortable: true,
      },
      {
        name: "tel",
        align: "left",
        label: "Telephone",
        field: "tel",
        sortable: true,
      },
      {
        name: "photo",
        align: "left",
        label: "Photo",
        field: "photo",
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
    const openModal = (s) => {
      viewAgent.value = true;
      selectedAgent.value = s;
      console.log(selectedAgent.value);
    };
    const pagination = ref({ rowsPerPage: 10 });

    function addAgent() {
      addFlag.value = true;
      agent.value = {}; // On réinitialise l'agent pour un ajout
      console.log("Ajout d'un nouvel agent"); // Vérifiez si la fonction est appelée
      addEditAgent.value = true;
    }

    function editAgent(val) {
      addFlag.value = false;
      agent.value = { ...val }; // Copie les valeurs de l'agent sélectionné
      console.log("Modification de l'agent", agent.value); // Vérifiez les données chargées
      agent.value.photo = "http://localhost/PROJETTUTORE/images/" + val.photo;
      addEditAgent.value = true;
    }

    // ENREGISTRER ET MODIFIER AGENT
    async function saveAgent() {
      console.log("Saving Agent", agent.value);
      if (addFlag.value) {
        console.log(agent.value);
        store.addAgent(agent.value).then((res) => {
          console.log(res);
        });
      } else {
        store.updateAgent(agent.value).then((res) => {
          console.log(res);
        });
      }
    }
    // SUPPRIMER AGENT
    async function deleteAgent(val) {
      store.deleteAgent(val).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchAgents();
    });

    const datas = computed(() => store.agents);
    console.log(datas.value);

    return {
      agent,
      addFlag,
      store,
      filter,
      id,
      tel,
      matricule,
      noms,
      category,
      email,
      lieuNaissance,
      dateNaissance,
      photo,
      datas,
      pagination,
      saveAgent,
      editAgent,
      deleteAgent,
      addAgent,
      mode,
      columns,
      viewToggle: ref(false),
      addEditAgent,
      viewAgent,
      selectedAgent,
      openModal,
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
