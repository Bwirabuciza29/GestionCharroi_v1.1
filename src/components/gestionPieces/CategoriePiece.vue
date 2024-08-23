<template>
  <q-table
    class="min-w-full border-gray-200 square"
    title="Nos Categories"
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
        @click="addCategory"
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
            @click="editCategory(props.row)"
          />
          <q-btn
            dense
            outline
            size="sm"
            color="red"
            icon="delete"
            @click="deleteCategory(props.row.id)"
          />
        </div>
      </q-td>
    </template>
  </q-table>
  <q-dialog v-model="addEditCategory" :maximized="$q.platform.is.mobile">
    <q-card
      :style="
        $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
      "
    >
      <q-card-section>
        <div class="text-h6 q-px-md">
          {{ addFlag ? "Ajouter Category" : "Editer Category" }}
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
        <q-form class="q-gutter-md" @submit.prevent="saveCategory">
          <q-list>
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
  <!-- <div>{{ loptions }}</div> -->
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useCategoryStore } from "src/stores/categoryStore";

export default defineComponent({
  name: "NosCategory",
  setup() {
    const store = useCategoryStore();
    const filter = ref("");
    const designation = ref("");
    const category = ref({ id: null, designation: "" });
    const addEditCategory = ref(false);
    const addFlag = ref(true);
    const mode = ref("list");
    const columns = ref([
      {
        name: "designation",
        align: "left",
        label: "Categorie Pièce",
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

    function addCategory() {
      category.value = { id: null, designation: "" };
      addFlag.value = true;
      addEditCategory.value = true;
    }

    function editCategory(val) {
      designation.value = val.designation;
      category.value = { id: val.id, designation: designation.value };
      console.log(val);
      console.log(category.value);
      addFlag.value = false;
      addEditCategory.value = true;
    }

    async function saveCategory() {
      console.log("Saving category", designation.value);
      if (addFlag.value) {
        store.addCategory(designation.value).then((res) => {
          console.log(res);
        });
      } else {
        category.value.designation = designation.value;
        store.editCategory(designation.value).then((res) => {
          console.log(res);
        });
        addEditCategory.value = false;
      }
    }

    async function deleteCategory(id) {
      console.log("Deleting Category with id", id);
      store.deleteCategory(id).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchCategory();
    });

    const data = computed(() => store.categorys);
    const loptions = computed(() => store.optionsLength);

    return {
      filter,
      designation,
      addEditCategory,
      addFlag,
      mode,
      columns,
      data,
      pagination,
      addCategory,
      editCategory,
      saveCategory,
      deleteCategory,
      loptions,
    };
  },
});
</script>

<style scoped>
.custom-border {
  border-radius: 5px;
}
</style>
