<template>
      <v-card
          color="rgb(255, 255, 255, .9)"
          light
          class="elevation-12"
          max-height="550px"
          max-width="700px"
          :loading="loading"
          :disabled="loading"
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

          <div class="d-flex align-center justify-center">
            <span
              style="color: #757575; font-family: 'Arial Black', Gadget, sans-serif; font-size: 27px;"
              class="my-3"
            >VERIFICAR</span>
          </div>
            <v-alert
              dense
              text
              :type="alert.type"
              v-model="alert.if"
              
            >
              {{ alert.text }}
            </v-alert>
          <v-divider class="mx-8" />

        <v-carousel
            :cycle="false"
            hide-delimiter-background
            hide-delimiters
            mandatory
            :continuous="false"
            :show-arrows="false"
            dark
            height="auto"
            v-model="step"
        >
            <v-carousel-item>
              <v-card-text>
                <span style="color: #757575;" class="ma-1 mx-7 d-flex align-center justify-center">
                    Seleccione método de verificación: 
                    </span>
            <v-row no-gutters>
              <v-col cols="12" sm="12">
                <v-card shaped outlined max-width="325px" class="my-1" tile light v-for="method in verificationMethods" :key="method._id" @click="sendVerificationCode(method)">
                    <v-card-text>
                    <v-icon class="mr-1" color="primary">mdi-{{method.type}}</v-icon>
                    <span style="color: #000000;">{{method.secretPath}}</span>
                    </v-card-text>
                </v-card>
              </v-col>
            </v-row>
                </v-card-text>
            </v-carousel-item>

            <v-carousel-item>
                <v-card-text>
                    <v-form ref="login" v-model="valid" lazy-validation>
                    <v-text-field
                        prepend-inner-icon="mdi-account"
                        v-model="code"
                        :counter="6"
                        :rules="codeRules"
                        label="Código"
                        required
                        rounded
                        filled
                        clearable
                        outlined
                        dense
                        light
                    ></v-text-field>
                    </v-form>
                </v-card-text>

          <v-card-actions class="d-flex justify-center">
            <v-btn :disabled="!valid" color="primary" class="my-2" @click="Verify()" rounded>Verificar</v-btn>

            <v-btn color="error" class="mr-4" @click="Cancel" outlined rounded>Cancelar</v-btn>
          </v-card-actions>
          <div class="d-flex justify-center">
            <v-btn light text x-small @click="noResponse()">
              No Recibí Código Reenviar
              <v-icon small>mdi-arrow-right</v-icon>
            </v-btn>
          </div>

            </v-carousel-item>
        </v-carousel>

      </v-card>
</template>

<script>

export default {
  name: "Verify",

  data: () => ({
    viewPass: true,
      verificationMethods: [{
        _id: -2,
        type: '',
        action: '',
        secretPath: '',
    }],
    step: 0,
    alert: {
      if: false,
      type: 'success',
      text: 'text'
    },
    loading: false,
    keepLogged: false,
    code: '',
    valid: false,
    currentMethod: -2,

    codeRules: [
      v => !!v || "Código Requerido",
      v =>
        (v && v.length == 6) ||
        "El Código tiene 6 Caracteres"
    ]
  }),

  mounted() {
      this.loading = true;

     this.$apollo.query({
        // Query
        query: require('../graphql/verificationMethods.gql'),
      }).then((data) => {
          this.verificationMethods = data.data.verificationMethods;
        this.loading = false;

      }).catch((error) => {
        this.loading = false;

        if(error.graphQLErrors[0].extensions.code == 'BAD_USER_INPUT'){
        this.alert = {
          if: true,
          type: 'error',
          text: error.graphQLErrors[0].message
        };
      }else{
        console.log(error);
        this.alert = {
          if: true,
          type: 'error',
          text: "error interno del servidor"
        }; 
        }
      })
  },
  methods: {
    Verify() {
    
      this.loading = true;
      
     this.$apollo.mutate({
        // Query
        mutation: require('../graphql/verifyAccount.gql'),
        variables: {
            input: {
            code: this.code
            }
        }
      }).then((data) => {
        this.$store.state.userInfo.verified = data.data.verifyAccount.verified;
        this.loading = false;
        this.$store.state.snackbar = {
          value: true,
          text: 'Su vuenta ha sido verificada',
          icon: 'mdi-account',
          timeout: 3000
        };
        this.close();
      }).catch((error) => {
        this.loading = false;

        if(error.graphQLErrors[0].extensions.code == 'BAD_USER_INPUT'){
        this.alert = {
          if: true,
          type: 'error',
          text: error.graphQLErrors[0].message
        };
      }else{
        console.log(error);
        this.alert = {
          if: true,
          type: 'error',
          text: "error interno del servidor"
        }; 
        }
      })
    },
    Cancel() {
      this.reset();
      this.close();
    },

    noResponse(){
      console.log('nores');
      this.alert.if = false;
      this.sendVerificationCode(this.verificationMethods[this.currentMethod]);
    },
    //resend verificacion code
    sendVerificationCode(method) {
      this.currentMethod = this.verificationMethods.indexOf(method);
      this.loading = true;
      
     this.$apollo.query({
        // Query
        query: require('../graphql/sendVerificationCode.gql'),
        variables: {
            method: {
                _id: method._id,
                type: method.type,
                action: method.action[0]
            }
        }
      }).then(() => {
        this.alert = {
          if: true,
          type: 'success',
          text: 'Código enviado.'
        };
        this.loading = false;
        this.step = 1
      }).catch((error) => {
        this.loading = false;

        if(error.graphQLErrors[0].extensions.code == 'BAD_USER_INPUT'){
        this.alert = {
          if: true,
          type: 'error',
          text: error.graphQLErrors[0].message
        };
      }else{
        console.log(error);
        this.alert = {
          if: true,
          type: 'error',
          text: "error interno del servidor"
        }; 
        }
      })
    },
    close() {
      this.$emit("blurry", false);
      this.$store.commit("clearPop");
    },
    validate() {
      this.$refs.login.validate();
    },
    reset() {
      this.$refs.login.reset();
    },
    resetValidation() {
      this.$refs.login.resetValidation();
    }
  }
};
</script>

<style>

</style>