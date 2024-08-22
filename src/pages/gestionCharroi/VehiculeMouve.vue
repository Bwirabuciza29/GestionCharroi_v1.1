<template>
  <q-page class="q-pa-md w-full px-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Mouvements Vehicules
    </div>
    <q-card class="px-6 mx-auto shadow-lg rounded-lg overflow-hidden">
      <q-table
        title="Gestion Mouvements"
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
                @click="deleteMouve(props.row)"
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
                  <q-select :options="les_vh" dense outlined v-model="id" />
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
                  <q-item-label class="q-pb-xs">Trajet</q-item-label>
                  <q-input dense outlined v-model="mouve.trajet" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Consommation</q-item-label>
                  <q-input dense outlined v-model="mouve.consommation" />
                </q-item-section>
              </q-item>
              <!-- <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Genre</q-item-label>
                  <q-select
                    :options="['M', 'F']"
                    behavior="menu"
                    dense
                    outlined
                    v-model="student.Genre"
                  />
                </q-item-section>
              </q-item> -->
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Type Carburant</q-item-label>
                  <q-input dense outlined v-model="mouve.type_carburant" />
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
import { useInscStore } from "src/stores/inscStore";
import { useOptionsStore } from "src/stores/optionStore";
import { usePromotionsStore } from "src/stores/promoStore";
import { useAnneeStore } from "src/stores/anneeStore";
// import { useStore } from "src/stores/store";

export default defineComponent({
  name: "StudentManagement",
  setup() {
    const printModal = () => {
      window.print();
    };
    // Les Vars Selects
    const les_opt = ref([]);
    const les_prom = ref([]);
    const les_annee = ref([]);

    // end vars
    const stores = useOptionsStore();
    const storer = usePromotionsStore();
    const storee = useAnneeStore();
    const store = useInscStore();
    // const store = useStore();

    const filter = ref("");
    const nom = ref("");
    const postnom = ref("");
    const prenom = ref("");
    const genre = ref("");
    const lieu_naissance = ref("");
    const date_naissance = ref("");
    const id_quartier = ref("");
    const id_avenue = ref("");
    const id_option = ref(null);
    const id_promotion = ref(null);
    const id_annee = ref(null);
    const photo = ref("");
    const student = ref({});
    const matricule = ref("");
    const addEditInscription = ref(false);
    const addFlag = ref(true);
    const mode = ref("list");
    const selectedStudent = ref(null);
    const viewStudent = ref(false);
    const columns = ref([
      {
        name: "matriculeEt",
        align: "left",
        label: "Matricule",
        field: "matriculeEt",
        sortable: true,
      },
      {
        name: "Nom",
        required: true,
        label: "Nom",
        align: "left",
        field: "Nom",
        sortable: true,
      },
      {
        name: "Postnom",
        align: "left",
        label: "Postnom",
        field: "Postnom",
        sortable: true,
      },
      {
        name: "Prenom",
        align: "left",
        label: "Prenom",
        field: "Prenom",
        sortable: true,
      },
      {
        name: "Genre",
        align: "left",
        label: "Genre",
        field: "Genre",
        sortable: true,
      },
      {
        name: "LieuNaissance",
        align: "left",
        label: "Lieu de Naissance",
        field: "LieuNaissance",
        sortable: true,
      },
      {
        name: "DateNaissance",
        align: "left",
        label: "Date de Naissance",
        field: "DateNaissance",
        sortable: true,
      },
      {
        name: "desOption",
        align: "left",
        label: "Option",
        field: "desOption",
        sortable: true,
      },
      {
        name: "desProm",
        align: "left",
        label: "Promotion",
        field: "desProm",
        sortable: true,
      },
      {
        name: "anneeAc",
        align: "left",
        label: "Année Académiqe",
        field: "anneeAc",
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
      viewStudent.value = true;
      selectedStudent.value = s;
      console.log(selectedStudent.value);
    };
    const pagination = ref({ rowsPerPage: 10 });

    function addStudent() {
      addFlag.value = true;
      student.value = {};
      addEditInscription.value = true;
    }

    function editStudent(val) {
      addFlag.value = false;
      student.value = val;
      console.log(student.value);
      student.value.photo =
        "http://localhost/GESTION_ANONYMAT/images/" + val.photo;
      console.log(val);
      addEditInscription.value = true;
    }
    // SELECTS FETCHS
    // select option
    stores.fetchOptions().then((result) => {
      result.forEach((t) => {
        les_opt.value.push({ value: t.id, label: t.desOption });
      });
    });
    // select promotion
    storer.fetchPromotions().then((result) => {
      result.forEach((p) => {
        les_prom.value.push({ value: p.id, label: p.desProm });
      });
    });
    //select annee
    storee.fetchAnnee().then((result) => {
      result.forEach((a) => {
        les_annee.value.push({ value: a.id, label: a.anneeAc });
      });
    });

    // End Fetch Select
    // ENREGISTRER ET MODIFIER ETUDIANT
    async function saveStudent() {
      student.value.id_quartier = id_quartier.value;
      student.value.id_avenue = id_avenue.value;
      student.value.id_option = id_option.value.value;
      student.value.id_promotion = id_promotion.value.value;
      student.value.id_annee = id_annee.value.value;
      console.log("Saving Student", student.value);
      if (addFlag.value) {
        console.log(student.value);
        store.addInscription(student.value).then((res) => {
          console.log(res);
        });
      } else {
        store.updateInscription(student.value).then((res) => {
          console.log(res);
        });
      }
    }
    // SUPPRIMER ETUDIANT
    async function deleteStudent(val) {
      store.deleteInscription(val).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchInscriptions();
    });

    const datas = computed(() => store.inscriptions);
    console.log(datas.value);

    return {
      les_opt,
      les_prom,
      les_annee,
      addEditInscription,
      student,
      addFlag,
      store,
      filter,
      matricule,
      nom,
      postnom,
      prenom,
      genre,
      lieu_naissance,
      date_naissance,
      photo,
      id_quartier,
      id_avenue,
      id_option,
      id_promotion,
      id_annee,
      datas,
      pagination,
      saveStudent,
      editStudent,
      deleteStudent,
      addStudent,
      mode,
      columns,
      viewToggle: ref(false),
      addEditStudent: ref(false),
      viewStudent,
      selectedStudent,
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
