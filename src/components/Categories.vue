<template>
  <v-container>
      <span>Categorias Populares</span>
      <v-layout wrap>
          <v-flex md4 v-for="category in categories" :key="category.name">
              <v-hover v-slot:default="{ hover }">
                    <v-card outlined :elevation="hover ? 12 : 2" to="/about">
                        <v-card-title>
                            <v-icon :color="hover ? 'primary': ''">{{ category.icon }}</v-icon>
                        </v-card-title>
                        <v-card-text :color="hover ? 'primary': ''">{{ category.name }}</v-card-text>
                    </v-card>
              </v-hover>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
    name: 'Categories',

    data() {
        return {
        categories: [
            { icon: 'mdi-motorbike', name: 'Motores y Pasolas'}, 
            { icon: 'mdi-engine-outline', name: 'Maquinas'}, 
            { icon: 'mdi-towing', name: 'Equipo pesado'}, 
            { icon: 'mdi-solar-panel-large', name: 'Paneles Solares'}],
    }
    }
}
</script>

<style>

</style>