<template>
  <v-app>
    <v-navigation-drawer v-if="$isMobile()" app v-model="drawer">
      <v-img :aspect-ratio="16/9" src="https://images.wsj.net/im-103414?width=620&size=1.5">
        <v-row :align="$store.state.logged ? 'end': 'center'" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <v-avatar color="secondary">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" v-if="$store.state.logged" />
              <v-icon v-if="!$store.state.logged" dark>mdi-account</v-icon>
            </v-avatar>
            <v-row align="center" class="subheading">
            <div v-if="$store.state.logged" class="ml-3 subheading">{{this.$store.state.userInfo.username}}</div>
                      <v-chip
                      x-small
                      color="yellow"
                      text-color="white"
                      v-if="this.$store.state.userInfo.seller"
                      class="ml-1"
                    >
                    <v-icon x-small left>mdi-star</v-icon>
                      vendedor
                    </v-chip>
              </v-row>
            <div v-if="$store.state.logged" class="body-2">
              {{this.$store.state.userInfo.email}}
              <v-icon v-if="$store.state.logged" dark>mdi-menu-down</v-icon>
            </div>
          </v-col>

        </v-row>
      </v-img>
      <div class="d-flex justify-center" v-if="!$store.state.logged">
        <v-btn class="my-5 mx-2" @click="logReg();  drawer =  false" rounded elevation="12" color="primary">INICIAR SESION</v-btn>
      </div>
      
      <v-list dense nav v-if="$store.state.logged">
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to" >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Cerrar sesion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app color="primary" dark elevate-on-scroll dense :blurry="blurry">
      <v-app-bar-nav-icon v-if="$isMobile()" @click.stop="drawer = !drawer" />

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

          <span class="logo1">{{ $store.state.logo.O }}</span>
          <span class="logo2">{{ $store.state.logo.M }}</span>
        </div>
      </v-toolbar-title>

      <SearchBar v-if="!$isMobile()" class="mx-4"/>
      
      <v-spacer></v-spacer>

      <v-btn text icon v-if="$vuetify.breakpoint.xs" @click="searchDialog = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-dialog v-model="searchDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
      <v-toolbar dark color="primary">
          <v-btn icon dark @click="searchDialog = false">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <SearchBar class="mx-4"/>
        </v-toolbar>
        </v-card>
      </v-dialog>
        <v-badge
          :content="this.$store.getters.cartCount"
          :value="this.$store.getters.cartCount"
          color="green"
          overlap
          class="ma-5 mx-1"
        >
        <v-btn icon text v-if="!$store.state.logged" @click="logReg">
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
        <v-btn icon text v-else to="/cart" >
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
     
      <!--
      <v-btn text icon v-if="!$vuetify.breakpoint.xs && $store.state.logged" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      -->
      <v-btn color="#DC143C" v-if="!$vuetify.breakpoint.xs && !$store.state.logged" @click="logReg">
        INICIAR SESION
      </v-btn>
         <div class="text-xs-center">
          <v-menu
            v-if="!$isMobile() && $store.state.logged"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template v-slot:activator="{ on }">
              <v-btn small fab dark color="white" v-on="on" class="elevation-0">

                  <v-avatar size="40">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="alt">
                  </v-avatar>

            </v-btn>
            </template>

            <v-card max-width="350">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{this.$store.state.userInfo.username}}

                      <v-chip
                      x-small
                      color="yellow"
                      text-color="white"
                      v-if="this.$store.state.userInfo.seller"
                    >
                    <v-icon x-small left>mdi-star</v-icon>
                      vendedor
                    </v-chip>

                    </v-list-item-title>
                    <v-list-item-subtitle>{{this.$store.state.userInfo.email}}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      icon
                    >
                      <v-icon>mdi-account-cog</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>
      <v-list dense nav v-if="$store.state.logged">
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to" >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item>
            <v-list-item-action>
                              <v-switch color="purple"></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Modo oscuro</v-list-item-title>
                </v-list-item>
      </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" small text to="/menu_sys">Reportar un problema</v-btn>
                <v-btn color="error" text @click="logout">Cerrar sesión</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
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



    <v-content v-scroll="handleScroll" :blurry="blurry">
    <v-alert class="topAlert ma-0 " type="error" dismissible icon="mdi-account" border="left" dense v-if="!$store.state.userInfo.verified && $store.state.logged">
      Su cuenta no esta verificada. 
      <v-btn x-small outlined dark color="white" @click="logVerify()">Verificar ahora</v-btn>
    </v-alert>
      <router-view @blurry="blurry = $event"></router-view>
    </v-content>

    <Footer :blurry="blurry" />

    <v-overlay :value="$store.state.popup.active" z-index="5">

      <transition name="flip" mode="out-in">
          <component class="popup" v-bind:is="$store.state.popup.component" @blurry="blurry = $event"></component>
      </transition>
    </v-overlay>
    <v-snackbar
      v-model="$store.state.snackbar.value"
      color="success"
      left
      :timeout="$store.state.snackbar.timeout"
      top
    >
    <v-icon>{{ $store.state.snackbar.icon }}</v-icon>
      {{ $store.state.snackbar.text }}
        <v-btn
          dark
          text
          @click="$store.state.snackbar.value = false"
        >
          Cerrar
        </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import Login from "./components/Login.vue";
import Verify from "./components/Verify.vue";
import SearchBar from "./components/SearchBar.vue";
import { onLogout } from "./vue-apollo";
//import Register from "./components/Register.vue";

export default {
  name: "App",

  components: {
    Footer,
    SearchBar,
  },

  data: () => ({
    snackbar: true,
    menu: false,
    searchDialog: false,
    popup: false,
    loginRegister: true,
    blurry: false,
    drawer: false,
    loading: false,
    items: [
      { title: "Area Personal", icon: "mdi-view-dashboard" },
      { title: "Citas", icon: "mdi-calendar-range" },
      {
        title: "Maestro De Productos",
        icon: "mdi-package-variant",
        to: "/maestroproductos"
      }
    ],
    search: null,
    sug: [],
    searchVisible: false,
    select: null,
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
    select(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    logReg() {
      this.blurry = true;
      this.$store.commit('populatePop', { active: true, component: Login});
    },
    logVerify() {
      this.blurry = true;
      this.$store.commit('populatePop', { active: true, component: Verify});
    },
    logout() { onLogout(this.$apolloProvider.defaultClient); },
    querySelections(v) {
        this.loading = true;
        // Simulated ajax query
        setTimeout(() => {
          this.sug = this.states.filter(e => {
            return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
          });
          this.loading = false;
          this.menu = false;
        }, 500);
    },
    autolog(){
        if (!this.$store.state.logged) {
        this.$apollo.query({
            // Query
            query: require('../src/graphql/Status.gql')
          }).then((data) => {
              this.$store.state.userInfo = data.data.status;
              this.$store.state.logged = true;
              this.$router.replace(this.$router.currentRoute);
            this.loading = false;

          }).catch((err) => {
            console.log(`failed autolog ${err}`);
          }).finally(() => (this.loading = false));
        }
    },
    handleScroll() {
      if (window.scrollY > 50) {
        this.$store.commit("appbarExtHide");
      } else {
        this.$store.commit("appbarExtShow");
      }
    },

  },
  mounted(){
    this.autolog();
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


.v-tabs-bar.v-tabs-bar--is-mobile .v-tab 
  margin-left: 0px !important

.lightbox
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2)
  background: rgba(0, 0, 0, 0.4)
  
.pading
  margin-left: 0px !important

.component-fade-enter-active, .component-fade-leave-active 
  transition: opacity .3s ease

.component-fade-enter, .component-fade-leave-to
  opacity: 0


.flip-enter-active 
  transition: all .2s cubic-bezier(0.55, 0.085, 0.68, 0.53) //ease-in-quad


.flip-leave-active 
  transition: all .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) //ease-out-quad


.flip-enter, .flip-leave-to 
  transform: scaleY(0) translateZ(0)
  opacity: 0


</style>

<style lang="sass">
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

::-webkit-scrollbar       
  background-color:#fff
  width:0px

::-webkit-scrollbar-track 
  background-color:#fff

::-webkit-scrollbar-thumb
  background-color: #babac0
  border-radius:16px
  border:4px solid #fff
</style>