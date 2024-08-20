<template>
  <q-table
    class="min-w-full border-gray-200 square"
    title="Nos Utilisateurs Ayant accès à la Connexion"
    :rows="data"
    :hide-header="mode === 'grid'"
    :columns="columns"
    row-key="id_psw"
    :grid="mode == 'grid'"
    :filter="filter"
    v-model:pagination="pagination"
  >
    <template v-slot:top-right="props">
      <q-btn
        @click="addLog"
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
            @click="editLog(props.row)"
          />
          <q-btn
            dense
            outline
            size="sm"
            color="red"
            icon="delete"
            @click="deleteLog(props.row.id_psw)"
          />
        </div>
      </q-td>
    </template>
  </q-table>
  <q-dialog v-model="addEditLog" :maximized="$q.platform.is.mobile">
    <q-card
      :style="
        $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
      "
    >
      <q-card-section>
        <div class="text-h6 q-px-md">
          {{ addFlag ? "Ajouter Accès" : "Editer l'Accès" }}
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
                <q-input dense outlined v-model="log.id_psw" disable />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Utilisateur</q-item-label>
                <q-select
                  :options="les_users"
                  dense
                  outlined
                  v-model="Id_adm"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">psw</q-item-label>
                <q-input dense outlined v-model="log.psw" />
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
              @click="saveLog"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useLogStore } from "src/stores/LogStore";
import { useUserStore } from "src/stores/userStore";

export default defineComponent({
  name: "NosUsers",
  setup() {
    // Le Var select
    const les_users = ref([]);
    // end var
    const store = useLogStore();
    const stor = useUserStore();
    // End call stors
    const filter = ref("");
    const id_psw = ref("");
    const Id_adm = ref(null);
    const psw = ref("");
    const log = ref({});
    const addEditLog = ref(false);
    const addFlag = ref(true);
    const mode = ref("list");
    const columns = ref([
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
        name: "designation",
        align: "left",
        label: "Designation",
        field: "designation",
        sortable: true,
      },
      {
        name: "psw",
        align: "left",
        label: "Mot de passe",
        field: "psw",
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

    function addLog() {
      console.log("addLog");
      addFlag.value = true;
      log.value = {};
      addEditLog.value = true;
    }

    function editLog(val) {
      addFlag.value = false;
      log.value = val;
      console.log(log.value);
      addEditLog.value = true;
    }
    // SELECTS FETCHS
    // select utilisateurs
    stor.fetchUser().then((result) => {
      result.forEach((t) => {
        les_users.value.push({ value: t.Id_adm, label: t.nom_a });
      });
    });
    // ENREGISTRER ET MODIFIER USERS
    async function saveLog() {
      log.value.Id_adm = Id_adm.value.value;
      console.log("saving Log", log.value);
      if (addFlag.value) {
        store.addLog(log.value).then((res) => {
          console.log(res);
        });
      } else {
        store.updateLog(log.value).then((res) => {
          console.log(res);
        });
      }
    }

    async function deleteLog(id_psw) {
      console.log("Deleting Log with id", id_psw);
      store.deleteLog(id_psw).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchLog();
    });

    const data = computed(() => store.logs);

    return {
      les_users,
      id_psw,
      Id_adm,
      psw,
      filter,
      addEditLog,
      addFlag,
      mode,
      log,
      columns,
      data,
      pagination,
      addLog,
      editLog,
      saveLog,
      deleteLog,
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
