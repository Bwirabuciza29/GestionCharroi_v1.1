<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-table
        title="Inscription Etudiant"
        :rows="data"
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
          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:body-cell-photo="props">
          <q-td :props="props">
            <q-avatar>
              <img
                class="object-cover"
                :src="
                  'http://localhost/GESTION_ANONYMAT/images/' + props.row.photo
                "
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
    </q-card>
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
                  <q-item-label class="q-pb-xs"
                    >Matricule étudiant</q-item-label
                  >
                  <q-input dense outlined v-model="matricule" disable />
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
                  <q-item-label class="q-pb-xs">ID Option</q-item-label>
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
                  <q-item-label class="q-pb-xs">ID Promotion</q-item-label>
                  <q-input dense outlined v-model="id_promotion" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">ID Année</q-item-label>
                  <q-input dense outlined v-model="id_annee" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-center">
                  <q-item-label class="q-pb-xs">Photo</q-item-label>
                  <q-input type="file" v-model="student.photo" />
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
      <q-card
        class="q-pa-md"
        :style="
          $q.platform.is.desktop
            ? { width: '600px', 'max-width': '60vw' }
            : { width: '100%' }
        "
      >
        <div class="row full-width">
          <div
            class="full-height self-center q-mr-md"
            :style="
              $q.platform.is.mobile
                ? {
                    width: '100%',
                    'text-align': 'center',
                    'margin-bottom': '20%',
                  }
                : {}
            "
          >
            <q-avatar :size="$q.platform.is.desktop ? '150px' : '200px'">
              <img :src="selectedStudent.photo" />
            </q-avatar>
          </div>
          <q-separator :vertical="$q.platform.is.desktop" />
          <div class="q-ml-md q-gutter-md">
            <div class="row">
              <span class="text-weight-bold">Nom:</span>
              <span class="text-grey-8 q-ml-sm">{{ selectedStudent.nom }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">Postnom:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.postnom
              }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">Prenom:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.prenom
              }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">Genre:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.genre
              }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">Lieu de Naissance:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.lieu_naissance
              }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">Date de Naissance:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.date_naissance
              }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">ID Quartier:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.id_quartier
              }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">ID Avenue:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.id_avenue
              }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">ID Option:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.id_option
              }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">ID Promotion:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.id_promotion
              }}</span>
            </div>
            <div class="row">
              <span class="text-weight-bold">ID Année:</span>
              <span class="text-grey-8 q-ml-sm">{{
                selectedStudent.id_annee
              }}</span>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useInscStore } from "src/stores/inscStore";
import { useOptionsStore } from "src/stores/optionStore";
import { exportFile, useQuasar } from "quasar";
function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default defineComponent({
  name: "StudentManagement",

  setup() {
    const $q = useQuasar();
    // Les Vars Selects
    const les_opt = ref([]);
    // end vars
    const rows = ref([]);
    const stores = useOptionsStore();
    const store = useInscStore();
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
    const id_annee = ref("");
    const photo = ref("");
    const student = ref({});
    const matricule = ref("");
    const addEditInscription = ref(false);
    const addFlag = ref(true);
    const mode = ref("list");
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
      student.value.photo = "http://localhost/GESTION_ANONYMAT" + val.photo;
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
    // End Fetch Select
    // ENREGISTRER ET MODIFIER ETUDIANT
    async function saveStudent() {
      student.value.id_quartier = id_quartier.value;
      student.value.id_avenue = id_avenue.value;
      student.value.id_option = id_option.value.value;
      student.value.id_promotion = id_promotion.value;
      student.value.id_annee = id_annee.value;
      console.log("Saving Student", student.value);
      if (addFlag.value) {
        console.log(student.value);
        store.addInscription(student.value).then((res) => {
          console.log(res);
        });
      } else {
        inscription.value.nom = nom.value;
        inscription.value.postnom = postnom.value;
        inscription.value.prenom = prenom.value;
        inscription.value.genre = genre.value;
        inscription.value.lieu_naissance = lieu_naissance.value;
        inscription.value.date_naissance = date_naissance.value;
        inscription.value.id_quartier = id_quartier.value;
        inscription.value.id_avenue = id_avenue.value;
        inscription.value.id_option = id_option.value;
        inscription.value.id_promotion = id_promotion.value;
        inscription.value.id_annee = id_annee.value;
        inscription.value.photo = photo.value;

        store.updateInscription(inscription.value).then((res) => {
          console.log(res);
        });
        addEditOption.value = false;
      }
    }
    // SUPPRIMER ETUDIANT
    async function deleteStudent(id) {
      console.log("Deleting option with id", id);
      store.deleteInscription(id).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchInscriptions();
    });

    const data = computed(() => store.inscriptions);
    console.log(data.value);

    return {
      les_opt,
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
      data,
      pagination,
      saveStudent,
      editStudent,
      deleteStudent,
      addStudent,
      mode,
      columns,
      rows,
      viewToggle: ref(false),
      addEditStudent: ref(false),
      viewStudent: ref(false),
      selectedStudent: ref({}),
      exportTable() {
        // naive encoding to csv format
        const content = [columns.value.map((col) => wrapCsvValue(col.label))]
          .concat(
            rows.value.map((row) =>
              columns.value
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format,
                    row
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");

        const status = exportFile("Inscription.csv", content, "text/csv");

        if (status !== true) {
          $q.notify({
            message: "Browser denied file download...",
            color: "negative",
            icon: "warning",
          });
        }
      },
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
