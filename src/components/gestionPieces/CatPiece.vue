<template>
  <q-table
    class="min-w-full border-gray-200 square"
    title="Toutes Les Options"
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
        @click="addOption"
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
            @click="editOption(props.row)"
          />
          <q-btn
            dense
            outline
            size="sm"
            color="red"
            icon="delete"
            @click="deleteOption(props.row.id)"
          />
        </div>
      </q-td>
    </template>
  </q-table>
  <q-dialog v-model="addEditOption" :maximized="$q.platform.is.mobile">
    <q-card
      :style="
        $q.platform.is.desktop ? { width: '500px', 'max-width': '50vw' } : {}
      "
    >
      <q-card-section>
        <div class="text-h6 q-px-md">
          {{ addFlag ? "Ajouter Option" : "Editer Option" }}
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
        <q-form class="q-gutter-md" @submit.prevent="saveOption">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Designation Option</q-item-label>
                <q-input dense outlined v-model="desOption" />
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
import { useOptionsStore } from "src/stores/optionStore";

export default defineComponent({
  name: "NosOptions",
  setup() {
    const store = useOptionsStore();
    const filter = ref("");
    const desOption = ref("");
    const option = ref({ id: null, desOption: "" });
    const addEditOption = ref(false);
    const addFlag = ref(true);
    const mode = ref("list");
    const columns = ref([
      {
        name: "desOption",
        align: "left",
        label: "Designation Option",
        field: "desOption",
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

    function addOption() {
      option.value = { id: null, desOption: "" };
      addFlag.value = true;
      addEditOption.value = true;
    }

    function editOption(val) {
      desOption.value = val.desOption;
      option.value = { id: val.id, desOption: desOption.value };
      console.log(val);
      console.log(option.value);
      addFlag.value = false;
      addEditOption.value = true;
    }

    async function saveOption() {
      console.log("Saving option", desOption.value);
      if (addFlag.value) {
        store.addOption(desOption.value).then((res) => {
          console.log(res);
        });
      } else {
        option.value.desOption = desOption.value;
        store.updateOption(option.value).then((res) => {
          console.log(res);
        });
        addEditOption.value = false;
      }
    }

    async function deleteOption(id) {
      console.log("Deleting option with id", id);
      store.deleteOption(id).then((res) => {
        console.log(res);
      });
    }

    onMounted(() => {
      store.fetchOptions();
    });

    const data = computed(() => store.options);
    const loptions = computed(() => store.optionsLength);

    return {
      filter,
      desOption,
      addEditOption,
      addFlag,
      mode,
      columns,
      data,
      pagination,
      addOption,
      editOption,
      saveOption,
      deleteOption,
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
