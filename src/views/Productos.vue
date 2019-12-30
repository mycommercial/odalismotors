<template>
  <div>
      <v-navigation-drawer
      v-model="drawer"
      
      clipped
    >
      <v-list dense expand>

        
             
  
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Estado</v-list-item-title>
          </template>
  
          <label><input type="checkbox" id="cbox1" v-model="nuevo"> Nuevo</label><br>
          <label><input type="checkbox" id="cbox1" v-model="usado"> Usado</label><br>
        </v-list-group>

           <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Precio</v-list-item-title>
          </template>
            <div class="enti">RD $<input id="inte" type="number">- RD $<input id="inte" type="number"></div>
        </v-list-group>

           <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Formato 
              de compra</v-list-item-title>
          </template>
          <div class="enti">
            <v-radio-group v-model="radioGroup" dense>
              <v-radio dense label="Todos los resultados" :value="1" ></v-radio>
              <v-radio dense label="Subasta" :value="2" ></v-radio>
              <v-radio dense label="Compralo ahora !!" :value="3" ></v-radio>
            </v-radio-group>
          </div>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-container></v-container>
  </div>
</template>

<script>
export default {
  name: 'productos',
  components: {
  },

    data: () => ({
      drawer: true,
      radioGroup: 1,
      nuevo: false,
      usado: false,
      items: [
        { icon: 'mdi-trending-up', text: 'Most Popular' },
        { icon: 'mdi-subscriptions', text: 'Subscriptions' },
        { icon: 'mdi-history', text: 'History' },
        { icon: 'mdi-featured-play-list', text: 'Playlists' },
        { icon: 'mdi-watch-later', text: 'Watch Later' },
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
    }),
}
</script>

<style lang="scss" scope>
#cbox1 {
 margin-left: 20px;
}

#inte {
  border-style: solid;
  width: 60px;
  height: 25px;
  line-height: 1.65;
  margin-left: 10px;
  border: 1px solid #eee;
}

div.enti {
  padding: 0px;
  margin: 0px;
  margin-left: 15px;
}
</style>