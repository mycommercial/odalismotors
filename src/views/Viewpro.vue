<template>
  <v-app>
    <div class="offer" @click="gooffer" >
      goofer
    </div>
    <v-row no-gutters>
      <v-col class="pictures" cols="12" sm="6" align="center" justify="center" >
            <v-card color="grey lighten-1" height="400" width="600">

            </v-card>
            <v-slide-group
              v-model="slidepic"
                class="pa-4"
                center-active
                show-arrows
              >
                  <v-slide-item
                    v-for="n in 15"
                    :key="n"
                    v-slot:default="{ active, toggle }"
                  >
                    <v-card
                      :color="active ? 'primary' : 'grey lighten-1'"
                      class="ma-4"
                      height="50"
                      width="100"
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
      </v-col>
      
      <v-col>
      </v-col>
      
      <v-col>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
name: 'viewpro',
  components: {
  },
  props: {
      //id product to see
    _id: String,
    //Selected in stock
    selstock: String
  },
    data: () => ({
      slidepic: null,
    }),
    methods: {
      gooffer: () => {
        console.log("clicked goofer")
      }
    }
}
</script>

<style lan="scss">
.offer {
  background-color: brown;
  max-height: 30px;
  height: 30px;
  cursor: pointer;
}
</style>