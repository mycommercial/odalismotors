<template>
  <div class="home">
    <OffersCarrusel/>
    <categories/>
    <PopularProducts/>
  </div>
</template>

<script>
// @ is an alias to /src
import OffersCarrusel from '@/components/Offers-Carrusel.vue'
import Categories from '@/components/Categories.vue'
import PopularProducts from '@/components/PopularProducts.vue'

export default {
  name: 'home',
  components: {
    OffersCarrusel,
    Categories,
    PopularProducts
  }
}
</script>
