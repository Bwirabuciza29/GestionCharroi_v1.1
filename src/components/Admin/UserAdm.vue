<template>
  <q-table
    class="min-w-full border-gray-200 square"
    title="Nos Utilisateurs"
    :rows="data"
    :hide-header="mode === 'grid'"
    :columns="columns"
    row-key="Id_adm"
    :grid="mode == 'grid'"
    :filter="filter"
    v-model:pagination="pagination"
  >
    <template v-slot:top-right="props">
      <q-btn
        @click="addUser"
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
            @click="editUser(props.row)"
          />
          <q-btn
            dense
            outline
            size="sm"
            color="red"
            icon="delete"
            @click="deleteUser(props.row.Id_adm)"
          />
        </div>
      </q-td>
    </template>
  </q-table>
  <q-dialog v-model="addEditUser" :maximized="$q.platform.is.mobile">
    <q-card
      :style="
        $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
      "
    >
      <q-card-section>
        <div class="text-h6 q-px-md">
          {{ addFlag ? "Ajouter Utilisateur" : "Editer Utilisateur" }}
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
                <q-item-label class="q-pb-xs">Id</q-item-label>
                <q-input dense outlined v-model="user.Id_adm" disable />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Catégorie</q-item-label>
                <!-- <q-input dense outlined v-model="user.Id_cat" /> -->
                <q-select :options="les_cat" dense outlined v-model="Id_cat" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Nom</q-item-label>
                <q-input dense outlined v-model="user.nom_a" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Prenom</q-item-label>
                <q-input dense outlined v-model="user.prenom_a" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Email</q-item-label>
                <q-input dense outlined v-model="user.email_a" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Téléphone</q-item-label>
                <q-input dense outlined v-model="user.phone_a" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Adresse</q-item-label>
                <q-input dense outlined v-model="user.adresse" />
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
              @click="saveUser"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useUserStore } from "src/stores/userStore";
import { useCatStore } from "src/stores/catStore";

export default defineComponent({
  name: "NosUsers",
  setup() {
    // Le Var select
    const les_cat = ref([]);
    // end var
    const store = useUserStore();
    const stor = useCatStore();
    // End call stors
    const filter = ref("");
    const Id_adm = ref("");
    const Id_cat = ref(null);
    const nom_a = ref("");
    const prenom_a = ref("");
    const email_a = ref("");
    const phone_a = ref("");
    const adresse = ref("");
    const user = ref({});
    const addEditUser = ref(false);
    const addFlag = ref(true);
    const mode = ref("list");
    const columns = ref([
      {
        name: "matricule",
        align: "left",
        label: "Matricule",
        field: "matricule",
        sortable: true,
      },
      {
        name: "nom_a",
        align: "left",
        label: "Nom",
        field: "nom_a",
        sortable: true,
      },
      {
        name: "prenom_a",
        align: "left",
        label: "Prenom",
        field: "prenom_a",
        sortable: true,
      },
      {
        name: "email_a",
        align: "left",
        label: "Email",
        field: "email_a",
        sortable: true,
      },
      {
        name: "phone_a",
        align: "left",
        label: "Téléphone",
        field: "phone_a",
        sortable: true,
      },
      {
        name: "adresse",
        align: "left",
        label: "Adresse",
        field: "adresse",
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

    function addUser() {
      console.log("addUser method called");
      addFlag.value = true;
      user.value = {};
      addEditUser.value = true;
    }

    function editUser(val) {
      addFlag.value = false;
      user.value = val;
      console.log(user.value);
      addEditUser.value = true;
    }
    // SELECTS FETCHS
    // select categories
    stor.fetchCat().then((result) => {
      result.forEach((t) => {
        les_cat.value.push({ value: t.Id_cat, label: t.designation });
      });
    });
    // end
    // ENREGISTRER ET MODIFIER USERS
    async function saveUser() {
      user.value.Id_cat = Id_cat.value.value;
      console.log("saving user", user.value);
      if (addFlag.value) {
        store.addUser(user.value).then((res) => {
          console.log(res);
        });
      } else {
        store.updateUser(user.value).then((res) => {
          console.log(res);
        });
      }
    }

    async function deleteUser(Id_adm) {
      console.log("Deleting User with id", Id_adm);
      store.deleteUser(Id_adm).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchUser();
    });

    const data = computed(() => store.users);

    return {
      les_cat,
      Id_adm,
      Id_cat,
      nom_a,
      prenom_a,
      email_a,
      phone_a,
      adresse,
      filter,
      addEditUser,
      addFlag,
      mode,
      user,
      columns,
      data,
      pagination,
      addUser,
      editUser,
      saveUser,
      deleteUser,
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
