<template>
  <div class="container mx-auto -mt-0 p-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Gestion Stock |<span class="text-gray-400 text-xl">MAGASIN</span>
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
            <!-- <h3 class="text-4xl font-bold">{{ lesInsc }}</h3> -->
            <p class="text-gray-500">Denière Entree</p>
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
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

            <p class="text-gray-500">Denière Sortie</p>
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
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
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

            <p class="text-gray-500">Denier Sock</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="-mt-4">
    <MyPiece />
  </div>
</template>
<script>
import MyPiece from "components/gestionPieces/MyPiece.vue";

import { defineComponent } from "vue";

export default defineComponent({
  watch: {},
  components: { MyPiece },
});
</script>
