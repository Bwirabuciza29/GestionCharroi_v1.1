<template>
  <q-table
    class="min-w-full border-gray-200 square"
    title="Toutes Les Catégories de nos Utilisateurs"
    :rows="data"
    :hide-header="mode === 'grid'"
    :columns="columns"
    row-key="Id_cat"
    :grid="mode == 'grid'"
    :filter="filter"
    v-model:pagination="pagination"
  >
    <template v-slot:top-right="props">
      <q-btn
        @click="addCat"
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
            @click="editCat(props.row)"
          />
          <q-btn
            dense
            outline
            size="sm"
            color="red"
            icon="delete"
            @click="deleteCat(props.row.Id_cat)"
          />
        </div>
      </q-td>
    </template>
  </q-table>
  <q-dialog v-model="addEditCat" :maximized="$q.platform.is.mobile">
    <q-card
      :style="
        $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
      "
    >
      <q-card-section>
        <div class="text-h6 q-px-md">
          {{ addFlag ? "Ajouter Catégorie" : "Editer Catégorie" }}
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
        <q-form class="q-gutter-md" @submit.prevent="saveCat">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Id</q-item-label>
                <q-input dense outlined v-model="Id_cat" disable />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Designation Option</q-item-label>
                <q-input dense outlined v-model="designation" />
              </q-item-section>
            </q-item>
          </q-list>
          <div class="q-px-md q-pt-sm">
            <q-btn
              class="full-width"
              label="Enregistrer"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useCatStore } from "src/stores/catStore";

export default defineComponent({
  name: "NosCat",
  setup() {
    const store = useCatStore();
    const filter = ref("");
    const Id_cat = ref("");
    const designation = ref("");
    const option = ref({ Id_cat: null, designation: "" });
    const addEditCat = ref(false);
    const addFlag = ref(true);
    const mode = ref("list");
    const columns = ref([
      {
        name: "designation",
        align: "left",
        label: "Designation Catégorie",
        field: "designation",
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

    function addCat() {
      option.value = { Id_cat: null, designation: "" };
      addFlag.value = true;
      addEditCat.value = true;
    }

    function editCat(val) {
      Id_cat.value = val.Id_cat;
      designation.value = val.designation;
      option.value = { Id_cat: val.Id_cat, designation: val.designation };
      addFlag.value = false;
      addEditCat.value = true;
    }

    async function saveCat() {
      console.log("Saving catégories", designation.value);
      if (addFlag.value) {
        store.addCat(designation.value).then((res) => {
          console.log(res);
        });
      } else {
        option.value.designation = designation.value;
        store.updateCat(option.value).then((res) => {
          console.log(res);
        });
        addEditCat.value = false;
      }
    }

    async function deleteCat(Id_cat) {
      console.log("Deleting Catégories with id", Id_cat);
      store.deleteCat(Id_cat).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchCat();
    });

    const data = computed(() => store.cats);

    return {
      Id_cat,
      filter,
      designation,
      addEditCat,
      addFlag,
      mode,
      columns,
      data,
      pagination,
      addCat,
      editCat,
      saveCat,
      deleteCat,
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
