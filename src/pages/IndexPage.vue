<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Se connecter</div>
            <div class="text-grey-8">Accéder à votre compte</div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-md">
              <q-form @submit="authentification">
                <div class="q-gutter-sm">
                  <q-input
                    filled
                    dense
                    label="Email *"
                    v-model="login"
                    :rules="[(val) => !!val || 'Champ requis']"
                    type="email"
                  />
                  <q-input
                    filled
                    dense
                    label="Password *"
                    :rules="[(val) => !!val || 'Champ requis']"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="showPassword ? 'visibility_off' : 'visibility'"
                        @click="toggleShowPassword"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="!mt-1">
                  <q-btn
                    type="submit"
                    style="border-radius: 8px"
                    color="dark"
                    rounded
                    size="md"
                    no-caps
                    class="full-width"
                    :disable="!login || !password"
                  >
                    Se connecter
                  </q-btn>
                </div>
              </q-form>
            </div>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Vous n'avez pas encore de compte?
              <a
                href="mailto:achilleblondy@gmail.com"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Contactez l'administrateur.</a
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineComponent, onMounted, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useStore } from "src/stores/store";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar();
    const login = ref("");
    const password = ref("");
    const showPassword = ref(false);
    let timer;

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    const authentification = () => {
      $q.loading.show({
        message:
          'Authentification en cours.<br/><span class="text-amber text-italic">Veuillez patienter...</span>',
        html: true,
      });

      timer = setTimeout(() => {
        const xlogins = {
          login: login.value,
          psw: password.value,
        };
        store.authen(xlogins.login, xlogins.psw);
        $q.loading.hide();
        timer = void 0;
      }, 2000);
    };

    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      router,
      store,
      $q,
      login,
      password,
      timer,
      authentification,
      showPassword,
      toggleShowPassword,
    };
  },
});
</script>

<style lang="sass">
.my_card
  width: 25rem
  border-radius: 8px
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
</style>
