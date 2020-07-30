<template>
      <v-card
        color="rgb(255, 255, 255, .9)"
        light
        class="elevation-12"
        max-height="550px"
        max-width="400px"
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
          >LOGIN</span>
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
        <v-card-text>
          <v-form ref="login" v-model="valid" lazy-validation>
            <v-text-field
              prepend-inner-icon="mdi-account"
              v-model="cred.username"
              :counter="50"
              :rules="nameRules"
              label="Username"
              required
              rounded
              filled
              clearable
              outlined
              dense
            ></v-text-field>

            <v-text-field
              prepend-inner-icon="mdi-lock"
              v-model="cred.password"
              :rules="nameRules"
              label="Password"
              required
              rounded
              filled
              clearable
              outlined
              dense
              type="password"
            ></v-text-field>
            <!-- 
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>

                  <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required
                  ></v-select>
            -->
            <v-checkbox v-model="keepLogged" label="keep logged" required></v-checkbox>
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <v-btn :disabled="!valid" color="primary" class="my-2" @click="login()" rounded>Sign in</v-btn>

          <v-btn color="error" class="mr-4" @click="reg" outlined rounded>Sign up</v-btn>
          <!--
                  <v-btn
                    color="warning"
                    @click="resetValidation"
                  >
                    Reset Validation
                  </v-btn>
          -->
        </v-card-actions>
        <div class="d-flex justify-center">
          <v-btn text x-small @click="res">
            Forgot Username / Password?
            <v-icon small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-card>
</template>

<script>
import Register from "./Register.vue";
import Restore from "./Restore.vue";
import { onLogin } from "./../vue-apollo";

export default {
  name: "Login",

  data: () => ({
    alert: {
      if: false,
      type: 'success',
      text: 'text'
    },
    loading: false,
    keepLogged: false,
    cred: {
      username: "",
      password: ""
    },
    valid: true,

    nameRules: [
      v => !!v || "Username or E-mail is required",
      v =>
        (v && v.length <= 99) ||
        "Username or E-mail must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    login() {
      // start loading
      this.loading = true;
    // We save the user input in case of an error
    const cred = this.cred
    // We clear it early to give the UI a snappy feel
    /*
    this.cred = {
      username: "",
      password: ""
    };*/
    // Call to the graphql mutation
    this.$apollo.mutate({
      // Query
      mutation: require('../graphql/Login.gql'),
      // Parameters
      variables: {
                input: {
                  user: cred.username,
                  password: cred.password
                },
                options: {
                  keepLogged: this.keepLogged
                }
              }
    }).then((data) => {
      // Result
      //console.log(data);
      onLogin(this.$apolloProvider.defaultClient, data.data.login, this.keepLogged);
      this.loading = false;
      this.alert = {
        if: true,
        type: 'success',
        text: 'credenciales correctas'
      };
      let close = this.close
      setTimeout(function(){ close() }, 3000);

    }).catch((error) => {
      // Error
      // We save the user input in case of an error
      //this.cred = cred;
      //console.error(error)
      // We restore the initial user input
      this.loading = false;

      if(error.graphQLErrors[0].extensions.code == 'BAD_USER_INPUT'){
      this.alert = {
        if: true,
        type: 'error',
        text: error.graphQLErrors[0].message
      };
    }else{
      //console.log(error);
      this.alert = {
        if: true,
        type: 'error',
        text: "error interno del servidor"
      }; 
      }
    })
    },
    reg() {
      this.reset();
      this.$store.commit("changePop", Register);
    },
    res() {
      this.reset();
      this.$store.commit("changePop", Restore);
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