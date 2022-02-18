<template>
  <v-container fluid fill-height>
    <v-app-bar dark color="orange" flat fixed app>
      <v-app-bar-title class="text-h5 font-weight-semibold"
        >PESO</v-app-bar-title
      >
      <v-spacer />
      <v-btn text> Post Resume</v-btn>
      <v-btn text> Login</v-btn>
      <v-btn text> Post a Job</v-btn>
    </v-app-bar>
    <v-row>
      <v-card flat class="mx-auto my-12" width="350">
        <p class="text-h4 mb-8 font-weight-bold">Employers Login</p>
        <label for="" class="font-weight-semibold">
          Email
          <v-text-field type="email" dense outlined></v-text-field>
        </label>
        <label for="" class="font-weight-semibold">
          Password
          <v-text-field type="password" dense outlined></v-text-field>
        </label>
        <v-row dense align="center" justify="center">
          <v-checkbox
            class="my-0"
            dense
            hide-details
            label="Keep me logged in"
          />
          <v-spacer />
          <a href="#">Forgot password</a>
        </v-row>
        <v-btn block dark color="orange" class="my-5">
          <v-icon class="mr-3">mdi-key</v-icon>
          Sign In
        </v-btn>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
