<template>
  <q-layout view="hHh lpR lFf">
    <q-header class="blondy text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="black"
          class="bg-grey-3 custom-border"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="q-ml-sm">
          <div v-if="$q.platform.is.desktop"></div>
        </q-toolbar-title>

        <div>
          <q-btn
            class="q-mr-xs q-py-xs q-px-sm"
            flat
            @click="$q.dark.toggle()"
            color="white"
            :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          />
        </div>

        <div class="q-mr-xs">
          <q-btn no-caps flat class="bg-grey-3 custom-border" to="/">
            <q-icon size="xs" style="color: rgb(250, 108, 14)" name="logout" />
            <span class="text-black q-ml-sm">Se déconnecter</span>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :width="270"
      :mini="miniState"
      show-if-above
    >
      <div
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
        class="full-height q-px-sm"
      >
        <q-toolbar class="q-px-md q-py-md">
          <q-toolbar-title class="q-pt-sm text-lg font-semibold"
            >Gestion Stock Magasin</q-toolbar-title
          >
        </q-toolbar>
        <hr />

        <q-list class="rounded-borders text-black">
          <q-item
            to="/Stock"
            exact
            clickable
            v-ripple
            :active="link === 'dashboard'"
            @click="link = 'dashboard'"
            :class="{ 'my-menu-link': link === 'dashboard' }"
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>
          <q-separator spaced />
          <q-item
            to="/Pieces"
            exact
            clickable
            v-ripple
            :active="link === 'piece'"
            @click="link = 'piece'"
            :class="{ 'my-menu-link': link === 'piece' }"
          >
            <q-item-section avatar>
              <q-icon name="shopping_cart_checkout" />
            </q-item-section>
            <q-item-section>Gestion Pièces</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, watch } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const miniState = ref(false);
    const link = ref("dashboard");

    // Surveillez les modifications dans le lien actif et stockez-les dans localStorage
    watch(link, (newValue) => {
      localStorage.setItem("activeLink", newValue);
    });

    // Récupère le lien actif depuis localStorage lors du montage du composant
    link.value = localStorage.getItem("activeLink") || "dashboard";

    return {
      leftDrawerOpen,
      miniState,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      link,
    };
  },
};
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #003973
  background: -webkit-linear-gradient(to right, #E5E5BE, #003973)
  background: linear-gradient(to right, #E5E5BE, #003973)
</style>
