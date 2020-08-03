<template>
      <v-card
          color="rgb(255, 255, 255, .9)"
          light
          class="elevation-12"
          max-height="550px"
          max-width="600px"
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
              class="my-5"
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
            :show-arrows="true"
            dark
            height="auto"
            v-model="step"
            class="mb-5 mx-3"
        >
            <v-carousel-item>
                <span style="color: #757575;" class="ma-1 mx-7 d-flex align-center justify-center">
                    selecciona el metodo de verificacion: 
                    </span>
            <v-row no-gutters>
              <v-col cols="12" sm="12">
                <v-card max-width="325px" class="my-1" tile light v-for="method in verificationMethods" :key="method._id" @click="sendVerificationCode(method)">
                    <v-card-title>
                    <v-icon color="primary">mdi-{{method.type}}</v-icon>
                    {{method.secretPath}}
                    </v-card-title>
                </v-card>
              </v-col>
            </v-row>
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
            <v-btn light text x-small @click="noResponse">
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
    valid: true,

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

    noResponse(){},
    //resend verificacion code
    sendVerificationCode(method) {
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