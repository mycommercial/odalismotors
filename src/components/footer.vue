<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        color="white"
        text
        rounded
        class="my-2"
        to="/"
        @click="$vuetify.goTo(1, {
          duration: 300,
          offset: 0,
          easing: 'linear',
        })"
      >
        INICIO
      </v-btn>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.link"
        :href="link.href"
        :target="link.href ? '_blank' : ''"
      >
        {{ link.name }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        <v-btn class="mx-4" dark icon>
          <v-icon size="24px">mdi-facebook-box</v-icon>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <v-icon size="24px">mdi-twitter-box</v-icon>
        </v-btn>
        {{ new Date().getFullYear() }} — <strong>Odalis Motors</strong>
        <v-btn class="mx-4" dark icon>
          <v-icon size="24px">mdi-google-plus</v-icon>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <v-icon size="24px">mdi-instagram</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
    name: 'Footer',

    data: () => ({
      links: [
        {name: 'Sobre Nosotros', link: '/about'},
        {name: 'Developer', href: 'https://github.com/VIXI0'},
        {name: 'Servicios', link: '/about'},
        {name: 'Blog',  link: '/about'},
        {name: 'Contactanos',  link: '/about'},
      ],
    }),
}
</script>

<style>

</style>