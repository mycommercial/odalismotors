<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      elevate-on-scroll
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
       <div class="d-flex align-center">
          <v-img
            alt="Honda"
            class="shrink mr-2"
            contain
            src="@/assets/logos/honda-logo.png"
            transition="scale-transition"
            width="40"
            v-if="true"
          />

          <span class="logo1">{{ logo.O }}</span>
          <span class="logo2">{{ logo.M }}</span>        
        </div>        
      </v-toolbar-title>

        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Buscar Producto, Marca, Modelo, etc..."
          solo-inverted
          append-icon="mdi-magnify"
          v-if="$vuetify.breakpoint.name != 'xs'"
        ></v-autocomplete>


      <v-spacer></v-spacer>

        <v-btn text icon v-if="$vuetify.breakpoint.name == 'xs'">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn text icon>
          <v-icon>mdi-cellphone-arrow-down</v-icon>
        </v-btn>

        <v-btn text icon>
          <v-icon>mdi-calendar-range</v-icon>
        </v-btn>        
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
          background-color="transparent"
        >
          <v-tabs-slider color="#cc0000"></v-tabs-slider>

          <v-tab v-for="item in tab_items" :key="item.name" :to="item.to">
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    
    <v-content>
      <router-view></router-view>                 
    </v-content>  
    
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',

  components: {
    Footer,
  },

  data: () => ({
    logo: {
      O: 'ODALIS',
      M: 'MOTORS'
    },
    loading: false,
    items: [],
    search: null,
    select: null,
    states: [
          'Alabama',
          'Alaska',
          'American Samoa',
          'Arizona',
          'Arkansas'
    ],
    tab: null,
    tab_items: [
        {name:'INICIO', to: '/'}, {name:'PRODUCTOS', to: '/about'}, {name:'V. PESADOS', to: '/about'},
        ],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      
  }),

  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
      },
    },
  methods: {
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
  },
    computed: {
      logo () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return { O: 'O', M: 'M' };
          case 'sm': return { O: 'O', M: 'M' }; 
          default: return { O: 'ODALIS', M: 'MOTORS' };
        }
      },
    },
};
</script>

<style lang="sass" scoped>
$font-logo:  "Arial Black", Gadget, sans-serif
$primary-color-logo: #ffffff
$secodary-color-logo: #cc0000

span.logo1
   font-family: $font-logo
   color: $primary-color-logo
   height: 50%

span.logo2
   font-family: $font-logo
   color: $secodary-color-logo

</style>