<template>
  <v-app>
        <v-progress-linear
      indeterminate
      color="yellow darken-2"
      v-if="loading"
    ></v-progress-linear>
    <div class="offer ma-0 pa-0 pa-1 pl-1" @click="gooffer" >
      <span>Obten un 20% de descuento en todos nuestros productos <v-btn x-small text outlined color="#f0f8ff">click aqui</v-btn> </span>
    </div>
    <v-row no-gutters class="mt-1">
      <v-col class="pictures ml-2" cols="12" sm="4" align="center" justify="center">
        <v-card color="grey lighten-1" height="400" width="600" elevation="10">
            <v-img  color="grey lighten-1" height="400" width="600" :src="product.photos[slidepic]" lazy-src="https://picsum.photos/id/11/10/6">
            </v-img>
       
        </v-card>
            <v-slide-group
              v-model="slidepic"
                class="pa-4"
                center-active
                show-arrows
              >
                  <v-slide-item
                    v-for="n in product.photos"
                    :key="n"
                    v-slot:default="{ active, toggle }"
                  >
                    <v-card
                      :color="active ? 'primary' : 'grey lighten-1'"
                      class="ma-4"
                      height="50"
                      width="100"
                      @click="toggle"
                    >
                    <v-img color="grey lighten-1" height="50" width="100" :src="n" lazy-src="https://picsum.photos/id/11/10/6">
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-scale-transition>
                          <v-icon
                            v-if="active"
                            color="white"
                            size="48"
                            v-text="'mdi-close-circle-outline'"
                          ></v-icon>
                        </v-scale-transition>
                      </v-row>
                      </v-img>
                    </v-card>
                  </v-slide-item>
                </v-slide-group> 
      </v-col>
      
      <v-col class="maindata ml-5" cols="12" sm="4" align="left" justify="left">
        <!--
       <span class="sup" >RD$</span> <span class="price">{{ product.price }}</span><span class="sup">{{ product.pfloat }}</span> 
        -->
        
        <h2 style="color: #004680;">{{ product.name }} </h2>
        <v-spacer/>
                   <v-chip
                      x-small
                      color="yellow"
                      text-color="white"
                      v-if="true"
                    >
                    <v-icon x-small left>mdi-star</v-icon>
                      top seller
                    </v-chip>
                                       <v-chip
                      x-small
                      color="green"
                      text-color="white"
                      v-if="true"
                    >
                    <v-icon x-small left>mdi-truck</v-icon>
                      envio rapido
                    </v-chip>
        <v-divider></v-divider>
          <div class="ma-4">
            <span class="sup" >RD$</span> <span class="price">11300</span><span class="sup">95</span><span> + Envio gratis</span>
            <p style="font-family: cursive;">“{{ product.description }}”</p>
            <v-text-field
              v-model="amount"
              label="Cantidad"
              placeholder="0"
              outlined
              type="number"
            ></v-text-field>
            <v-select
              :items="colores"
              label="Color"
              v-model="color"
            ></v-select>
          </div>
          <v-card color="grey lighten-2" class="ma-4 pt-1" >
            <v-row class="d-flex justify-center">
              <v-btn text color="primary" @click="paynow()">Comprar ahora</v-btn>
              <v-btn dark color="#DC143C" @click="addcart()">Añadir al carrito</v-btn>
            </v-row>
            <v-row class="d-flex justify-center">
              
              <v-btn class="my-2" :color="fav ? '#DC143C' : ''" text x-small @click="favoriteAdd, fav = !fav">
                <v-icon small>{{ fav ? 'mdi-heart' : 'md.,,"l1i-heart-outline' }}</v-icon>
                {{ fav ? 'Eliminar de favoritos' : 'Añadir a favoritos' }}
              </v-btn>
            
            </v-row>
              
    <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col
        cols="4"
        class="flex-grow-0 flex-shrink-0"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          Usuario con experiencia
        </v-card>
      </v-col>
      <v-col
        cols="4"
        style="min-width: 100px; max-width: 100%;"
        class="flex-grow-0 flex-shrink-0"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
         Envío gratuito Local
        </v-card>
      </v-col>
      <v-col
        cols="4"
        style="min-width: 100px;"
        class="flex-grow-0 flex-shrink-0"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          sin Plazo de devolución
        </v-card>
      </v-col>
    </v-row>
          
          </v-card>
      </v-col>
      
      <v-col>
         <v-card outlined  v-if="product.overview" height="75" width="350" class="ml-6 mt-2" href="http://localhost:8080/" to="/">
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
        <v-card v-if="product.overview" color="grey lighten-2" class="mt-3 ml-6"  height="450" width="325">
          <iframe allowfullscreen height="450" width="325" :srcdoc="product.overview" style="border:none; object-fit: cover; display: block;"></iframe>
        </v-card>
        <template v-else>
         <v-card v-for="i in 2" :key="i" outlined  height="75" width="350" class="ml-6 mt-12" href="http://localhost:8080/" to="/">
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
        </template>
      </v-col>
    </v-row>
  </v-app>
</template>


<script>
import Login from "./../components/Login.vue";
import invi from "./../components/Invita2.vue";

export default {
name: 'viewpro',
  components: {
  },
  props: {
      //id product to see
    _id: String,
    //Selected in stock
    selstock: String
  },
    data: () => ({
      slidepic: 1,
      amount: 0,
      colores: ['Verde', 'Blanco', 'Azul', 'Rojo'],
      color: '',
      loading: false,
      fav: false,
      product: {
        name: '',
        description: '',
        photos: [],
        rate: 0,
        publisher: '',
        created_at: '',
        updated_at: '',
        category: '',
        overview: ''
      },
    }),
    methods: {
      gooffer() {
        this.console.log("clicked goofer");
      },
      load(){
        
        this.loading = true;
        
        this.$apollo.query({
          // Query
          query: require('../graphql/product.gql'),
          variables: {
            ID: parseInt(this.$route.params._id)
          }
        }).then((data) => {
          this.product = data.data.product;
        }).catch((err) => {
          console.log(err)

        }).finally(() => (this.loading = false));

        console.log(this.product);
      },
      paynow(){
        if (!this.$store.state.logged) {
          this.$emit('blurry', true);
          this.$store.commit('populatePop', { active: true, component: invi});
          return
        }
      },
      addcart(){
        if (!this.$store.state.logged) {
          this.$emit('blurry', true);
          this.$store.commit('populatePop', { active: true, component: Login});
          return
        }else{
            this.$apollo.query({
            // Query
            query: require('../graphql/Addcart.gql'),
            variables: {
              input: {id: this.$route.params._id, amount: this.amount, color: this.color},
            }
          }).then((data) => {

            this.$store.commit('updateCart', data.data.addcart);

          }).catch((err) => {
            console.log(err)

          });
          
        }
      }
    },
    
     async created() {
      await this.load();
    }

}
</script>

<style lan="scss">
.offer {
  background-color: #a52a2a;
  max-height: 30px;
  height: 30px;
  cursor: pointer;
  color: #f0f8ff;
}

span.price {
  font-weight: bold;
  font-size: 1.5em;
}

span.sup {
  position: relative;
  bottom: 7px;
  font-weight: normal;
  font-size: 10px;
}
</style>