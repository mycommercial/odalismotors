<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-img :aspect-ratio="16/9" src="https://images.wsj.net/im-103414?width=620&size=1.5">
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
            <div class="subheading">Jonathan Lee</div>
            <div class="body-2">
              heyfromjonathan@gmail.com
              <v-icon dark>mdi-menu-down</v-icon>
            </div>
          </v-col>
        </v-row>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark elevate-on-scroll dense :blurry="overlay">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-show="!searchVisible">
        <div class="d-flex align-center">
          <!-- <v-img
                alt="Honda"
                class="shrink mr-2"
                contain
                src="@/assets/logos/honda-logo.png"
                transition="scale-transition"
                width="40"
                v-if="true"
          />-->

          <span class="logo1">{{ logo.O }}</span>
          <span class="logo2">{{ logo.M }}</span>
        </div>
      </v-toolbar-title>

      <v-autocomplete
        v-model="select"
        :loading="loading"
        rounded
        dense
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Buscar Producto Marca Modelo etc..."
        solo-inverted
        :append-icon="searchVisible ? '' : 'mdi-magnify'"
        v-show="!$vuetify.breakpoint.xs"
      ></v-autocomplete>

      <v-spacer></v-spacer>

      <v-btn text icon v-if="$vuetify.breakpoint.xs">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn text icon @click="$store.commit('appbarExtReverse')">
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>

      <v-btn text icon v-if="!$vuetify.breakpoint.xs" @click="popup = true">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn text icon v-if="!$vuetify.breakpoint.xs" @click="overlay = !overlay">
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <template v-slot:extension v-if="$store.state.appbarExt">
        <v-spacer v-if="$vuetify.breakpoint.xs"></v-spacer>

        <v-chip
          v-for="chip in chip_items"
          :key="chip.name"
          @click="$router.push({name: chip.link, params: { Department: 'all', userName: 'pedro' }, query: { plan: 'private' }})"
          class="ma-2"
          color="primary"
        >{{chip.name}}</v-chip>
        <v-spacer v-if="$vuetify.breakpoint.xs"></v-spacer>
      </template>
    </v-app-bar>

    <v-content v-scroll="handleScroll" :blurry="overlay">
      <router-view @overlay="overlay = $event"></router-view>
    </v-content>

    <Footer :blurry="overlay" />

    <v-overlay :value="overlay" z-index="5">
      <v-expand-x-transition mode="out-in">
        <template v-if="loginRegister">
          <v-card
            color="rgb(255, 255, 255, .9)"
            light
            class="elevation-12"
            height="450px"
            width="400px"
            >
            <div class="d-flex justify-space-between">
              <div>
                <span class="logo1">{{ logo.O }}</span>
                <span class="logo2">{{ logo.M }}</span>
              </div>

              <v-btn color="#757575" icon @click="overlay = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

            <div class="d-flex align-center justify-center">
              <span
                style="color: #757575; font-family: 'Arial Black', Gadget, sans-serif; font-size: 27px;"
                class="my-5"
              >LOGIN</span>
            </div>
            <v-divider class="mx-8" />
            <v-card-text>
              <v-form ref="login" v-model="valid" lazy-validation>
                <v-text-field
                  prepend-inner-icon="mdi-account"
                  v-model="username"
                  :counter="50"
                  :rules="nameRules"
                  label="Username"
                  required
                  rounded
                  filled
                  clearable
                  outlined
                  dense
                ></v-text-field>

                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  v-model="password"
                  :rules="nameRules"
                  label="Password"
                  required
                  rounded
                  filled
                  clearable
                  outlined
                  dense
                  type="password"
                ></v-text-field>
                <!-- 
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>

                  <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required
                  ></v-select>

                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                  ></v-checkbox>
                -->
              </v-form>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn :disabled="!valid" color="primary" class="my-2" @click="validate" rounded>Sign in</v-btn>

              <v-btn color="error" class="mr-4" @click="reset, loginRegister = false" outlined rounded>Sign up</v-btn>
              <!--
                  <v-btn
                    color="warning"
                    @click="resetValidation"
                  >
                    Reset Validation
                  </v-btn>
              -->
            </v-card-actions>
            <div class="d-flex justify-center">
              <v-btn text x-small flat>
                Forgot Username / Password?
                <v-icon small>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-card>
        </template>

        <template v-if="!loginRegister">
          <v-card          
            color="rgb(255, 255, 255, .9)"
            light
            class="elevation-12"
            height="450px"
            width="400px"
            >
            <div class="d-flex justify-space-between">
              <div>
                <span class="logo1">{{ logo.O }}</span>
                <span class="logo2">{{ logo.M }}</span>
              </div>

              <v-btn color="#757575" icon @click="overlay = false, loginRegister = true">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

            <div class="d-flex align-center justify-center">
              <span
                style="color: #757575; font-family: 'Arial Black', Gadget, sans-serif; font-size: 27px;"
                class="my-5"
              >REGISTER</span>
            </div>
            <v-divider class="mx-8" />
          </v-card>
        </template>
      </v-expand-x-transition>
    </v-overlay>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
export default {
  name: "App",

  components: {
    Footer
  },

  data: () => ({
    logo: {
      O: "MY",
      M: "COMMERCIAL"
    },
    valid: true,
    username: "",
    password: "",
    nameRules: [
      v => !!v || "Username or E-mail is required",
      v =>
        (v && v.length <= 99) ||
        "Username or E-mail must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    popup: false,
    loginRegister: true,
    overlay: false,
    drawer: false,
    loading: false,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Citas", icon: "mdi-calendar-range" },
      {
        title: "Maestro De Productos",
        icon: "mdi-package-variant",
        to: "maestroproductos"
      },
      { title: "Cerrar sesion", icon: "mdi-logout" }
    ],
    search: null,
    searchVisible: false,
    select: null,
    states: ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas"],
    tab: null,
    tags: [
      "Work",
      "Home Improvement",
      "Vacation",
      "Food",
      "Drawers",
      "Shopping",
      "Art",
      "Tech",
      "Creative Writing"
    ],
    chip_items: [
      { name: "INICIO", link: "home" },
      { name: "PRODUCTOS", link: "productos" },
      { name: "VEHICULOS PESADOS", link: "/about" }
    ],
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }),

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    validate() {
      this.$refs.login.validate();
    },
    reset() {
      this.$refs.login.reset();
    },
    resetValidation() {
      this.$refs.login.resetValidation();
    },

    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },

    handleScroll() {
      if (window.scrollY > 50) {
        this.$store.commit("appbarExtHide");
      } else {
        this.$store.commit("appbarExtShow");
      }
    }
  },
  computed: {
    // logoReactive () {
    //   switch (this.$vuetify.breakpoint.name) {
    //     case 'xs': return { O: 'MY', M: 'COMMERCIAL' };
    //     case 'sm': return { O: 'MY', M: 'COMMERCIAL' };
    //     default: return { O: 'MY', M: 'COMMERCIAL' };
    //   }
    // },
  }
};
</script>

<style lang="sass" scoped>

$font-logo:  "Arial Black", Gadget, sans-serif
$primary-color-logo: #ffffff
$secodary-color-logo: #DC143C

span.logo1
  font-family: $font-logo
  color: $primary-color-logo
  height: 50%
  -webkit-text-stroke-width: 1px
  -webkit-text-stroke-color: #7ea6f8

span.logo2
  font-family: $font-logo
  color: $secodary-color-logo
  -webkit-text-stroke-width: 0.5px
  -webkit-text-stroke-color: #fff


.v-tabs-bar.v-tabs-bar--is-mobile .v-tab 
  margin-left: 0px !important

.lightbox
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2)
  background: rgba(0, 0, 0, 0.4)
  
.pading
  margin-left: 0px !important
    
</style>

<style lang="sass">

$blur-intensity: 8px

[blurry="true"] 
  -webkit-filter: blur($blur-intensity)
  -moz-filter: blur($blur-intensity)
  -o-filter: blur($blur-intensity)
  -ms-filter: blur($blur-intensity)
  filter: blur($blur-intensity)
 
[blurry="false"] 
  -webkit-filter: blur(0px)
  -moz-filter: blur(0px)
  -o-filter: blur(0px)
  -ms-filter: blur(0px)
  filter: blur(0px)

[blurry] 
  -webkit-filter: blur($blur-intensity)
  -moz-filter: blur($blur-intensity)
  -o-filter: blur($blur-intensity)
  -ms-filter: blur($blur-intensity)
  filter: blur($blur-intensity)
</style>