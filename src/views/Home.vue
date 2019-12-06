<template>
  <div class="home">
    <OffersCarrusel/>
    <categories/>
  </div>
</template>

<script>
// @ is an alias to /src
import OffersCarrusel from '@/components/Offers-Carrusel.vue'
import Categories from '@/components/Categories.vue'

export default {
  name: 'home',
  components: {
    OffersCarrusel,
    Categories
  }
}
</script>
