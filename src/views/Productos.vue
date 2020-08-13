<template>
  <v-app>
    <v-progress-linear
      indeterminate
      color="yellow darken-2"
      v-if="loading"
    ></v-progress-linear>
    <v-row no-gutters>
        <v-col cols="12" sm="2">
          <v-list dense expand>

            
                
      
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-title>Estado</v-list-item-title>
              </template>
      
              <label><input type="checkbox" id="cbox1" v-model="nuevo"> Nuevo</label><br>
              <label><input type="checkbox" id="cbox1" v-model="usado"> Usado</label><br>
            </v-list-group>

              <v-list-group>
              <template v-slot:activator>
                <v-list-item-title>Precio</v-list-item-title>
              </template>
                <div class="enti">RD $<input id="inte" type="number">- RD $<input id="inte" type="number"></div>
            </v-list-group>

              <v-list-group>
              <template v-slot:activator>
                <v-list-item-title>Formato 
                  de compra</v-list-item-title>
              </template>
              <div class="enti">
                <v-radio-group v-model="radioGroup" dense>
                  <v-radio dense label="Todos los resultados" :value="1" ></v-radio>
                  <v-radio dense disabled label="Subasta" :value="2" >Coming soon</v-radio>
                  <v-radio dense label="Compralo ahora !!" :value="3" ></v-radio>
                </v-radio-group>
              </div>
            </v-list-group>
          </v-list>

        </v-col>
        <v-col cols="12" sm="7">

          <v-card elevation="0" outlined max-height="250px" class="ma-2" v-for="product in products" :key="product.id_product">
            <span class="overline" v-if="product.promotion"> PATROCINADO </span>
            <span class="overline" v-if="product.new && product.promotion">|</span>
            <span class="overline" v-if="product.new"> ANUCIO NUEVO </span>
            <v-row no-gutters>
              <v-col cols="12" sm="4">
                <v-img 
                  :src="product.photos[0]"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  class="grey lighten-2"
                  contain
                  height="150px"
                ></v-img>
              </v-col>

              <v-col cols="12" sm="8">
                <v-row no-gutters class="pl-4">
                  <v-row  no-gutters>
                    <router-link :to="{name: 'viewpro',  params: { _id : product.id_product }}"  class="clear-link"><h3 class="clear-link">{{ product.name }}</h3></router-link>
                    <v-spacer></v-spacer>
                     <v-chip
                      x-small
                      color="yellow"
                      text-color="white"
                      v-if="product.experience"
                      class="mx-1"
                    >
                    <v-icon x-small left>mdi-star</v-icon>
                      top seller
                    </v-chip>
                   <v-chip
                      x-small
                      color="green"
                      text-color="white"
                      v-if="product.local"
                      class="mx-1"
                    >
                    <v-icon  x-small left>mdi-truck</v-icon>
                      envio rapido
                    </v-chip>
                  </v-row>
                  <v-col cols="12">
                    <p style="font-family: cursive;">“{{ product.description }}”</p>
                  </v-col>
                  <v-col cols="12">
                    <span class="sup" >RD$</span> <span class="price">{{ product.price }}</span><span class="sup">{{ product.dot }}</span><span v-if="product.shipping > 0"> + {{product.shipping}} De envio</span><span v-else> + Envio gratis</span>
                  </v-col>
                  
                </v-row>
                <v-col cols="12" class="d-flex  justify-end">
                    <v-btn class="my-2" :color="product.favorite ? '#DC143C' : 'blue'" text x-small @click="product.favorite = !product.favorite, favorite(product.id_product, product.favorite)">
                <v-icon small>{{ product.favorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                {{ product.favorite ? 'Eliminar de favoritos' : 'Añadir a favoritos' }}
              </v-btn>
              </v-col>
              </v-col>
            </v-row>
          </v-card>

         <v-pagination
           v-model="pageinf.currentpage"
           :length="pageinf.results"
           :total-visible="10"
           circle
           @next="load('NEXT')"
           @previous="load('PREV')"
           @input="load('PAGE', true)"
              ></v-pagination>

        </v-col>
        <v-col cols="12" sm="3">
         <v-card v-for="i in 3" :key="i" outlined  height="175" width="350" class="ml-6 pr-6 mt-12 mb-12 d-flex justify-center" href="http://localhost:8080/" to="/">
                <v-list-item>
                  <v-card elevation="2" class="mr-3">
                    <v-img lazy-src="https://picsum.photos/id/11/10/6" src="./../assets/Ofertas/myc.png" height="50" width="50" contain aspect-ratio="1">
                    </v-img>
                  </v-card>
                  
                  <v-list-item-content>
                    <v-list-item-title class="overline">TU ANUCIO PERFECTO</v-list-item-title>
                    <v-list-item-subtitle>Ads by 
                      <span class="logo1">{{ $store.state.logo.O }}</span>
                      <span class="logo2">{{ $store.state.logo.M }}</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-icon>mdi-open-in-new</v-icon>
                </v-list-item>
          </v-card>
        </v-col>
    </v-row>
  </v-app>
</template>

<script>
//import productos from './../simulated/products.json'
import Login from "./../components/Login.vue";

export default {
  name: 'productos',
  components: {
  },
  props: {
    Department: String,
    search: String
  },
    data: () => ({
      chunkFav: false,
      pageinf:{
      cursor: 0,
      currentpage: 0,
      results: 0,
      searching: null
      },
      drawer: true,
      loading: false,
      radioGroup: 1,
      page: 1,
      products: [],
      nuevo: false,
      usado: false,
      pagination: { limit: 10, cursor: 0, page: 1, type: null},
      items: [
        { icon: 'mdi-trending-up', text: 'Most Popular' },
        { icon: 'mdi-subscriptions', text: 'Subscriptions' },
        { icon: 'mdi-history', text: 'History' },
        { icon: 'mdi-featured-play-list', text: 'Playlists' },
        { icon: 'mdi-watch-later', text: 'Watch Later' },
      ],
    }),
    methods: {
      load(ACTION, PAGE){
        this.loading = true;
        
        const search = this.$route.query.q ? this.$route.query.q : this.searching;
        const category = this.$route.params.category;
        const filters = this.$route.params.filters;
        const pagination = this.$route.params.pagination ? this.$route.params.pagination : this.pagination;
        

        if (ACTION) {
          pagination.type = ACTION;
        }
       if (ACTION == 'NEXT' || ACTION == 'PREV') {
          pagination.cursor = this.pageinf.cursor;
       }

        if (PAGE) {
          pagination.page = this.pageinf.currentpage;
           pagination.cursor = -1;
        }
        console.log(pagination)
        console.log(search)
        this.$apollo.query({
          // Query
          query: require('../graphql/products.gql'),
          variables: {
            search: search,
            category: category,
            filters: filters,
            pagination: pagination
          }
        }).then((data) => {
            this.products = data.data.products.products;
            this.pageinf = data.data.products.pageinf;
          this.loading = false;

        }).catch((err) => {
          console.log(err)

        }).finally(() => (this.loading = false));

        console.log(this.products);
        console.log( this.pageinf);
         
      },
      async favorite(ID, ADD) {
         this.chunkFav = ADD;

        if (!this.$store.state.logged) {
          this.$emit('blurry', true);
          this.$store.commit('populatePop', { active: true, component: Login});
          return !this.chunkFav;
        }

        await this.$apollo.mutate({
            // Query
            mutation: require('../graphql/favoriteChange.gql'),
            // Parameters
            variables: {
                    ID: ID,
                    action: ADD
                    }
          }).then((data) => {
            this.chunkFav = data.data.favoriteChange;
          }).catch((error) => { console.error(error)});
        
        return ADD;
      },
    },
    watch: {
      $route(to) {
        if (to.name == 'productos' && to.query.q != this.searching) {
          this.searching = to.query.q;
          this.load();
        }
      }

    },
     mounted() {
      this.load();
    }

}
</script>

<style lang="scss" scope>
#cbox1 {
 margin-left: 20px;
}

#inte {
  border-style: solid;
  width: 60px;
  height: 25px;
  line-height: 1.65;
  margin-left: 10px;
  border: 1px solid #eee;
}

div.enti {
  padding: 0px;
  margin: 0px;
  margin-left: 15px;
}

a.clear-link {
  text-decoration: none;
}

h3.clear-link:hover {
  color: #DC143C;
}

span.price {
  font-weight: bold;
}

span.sup {
  position: relative;
  bottom: 5px;
  font-weight: normal;
  font-size: 10px;
}

</style>