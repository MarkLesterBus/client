<template>
  <v-container fluid fill-height fill-width>
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
      <v-col cols="8">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step color="orange" :complete="e1 > 1" step="1">
              Employer's Account
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Company's Information
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"> Name of step 3 </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-col cols="8" class="mx-auto">
                <v-card flat class="mx-auto mb-5">
                  <p class="text-h4 mb-8 font-weight-bold">
                    Employer's Account
                  </p>
                  <v-row dense>
                    <v-col>
                      <label for="" class="font-weight-semibold">
                        First name
                        <v-text-field dense outlined></v-text-field>
                      </label>
                    </v-col>
                    <v-col>
                      <label for="" class="font-weight-semibold">
                        Last name
                        <v-text-field dense outlined></v-text-field>
                      </label>
                    </v-col>
                  </v-row>
                  <label for="" class="font-weight-semibold">
                    Mobile number
                    <v-text-field dense outlined></v-text-field>
                  </label>
                  <label for="" class="font-weight-semibold">
                    Email
                    <v-text-field type="email" dense outlined></v-text-field>
                  </label>
                  <label for="" class="font-weight-semibold">
                    Password
                    <v-text-field type="password" dense outlined></v-text-field>
                  </label>
                </v-card>
              </v-col>

              <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

              <v-btn text> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

              <v-btn text> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

              <v-btn text> Cancel </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
export default {
  setup() {
    const e1 = ref(1)
    return { e1 }
  },
}
</script>

<style lang="scss" scoped></style>
