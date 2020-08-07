<template>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        rounded
        :flat="blur"
        @blur="blur = true"
        @focus="blur = false"
        dense
        solo-inverted
        hide-no-data
        hide-selected
        hide-details
        item-text="Suggest"
        item-value="Suggest"
        label="Buscar Producto Marca Modelo etc..."
        return-object
        append-icon="mdi-magnify"
        @keypress.enter="load(search)"
        @click:append="load(search)"
      >
        <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-icon @click="load(data.item.Suggest)" v-if="data.item.history">
                            <v-icon small>mdi-history</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content @click="load(data.item.Suggest)">
                            <v-list-item-title v-text="data.item.Suggest"></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
              </v-autocomplete>
</template>

<script>
  export default {
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      blur: true,
    }),

    methods: {
      load(Suggest) {
        this.$router.push({name: 'productos', params: { Department: "all" }, query: { q: Suggest }});
        this.entries = [];
      }
    },

    computed: {
      items () {
        return this.entries.map(entry => {
          const Suggest = entry.Suggest.length > this.descriptionLimit
            ? entry.Suggest.slice(0, this.descriptionLimit) + '...'
            : entry.Suggest

          return Object.assign({}, entry, { Suggest })
        })
      },
    },

    watch: {
      search () {
        // Items have already been loaded
        //if (this.items.length > 0) return
        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        // fetch('https://api.publicapis.org/entries')
        //   .then(res => res.json())
        //   .then(res => {
        //     const { count, entries } = res
        //     this.count = count
        //     this.entries = entries
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        //   .finally(() => (this.isLoading = false))

     this.$apollo.query({
        // Query
        query: require('../graphql/searchSuggest.gql'),
        variables: {
          search: this.search,
        }
      }).then((data) => {
          this.entries = data.data.searchSuggest;
        this.isLoading = false;

      }).catch((err) => {
        console.log(err)

      //   if(error.graphQLErrors[0].extensions.code == 'BAD_USER_INPUT'){
      //   this.alert = {
      //     if: true,
      //     type: 'error',
      //     text: error.graphQLErrors[0].message
      //   };
      // }else{
      //   console.log(error);
      //   this.alert = {
      //     if: true,
      //     type: 'error',
      //     text: "error interno del servidor"
      //   }; 
      //   }
      }).finally(() => (this.isLoading = false))
      },
    },
  }
</script>

<style>

</style>