<template>
    <v-card flat color="grey lighten-5">
        <v-card-title> <span class="title font-italic">Categorias</span> </v-card-title>
         
          <v-container>
            <v-layout wrap>
                <v-scale-transition v-for="(category, i) in categories" :key="i">
                    <v-flex md3 pa-2 v-show="more || i < 4">
                        <v-hover v-slot:default="{ hover }">
                                <v-card min-height="100px" outlined shaped :elevation="hover ? 12 : 2" :to="{name: 'productos', params: { Department: category.name }, query: { q: 'all' }}">
                                    <v-col>
                                        <v-row
                                        class="fill-height"
                                        align="center"
                                        justify="center">
                                            <v-icon large :color="hover ? 'primary': ''">{{ category.icon }}</v-icon>
                                        </v-row>
                                        <v-row
                                        class="fill-height"
                                        align="center"
                                        justify="center">
                                            <span>{{ category.name }}</span>
                                        </v-row>
                                    </v-col>
                                </v-card>
                        </v-hover>
                    </v-flex>
                </v-scale-transition>
            </v-layout>
            <div class="d-flex flex-row-reverse">
                <v-btn color="primary" text @click="more = !more">{{ more ? 'mostrar menos' : 'mostrar mas'}} 
                    <v-icon>{{ more ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
                </v-btn>
            </div>

        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'Categories',

    data() {
        return {
        categories: [
            { icon: 'mdi-motorbike', name: 'Motores y Pasolas'}, 
            { icon: 'mdi-engine-outline', name: 'Maquinas'}, 
            { icon: 'mdi-tractor', name: 'Equipos Agricolas'}, 
            { icon: 'mdi-solar-panel-large', name: 'Energia Renovable'}, 
            { icon: 'mdi-car-sports', name: 'Vehiculos'}, 
            { icon: 'mdi-account-clock', name: 'Usados'}
            ],
        more: false,
        }
    },
}
</script>

<style lang="sass" scoped>
span.title
    color: grey


.fade-enter-active .fade-leave-active 
  transition: opacity .5s

.fade-enter .fade-leave-to 
  opacity: 0

  


</style>