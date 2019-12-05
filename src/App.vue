<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      elevate-on-scroll
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logos/honda-logo.png"
          transition="scale-transition"
          width="40"
        />

        <span class="logo1">ODALIS</span>
        <span class="logo2">MOTORS</span>        
      </div>

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
        ></v-autocomplete>
      <v-spacer></v-spacer>

            <template v-slot:extension>
              <v-tabs
                align-with-title
                background-color="transparent"
              >
                <v-tab>Tab 1</v-tab>
                <v-tab>Tab 2</v-tab>
                <v-tab>Tab 3</v-tab>
              </v-tabs>
            </template>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({

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
    ]
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