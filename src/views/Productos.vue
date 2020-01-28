<template>
  <v-app>

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

          <v-card elevation="1" height="150px" class="ma-2" v-for="product in products" :key="product">
            <v-row no-gutters>
              <v-col cols="12" sm="4">
                <v-img 
                  :src="product.img"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  class="grey lighten-2"
                  contain
                  height="150px"

                ></v-img>
              </v-col>

              <v-col cols="12" sm="8">
                <v-row no-gutters class="pl-4">
                  <v-col cols="12">
                    <router-link :to="{name: 'viewpro',  params: { _id : product._id }}"  class="clear-link"><h3 class="clear-link">{{ product.name }}</h3></router-link>
                  </v-col>

                  <v-col cols="3">
                    <span class="sup" >RD$</span> <span class="price">{{product.price}}</span><span class="sup">{{ product.pfloat }}</span> 
                  </v-col>
                  
                </v-row>
              </v-col>
            </v-row>
          </v-card>

         <v-pagination
           v-model="page"
           :length="750"
           :total-visible="10"
           circle
              ></v-pagination>

        </v-col>
        <v-col cols="12" sm="3">
          col 4
        </v-col>
    </v-row>
  </v-app>
</template>

<script>
import productos from './../simulated/products.json'

export default {
  name: 'productos',
  components: {
  },
  props: {
    Department: String,
    userName: String
  },
    data: () => ({
      drawer: true,
      radioGroup: 1,
      page: 1,
      products: [],
      nuevo: false,
      usado: false,
      items: [
        { icon: 'mdi-trending-up', text: 'Most Popular' },
        { icon: 'mdi-subscriptions', text: 'Subscriptions' },
        { icon: 'mdi-history', text: 'History' },
        { icon: 'mdi-featured-play-list', text: 'Playlists' },
        { icon: 'mdi-watch-later', text: 'Watch Later' },
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
    }),

     created() {
       this.products = productos.product;
       
       if (process.env.NODE_ENV != 'production') {
         console.log(this.userId, this.userName)
       }


      
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