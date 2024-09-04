<template>
  <div class="container mx-auto -mt-0 p-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Dashboard Charroi |<span class="text-gray-400 text-xl">NOS STATS</span>
    </div>
    <div class="flex flex-wrap justify-center">
      <!-- Card 1 -->
      <div class="w-full lg:w-1/3 p-4">
        <div class="border border-gray-200 rounded-lg shadow-md flex">
          <q-card
            class="bg-blue-500 flex items-center justify-center p-4 rounded-l-lg border-r border-gray-200"
          >
            <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          </q-card>
          <div class="p-4 flex-1">
            <div class="flex justify-end">
              <div class="relative">
                <button class="text-gray-500 focus:outline-none">
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 12h.01M12 12h.01M18 12h.01"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <h3 class="text-4xl font-bold">{{ lesChauf }}</h3>
            <p class="text-gray-500">Nombre des Chauffeurs</p>
          </div>
        </div>
      </div>
      <!-- Card 2 -->
      <div class="w-full lg:w-1/3 p-4">
        <div class="border border-gray-200 rounded-lg shadow-md flex">
          <q-card
            class="bg-green-500 flex items-center justify-center p-4 rounded-l-lg border-r border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </q-card>
          <div class="p-4 flex-1">
            <div class="flex justify-end">
              <div class="relative">
                <button class="text-gray-500 focus:outline-none">
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 12h.01M12 12h.01M18 12h.01"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <h3 class="text-4xl font-bold">{{ lesVeh }}</h3>
            <p class="text-gray-500">Vehicules à l'Actif</p>
          </div>
        </div>
      </div>
      <!-- Card 3 -->
      <div class="w-full lg:w-1/3 p-4">
        <div class="border border-gray-200 rounded-lg shadow-md flex">
          <q-card
            class="bg-red-500 flex items-center justify-center p-4 rounded-l-lg border-r border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
          </q-card>
          <div class="p-4 flex-1">
            <div class="flex justify-end">
              <div class="relative">
                <button class="text-gray-500 focus:outline-none">
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 12h.01M12 12h.01M18 12h.01"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <h3 class="text-4xl font-bold">{{ lesMec }}</h3>
            <p class="text-gray-500">Mécaniciens Actifs</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MeOn />
</template>

<script>
import { computed, onMounted } from "vue";
import { useAgentStore } from "src/stores/agentStore";
import { useChauStore } from "src/stores/chauStore";
import { useVehiculeStore } from "src/stores/vehiculeStore";
import MeOn from "src/pages/gestionCharroi/MeOn.vue";

export default {
  components: {
    MeOn,
  },
  setup() {
    const store = useAgentStore();
    const stor = useChauStore();
    const stoore = useVehiculeStore();

    onMounted(() => {
      store.fetchMecanicien();
      stor.fetchChauffeur();
      stoore.fetchVehicule();
    });
    const lesChauf = computed(() => stor.optionsLength);
    const lesMec = computed(() => store.optionsLength);
    const lesVeh = computed(() => stoore.optionsLength);
    return {
      lesChauf,
      lesMec,
      lesVeh,
    };
  },
};
</script>

