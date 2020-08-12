<template>
  <v-card 
        color="rgb(255, 255, 255, .9)" 
        light 
        class="elevation-12" 
        width="400px"
      >

      <template v-slot:progress>
        <v-progress-linear
          indeterminate
          color="teal"
        ></v-progress-linear>
      </template>

    <div class="d-flex justify-space-between">
      <div>
        <span class="logo1">{{ $store.state.logo.O }}</span>
        <span class="logo2">{{ $store.state.logo.M }}</span>
      </div>

      <v-btn color="#757575" icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

   
      
            <v-card-actions class="d-flex justify-center">

                <v-btn color="primary" class="my-2" @click="invi()" rounded>Invitado</v-btn>

                <v-btn color="error" class="mr-4"  outlined rounded @click="log()">Identificate</v-btn>
 
            </v-card-actions>
  </v-card>
</template>

<script>
import Login from "./Login.vue";

export default {
  name: "Invita2",


      methods: {
        log(){
          this.$store.commit("changePop", Login);
        },
        
        close() {
            this.$emit("blurry", false);
            this.$store.commit("clearPop");
        },

        invi(){
            this.$store.state.invited = true;
            this.close();
        }
    },
};
</script>