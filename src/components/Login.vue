<template>
          <v-card
            color="rgb(255, 255, 255, .9)"
            light
            class="elevation-12"
            height="450px"
            width="400px"
            >
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

                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                  ></v-checkbox>
                -->
              </v-form>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn :disabled="!valid" color="primary" class="my-2" @click="validate" rounded>Sign in</v-btn>

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
              <v-btn text x-small>
                Forgot Username / Password?
                <v-icon small>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-card>
</template>

<script>
import Register from "./Register.vue";
export default {
    name: "Login",

    data: () => ({
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
        ],
    }),
      methods: {
        reg(){
          this.reset();
          this.$store.commit("changePop", Register);
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
      },
}
</script>

<style>

</style>