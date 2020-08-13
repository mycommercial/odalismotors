<template>
  <v-app>
        <v-progress-linear
          indeterminate
          color="yellow darken-2"
          v-if="loading"
        ></v-progress-linear>
      <v-row>
          <v-col cols="6" class="ma-4">
            <h3>Carrito de compra</h3>
            <v-card width="800" height="400" outlined flat class="ma-4" style="overflow: auto;">
              <v-card elevation="0" outlined max-height="250px" class="ma-2" v-for="product in products" :key="product.id_product">
               
                <v-row no-gutters>
                  <v-col cols="12" sm="4">
                    <v-img 
                      :src="product.photos[0]"
                      lazy-src="https://picsum.photos/id/11/10/6"
                      class="grey lighten-2 ma-5"
                      contain
                      height="125px"
                    ></v-img>
                  </v-col>

                  <v-col cols="12" sm="8">
                    <v-row no-gutters class="pl-4">
                      <v-row  no-gutters>
                        <router-link :to="{name: 'viewpro',  params: { _id : product.id_product }}"  class="clear-link"><h3 class="clear-link">{{ product.name }}</h3></router-link>
                        
                      </v-row>
                      <v-col cols="7">
                        <p style="font-family: cursive;">“{{ product.description }}”</p>
                      </v-col>
                      <v-col cols="2">
                        <p style="font-family: Bold;">Cantidad: </p><p style="font-family: cursive;">{{ getamount(product.id_product) }} </p>
                      </v-col>
                      <v-col cols="3">
                        <p style="font-family: Bold;">Total: </p><p style="font-family: cursive;"> <span class="sup" >RD$</span><span class="price">{{ getHalfTotal(product) }}</span></p>
                      </v-col>
                      <v-col cols="12">
                        <span class="sup" >RD$</span> <span class="price">{{ product.price }}</span><span class="sup">{{ product.dot }}</span><span v-if="product.shipping > 0"> + {{product.shipping}} De envio</span><span v-else> + Envio gratis</span>
                      </v-col>
                      
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-card>
          </v-col>
            
          <v-col cols="12" sm="4" class="ma-4 mr-0">
            <h3>Checkout</h3>
              <v-card width="200" height="275" outlined flat class="mt-4">
                
              <v-alert
                dense
                text
                :type="alert.type"
                v-model="alert.if"
              >
                {{ alert.text }}
              </v-alert>
                <v-card-text>
                <p style="font-family: Bold;">Total: </p><p style="font-family: cursive;"> <span class="sup" >RD$</span><span class="price">{{ getFullTotal() }}</span> </p>
                  <v-divider></v-divider>
                  <p style="font-family: Bold;">Cupon: </p><p style="font-family: cursive;"></p>
                  <v-text-field dense append-icon="mdi-ticket" v-model="cupon" outlined rounded></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-center">
                  <v-btn color="blue" dark @click="paycart">CHECKOUT</v-btn>
                </v-card-actions>
                
              </v-card>
          </v-col>


               <v-col v-for="n in 6" cols="12" sm="3" class="pa-0 ma-2" :key="n">
          <v-card outlined height="75" width="350" class="ma-0" href="http://localhost:8080/" to="/">
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
      <iframe allowpaymentrequest allowfullscreen height="450" width="600" :src="frame" style="border:none; object-fit: cover; display: block;"></iframe>
  </v-app>
</template>

<script>
export default {
name: 'Cart',
   data: () => ({
      loading: false,
      frame: '',
      products: [],
      cupon: '',
    alert: {
      if: false,
      type: 'success',
      text: 'text'
    },
    }),
methods: {
      load(){
        this.loading = true;
        const filters = this.$store.state.userInfo.cart;
        console.log(filters);
        this.$apollo.query({
          // Query
          query: require('../graphql/products.gql'),
          variables: {
            
            filters: filters
          }
        }).then((data) => {
            this.products = data.data.products.products;
          this.loading = false;

        }).catch((err) => {
          console.log(err)

        }).finally(() => (this.loading = false));


         
      },

      getamount(id){
       const filter =  this.$store.state.userInfo.cart.filter(prod => prod.value == `${id}`)
       console.log(filter);
       return filter[0].amount;
      },
      
      getHalfTotal(prod){
        const amount = this.getamount(prod.id_product);
        let total = prod.price * amount;
        let dot2 = prod.dot * amount;
        if(dot2 <= 10){
          dot2 = dot2/10;
        }else{
          dot2 = dot2/100;
        }
        total = total + prod.shipping + dot2;
        return total;
      },

      getFullTotal(){
        let ftotal = 0;
        this.products.forEach(element => {
          ftotal = ftotal + this.getHalfTotal(element);
        });
        return ftotal;
      },

      async paycart(){
              // start loading
        this.loading = true;

        // Call to the graphql mutation
        this.$apollo.mutate({
          // Query
          mutation: require('../graphql/PayCart.gql'),
          // Parameters
          variables: {
                    coupon: this.cupon
                  }
        }).then((data) => {

          this.loading = false;
          //this.$router.push(data.data.paycart);
          this.frame = data.data.paycart;
        }).catch((error) => {

          this.loading = false;

          if(error.graphQLErrors[0].extensions.code == 'BAD_USER_INPUT'){
          this.alert = {
            if: true,
            type: 'error',
            text: error.graphQLErrors[0].message
          };
        }else{
          console.log(error);
          this.alert = {
            if: true,
            type: 'error',
            text: "error interno del servidor"
          }; 
          }
        })
      },
      async execPay(){
          this.$apollo.mutate({
          // Query
          mutation: require('../graphql/execPay.gql'),
          variables: {
            PayerID: this.$route.query.PayerID,
            paymentId: this.$route.query.paymentId,
            token: this.$route.query.token
          }
        }).then((data) => {
            this.products = data.data.execPay;
          this.loading = false;

        }).catch((err) => {
          console.log(err)

        }).finally(() => (this.loading = false));
      }
  },
  mounted(){
    if(this.$route.query.paymentId){
      this.execPay();
    }else{
    this.load();
    }
  }
}
</script>

<style>
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