<template>
    <v-card flat color="grey lighten-5">
        <v-card-title> <span class="title font-italic">Productos Populares</span> </v-card-title>
         
                <v-slide-group
                    v-model="model"
                    class="pa-4"
                    show-arrows
                    center-active
                >
                    <v-slide-item
                    v-for="n in 15"
                    :key="n"
                    v-slot:default="{ active, toggle }"
                    >
                    <v-card
                        :color="active ? 'primary' : 'grey lighten-1'"
                        class="ma-4"
                        height="200"
                        width="150"
                        @click="toggle"
                    >
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
                    </v-card>
                    </v-slide-item>
                </v-slide-group>

    </v-card>
</template>

<script>
export default {
    name: 'PopularProducts',

    data() {
        return {
        categories: [
            { icon: 'mdi-motorbike', name: 'Motores y Pasolas'}, 
            { icon: 'mdi-engine-outline', name: 'Maquinas'}, 
            { icon: 'mdi-towing', name: 'Equipo pesado'}, 
            { icon: 'mdi-solar-panel-large', name: 'Paneles Solares'}, 
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

</style>