<template>
  <q-table
    title="Inscription Etudiant"
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
        @click="addStudent()"
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
            :src="'http://localhost/GESTION_ANONYMAT' + props.row.photo"
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
            @click="editStudent(props.row)"
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
            @click="deleteStudent(props.row)"
          />
        </div>
      </q-td>
    </template>
  </q-table>

  <q-dialog v-model="addEditInscription" :maximized="$q.platform.is.mobile">
    <q-card
      :style="
        $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
      "
    >
      <q-card-section>
        <div class="text-h6 q-px-md">
          {{ addFlag ? "Add Student" : "Edit Student" }}
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
                <q-item-label class="q-pb-xs">Matricule étudiant</q-item-label>
                <q-input dense outlined v-model="student.matriculeEt" disable />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Nom</q-item-label>
                <q-input dense outlined v-model="student.Nom" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Postnom</q-item-label>
                <q-input dense outlined v-model="student.Postnom" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Prenom</q-item-label>
                <q-input dense outlined v-model="student.Prenom" />
              </q-item-section>
            </q-item>
            <q-item>
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
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Lieu de Naissance</q-item-label>
                <q-input dense outlined v-model="student.LieuNaissance" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Date de Naissance</q-item-label>
                <q-input
                  dense
                  outlined
                  v-model="student.DateNaissance"
                  type="date"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">ID Quartier</q-item-label>
                <q-input dense outlined v-model="id_quartier" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">ID Avenue</q-item-label>
                <q-input dense outlined v-model="id_avenue" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Option</q-item-label>
                <q-select
                  :options="les_opt"
                  dense
                  outlined
                  v-model="id_option"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Promotion</q-item-label>
                <q-select
                  :options="les_prom"
                  dense
                  outlined
                  v-model="id_promotion"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Année Académique</q-item-label>
                <q-select
                  :options="les_annee"
                  dense
                  outlined
                  v-model="id_annee"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-center">
                <q-item-label class="q-pb-xs">Photo</q-item-label>
                <q-input filled dense type="file" v-model="student.photo" />
                <q-img
                  :src="student.photo"
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
            @click="saveStudent"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right" class="text-teal"></q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="viewStudent">
    <div
      class="print-me bg-white p-6 rounded-lg shadow-md w-full print:max-w-full print:p-0 max-w-2xl"
    >
      <div
        class="flex flex-col print:flex-row md:flex-row print:justify-center print:items-center text-center items-center justify-between mb-4"
      >
        <img
          src="~assets/logo.png"
          alt="Logo 1"
          class="h-14 w-14 mb-4 md:mb-0"
        />
        <div class="text-left md:text-center flex-1 mx-4">
          <h1 class="text-lg font-bold leading-relaxed">
            INSTITUT SUPERIEUR DE COMMERCE
          </h1>
          <h2 class="text-md leading-relaxed">ISC-GOMA</h2>
          <a href="http://www.iscgoma.net" class="text-blue-600 leading-relaxed"
            >www.iscgoma.net</a
          >
        </div>
        <img
          src="~assets/logo.png"
          alt="Logo 2"
          class="h-14 w-14 mb-4 md:mb-0"
        />
      </div>
      <div class="border-t border-b border-gray-300 py-2 text-center mb-4">
        <h3 class="text-md font-semibold leading-relaxed">
          Reçu de paiement frais inscription n° 144563
        </h3>
      </div>
      <div class="flex no-wrap text-base leading-relaxed">
        <div class="mb-4 flex-1 p-4">
          <p class="mb-2">
            <span class="font-semibold">NOMS:</span>
            {{ selectedStudent.Nom }} {{ selectedStudent.Postnom }}
            {{ selectedStudent.Prenom }}
          </p>
          <p class="mb-2">
            <span class="font-semibold">Option:</span>
            {{ selectedStudent.desOption }}
          </p>
          <p class="mb-2">
            <span class="font-semibold">Promotion:</span>
            {{ selectedStudent.desProm }}
          </p>
          <p class="mb-2">
            <span class="font-semibold">Montant en chiffre:</span> $ 16.0
          </p>
          <p class="mb-2">
            <span class="font-semibold">Montant lettre:</span> Seize Dollars
          </p>
          <p class="mb-2">
            <span class="font-semibold">Référence n°:</span> 720CSDP233380401
          </p>
          <p class="mb-2">
            <span class="font-semibold">Matricule:</span>
            {{ selectedStudent.matriculeEt }}
          </p>
          <p class="mb-2">
            <span class="font-semibold">Date Insc.:</span>
            {{ selectedStudent.dateIn }}
          </p>
          <p class="mb-2">
            <span class="font-semibold">Année Ac.:</span>
            {{ selectedStudent.anneeAc }}
          </p>
        </div>
        <div class="mb-4 ml-0 md:ml-4 flex-none">
          <div class="w-full md:w-48 mt-6">
            <img
              :src="'http://localhost/GESTION_ANONYMAT' + selectedStudent.photo"
              alt="Student Photo"
              class="w-[300px] h-[300px] object-cover border border-gray-300"
            />
          </div>
          <div
            class="flex flex-col md:flex-row items-center justify-between mt-4"
          >
            <div class="text-center"></div>
            <div class="text-center">
              <p class="text-gray-500 leading-relaxed">L'apparitorat Central</p>
              <p class="font-semibold leading-relaxed">Ass. ALEXANDRE</p>
              <p class="text-gray-500 leading-relaxed">
                Goma, le {{ selectedStudent.dateIn }}
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
