<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
            <v-img :src="getOPhoto(slide.photo)" alt="moto" contain max-height="400px" max-width="500px"></v-img>
          <v-col>
            <span :class="`${colors[i]}--text text--lighten-3 font-italic font-weight-light`">OFERTA DE DICIEMBRE</span>
            <div class="display-3">
              <span class="name">{{ slide.name }}</span>
            </div>
            <v-sheet :color="colors[i] + ' darken-4'" width="35%" height="" class="ma-2 pa-1">
              <span class="price">RD$ {{ slide.price }}</span>
            </v-sheet>
          </v-col>
        </v-row>
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
          {name: 'ZUZUKI 200', photo: 'moto1.png', price: 80000},
          {name:'HONDA TODAY', photo: 'moto2.png', price: 38000},
          {name: 'ZUZUKI ADDRESS', photo: 'moto3.png', price: 50000},
        ],
      }
    },

    methods: {
      getOPhoto(photoname) {
        return require('../assets/Ofertas/'+ photoname)
      }
    },

}
</script>

<style lang="sass" scoped>
span.price
  font-family: "Arial Black", Gadget, sans-serif

span.name
  font-family: "Comic Sans MS", cursive, sans-serif
</style>