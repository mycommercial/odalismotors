<template>
  <v-card color="rgb(255, 255, 255, .9)" light class="elevation-12" height="200px" width="400px">
    <div class="d-flex justify-space-between">
      <div>
        <span class="logo1">{{ $store.state.logo.O }}</span>
        <span class="logo2">{{ $store.state.logo.M }}</span>
      </div>

      <v-btn color="#757575" icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

<v-divider class="mx-8" />
    <div class="d-flex align-center justify-center">
      <span
        style="color: #757575; font-family: 'Arial Black', Gadget, sans-serif; font-size: 27px;"
        class="my-5"
      >{{ cupon }}</span>
    </div>
    <v-divider class="mx-8" />
    <v-card-actions class="d-flex justify-center">
        <v-btn color="blue" dark @click="copiar()">Copiar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Restore",
  data: () => ({
    cupon: 'MiguelR'
    }),

      methods: {
        close() {
            this.$emit("blurry", false);
            this.$store.commit("clearPop");
        },
        async copiar(){
               await navigator.clipboard.writeText(this.cupon).catch((err) =>{console.log(err);});
              
                this.$store.state.snackbar = {
                    value: true,
                    text: `Cupon Copiado`,
                    icon: 'mdi-ticket',
                    timeout: 3000
                
              }
              
        }
      },
};
</script>