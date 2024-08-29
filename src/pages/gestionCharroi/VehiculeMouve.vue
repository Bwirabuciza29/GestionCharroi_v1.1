<template>
  <q-page class="q-pa-md w-full px-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Les Carnets de Bord
    </div>
    <q-card class="px-6 mx-auto shadow-lg rounded-lg overflow-hidden">
      <q-table
        title="Les Carnets de Bord"
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
            @click="addMouve()"
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
                @click="editMouve(props.row)"
              />
              <q-btn
                dense
                outline
                size="sm"
                color="red"
                icon="delete"
                @click="deleteMouve(props.row.id)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="addEditMouve" :maximized="$q.platform.is.mobile">
      <q-card
        :style="
          $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
        "
      >
        <q-card-section>
          <div class="text-h6 q-px-md">
            {{ addFlag ? "Add Mouvement" : "Edit Mouvement" }}
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
                  <q-input dense outlined v-model="mouve.id" disable />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Vehicule</q-item-label>
                  <q-select :options="les_vh" dense outlined v-model="idVeh" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Destination</q-item-label>
                  <q-input dense outlined v-model="mouve.destination" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Trajet en Km</q-item-label>
                  <q-input dense outlined v-model="mouve.trajet" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Consommation</q-item-label>
                  <q-input dense outlined v-model="mouve.consommation" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Type Carburant</q-item-label>
                  <q-select
                    :options="['Mazout/Gasoil', 'Essence']"
                    behavior="menu"
                    dense
                    outlined
                    v-model="mouve.type_carburant"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Date Sortie</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="mouve.dateSortie"
                    type="date"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Date Retour</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="mouve.dateRetour"
                    type="date"
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
              @click="saveMouve"
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
import { useMouveStore } from "src/stores/mouvStore";
import { useVehiculeStore } from "src/stores/vehiculeStore";

export default defineComponent({
  name: "MouvementManagement",
  setup() {
    const printModal = () => {
      window.print();
    };
    // Les Vars Selects
    const les_vh = ref([]);

    // end vars
    const stores = useMouveStore();
    const storer = useVehiculeStore();

    const filter = ref("");
    const destination = ref("");
    const trajet = ref("");
    const consommation = ref("");
    const type_carburant = ref("");
    const dateSortie = ref("");
    const dateRetour = ref("");
    const idVeh = ref(null);
    const id = ref("");
    const mouve = ref({});
    const addEditMouve = ref(false);
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
        required: true,
        label: "Chauffeur",
        align: "left",
        field: "noms",
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
        label: "Marque Vehicule",
        field: "marque",
        sortable: true,
      },
      {
        name: "numP",
        align: "left",
        label: "Numero du Plaque",
        field: "numP",
        sortable: true,
      },
      {
        name: "destination",
        align: "left",
        label: "Destination",
        field: "destination",
        sortable: true,
      },
      {
        name: "trajet",
        align: "left",
        label: "Trajet",
        field: "trajet",
        sortable: true,
      },
      {
        name: "consommation",
        align: "left",
        label: "Consommation",
        field: "consommation",
        sortable: true,
      },
      {
        name: "mouvement_type_carburant",
        align: "left",
        label: "Carburant tupe",
        field: "mouvement_type_carburant",
        sortable: true,
      },
      {
        name: "dateSortie",
        align: "left",
        label: "Date Sortie",
        field: "dateSortie",
        sortable: true,
      },
      {
        name: "dateRetour",
        align: "left",
        label: "Date Retour",
        field: "dateRetour",
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

    function addMouve() {
      addFlag.value = true;
      mouve.value = {};
      addEditMouve.value = true;
    }

    function editMouve(val) {
      addFlag.value = false;
      mouve.value = val;
      console.log(mouve.value);
      console.log(val);
      addEditMouve.value = true;
    }
    // SELECTS FETCHS
    // select option
    storer.fetchVehicule().then((result) => {
      result.forEach((t) => {
        les_vh.value.push({ value: t.id, label: t.designation });
      });
    });
    // End Fetch Select
    // ENREGISTRER ET MODIFIER MOUVEMENT
    async function saveMouve() {
      mouve.value.idVeh = idVeh.value.value;
      console.log("Saving Mouvement", mouve.value);
      if (addFlag.value) {
        console.log(mouve.value);
        stores.addMouve(mouve.value).then((res) => {
          console.log(res);
        });
      } else {
        stores.updateMouve(mouve.value).then((res) => {
          console.log(res);
        });
      }
    }
    // SUPPRIMER ETUDIANT
    async function deleteMouve(id) {
      console.log("Deleting Mouve with id", id);
      stores.deleteMouve(id).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      stores.fetchMouve();
    });

    const datas = computed(() => stores.mouves);
    console.log(datas.value);

    return {
      les_vh,
      addEditMouve,
      mouve,
      addFlag,
      stores,
      storer,
      filter,
      id,
      idVeh,
      destination,
      trajet,
      consommation,
      type_carburant,
      dateSortie,
      dateRetour,
      datas,
      pagination,
      saveMouve,
      editMouve,
      deleteMouve,
      addMouve,
      mode,
      columns,
      viewToggle: ref(false),
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
