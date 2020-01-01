<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    delimiter-icon="mdi-bomb"
    :show-arrows-on-hover="!$vuetify.breakpoint.xs"
    :hide-delimiters="$vuetify.breakpoint.xs"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
      <v-icon class="tempicon" v-for="n in 25" :key="n" :style="`top: ${40 * n}px ; left: ${100 * n}px ;`" :size="`${random(1,100)}px`" color="rgb(255, 255, 255,0.3)">mdi-snowflake</v-icon>
     
      <div class="prod">
        <span 
            :class="`${colors[i]}--text text--lighten-3 font-italic font-weight-light`"
            v-if="$vuetify.breakpoint.xs">OFERTA DE DICIEMBRE</span> 
        <v-row 
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col align="right" justify="right">
            <v-img :src="getOPhoto(slide.photo)" alt="moto" contain max-height="400px" max-width="500px"></v-img>
          </v-col>
            
          <v-col :align="$vuetify.breakpoint.xs ? 'center' : 'left'" :justify="$vuetify.breakpoint.xs ? 'top' : 'left'">
            <span 
            :class="`${colors[i]}--text text--lighten-3 font-italic font-weight-light`"
            v-if="!$vuetify.breakpoint.xs">OFERTA DE DICIEMBRE</span>
            <div :class="$vuetify.breakpoint.xs ? 'title' : 'display-3'">
              <span class="name">{{ slide.name }}</span>
            </div>
            <v-sheet :color="colors[i] + ' darken-4'" width="35%" height="" elevation="5" class="ma-2 pa-1">
              <span class="price">RD$ {{ slide.price }}</span>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
    name: 'OffersCarrusel',
        data () {
      return {
        colors: [
          'indigo',
          'orange',
          'purple',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          {name: 'ZUZUKI GUAKAKA', photo: 'moto1.png', price: 80000},
          {name:'HONDA TODAY', photo: 'moto2.png', price: 38000},
          {name: 'ZUZUKI ADDRESS', photo: 'moto3.png', price: 50000},
        ],
      }
    },

    methods: {
      getOPhoto(photoname) {
        return require('../assets/Ofertas/'+ photoname)
      },
      random(low, high) {
        return Math.random() * (high - low) + low
      }
    },

}
</script>

<style lang="scss" scoped>
span.price {
  font-family: "Arial Black", Gadget, sans-serif;
  
}
span.name{
  font-family: "Comic Sans MS", cursive, sans-serif;
}
.prod {
  
  margin: 0%;
  padding: 0%;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.tempicon {
  position: absolute;
  
}
</style>