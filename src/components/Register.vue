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
            <v-card-text>
              <v-form ref="login" v-model="valid" lazy-validation>

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
  </v-card>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
        registry: {
          username: '',
          email: '',
          password: '',
          checkbox: false,
          select: ''
        },
        items: ['La vega', 'Santiago','Santo Domingo'],
        nameRules: [
        v => !!v || "Username or E-mail is required",
        v =>
            (v && v.length <= 99) ||
            "Username or E-mail must be less than 99 characters"
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