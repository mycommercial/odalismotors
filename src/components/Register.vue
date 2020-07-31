<template>
  <v-card 
  color="rgb(255, 255, 255, .9)" 
  light 
  class="elevation-12" height="600px" 
  width="400px"
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
      >REGISTER</span>
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
              <v-form ref="register" v-model="valid" lazy-validation>

                  <v-text-field
                    prepend-inner-icon="mdi-email"
                    v-model="registry.email"
                    :rules="emailRules"
                    label="E-mail"
                    required   
                    rounded
                    filled
                    clearable
                    outlined
                    dense
                  ></v-text-field>

                <v-text-field
                  prepend-inner-icon="mdi-account"
                  v-model="registry.username"
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
                  v-model="registry.password"
                  :rules="passRule"
                  label="Password"
                  required
                  rounded
                  filled
                  clearable
                  outlined
                  dense
                  :append-icon="viewPass ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="viewPass ? 'password' : 'text'"
                  @click:append="viewPass = !viewPass"
                  
                ></v-text-field>

                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  v-model="registry.Rpassword"
                  :rules="repeateRassRule.concat(passwordConfirmationRule)"
                  label=" Repeat Password"
                  required
                  rounded
                  filled
                  clearable
                  outlined
                  dense
                  type="password"
                ></v-text-field>
<!--
                  <v-select
                    prepend-inner-icon="mdi-map-marker"
                    v-model="registry.select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Ciudad"
                    required
                    rounded
                    filled
                    clearable
                    outlined
                    dense
                  ></v-select>
-->
                  <v-checkbox
                    v-model="registry.checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree privacy bla bla bla?"
                    required
                    rounded
                    filled
                    clearable
                    outlined
                    dense
                  ></v-checkbox>

              </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                      <v-btn :disabled="!valid" color="primary" class="my-2" @click="register()" rounded>Sign up</v-btn>

                      <v-btn color="error" class="mr-4"  outlined rounded @click="log">Sign in</v-btn>
 
                    </v-card-actions>
  </v-card>
</template>

<script>
import Login from "./Login.vue";
import { onLogin } from "./../vue-apollo";

export default {
  name: "Register",
  data: () => ({
        viewPass: true,
        registry: {
          username: '',
          email: '',
          password: '',
          Rpassword: '',
          checkbox: false,
          select: ''
        },
        valid: true,
        loading: false,
        alert: {
          if: false,
          type: 'success',
          text: 'text'
        },
        items: ['La vega', 'Santiago','Santo Domingo'],
        passRule: [
          v => !!v || "This field is required" 
          ],
        nameRules: [
        v => !!v || "Username or E-mail is required",
        v =>
            (v && v.length <= 99) ||
            "Username or E-mail must be less than 99 characters"
        ],
        repeateRassRule: [
          v => !!v || "This field is required"],
          
        emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
  }),

    computed: {
        passwordConfirmationRule() {
            return () => (this.registry.password === this.registry.Rpassword) || 'Password must match'
        },
    },

      methods: {

    register(){
      // start loading
          this.loading = true;
          // We save the user input in case of an error
          const registry = this.registry
          // We clear it early to give the UI a snappy feel
          /*
          this.cred = {
            username: "",
            password: ""
          };*/
          // Call to the graphql mutation
          this.$apollo.mutate({
            // Query
            mutation: require('../graphql/Register.gql'),
            // Parameters
            variables: {
                      input: {
                        email: registry.email,
                        user: registry.username,
                        password: registry.password
                      }
                    }
          }).then((data) => {
            // Result
            //console.log(data);
            onLogin(this.$apolloProvider.defaultClient, data.data.register, false);
            this.loading = false;
            this.alert = {
              if: true,
              type: 'success',
              text: 'Registro correcto'
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
          
        log(){
          this.reset();
          this.$store.commit("changePop", Login);
        },
        
        close() {
            this.$emit("blurry", false);
            this.$store.commit("clearPop");
        },
        validate() {
        this.$refs.register.validate();
        },
        reset() {
        this.$refs.register.reset();
        },
        resetValidation() {
        this.$refs.register.resetValidation();
        }
    },
};
</script>