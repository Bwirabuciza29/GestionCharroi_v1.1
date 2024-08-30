<template>
  <div class="container mx-auto -mt-0 p-4">
    <div class="text-2xl font-bold text-center mb-4 p-4 blondy text-white mx-4">
      Gestion Stock |<span class="text-gray-400 text-xl">MAGASIN</span>
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
