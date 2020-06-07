<template>
  <v-card color="rgb(255, 255, 255, .9)" light class="elevation-12" height="450px" width="400px">
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
    <v-divider class="mx-8" />
  </v-card>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
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
          /*
        reg(){
          this.reset();
          this.$store.commit("changePop", Register);
        },
        */
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
};
</script>