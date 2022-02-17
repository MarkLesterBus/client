<template>
  <v-container fluid>
    <custom-appbar title="Companies" :prominent="true"> </custom-appbar>
    <v-card flat>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-domain</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-h5"
            v-html="company.name"
          ></v-list-item-title>
          <v-list-item-subtitle v-html="company.website"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon><v-icon>mdi-square-edit-outline</v-icon></v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <v-card flat class="mt-3">
      <v-tabs v-model="tab">
        <v-tab>Description</v-tab>
        <v-tab>Jobs</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat width="700">
            <div v-html="company.description" class="body-1 my-5"></div>
            <div class="text-h6 font-weight-bold mt-8">Website</div>

            <v-divider> </v-divider>
            <a :href="company.website" class="body-1 mt-5">{{
              company.website
            }}</a>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="2">
                  <v-list dense>
                    <v-list-item v-for="item in levels" :key="item.id">
                      <v-list-item-content>
                        <v-list-item-title>{{ item.level }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="10">
                  <v-data-table :headers="headers" :search="search">
                    <template v-slot:item.actions="{ item }">
                      <v-col col="2">
                        <v-row>
                          <v-icon
                            size="20"
                            color="#49BF88"
                            @click="viewItem(item.id)"
                          >
                            mdi-eye
                          </v-icon>
                          <v-icon
                            size="20"
                            color="#49BF88"
                            @click="editItem(item.id)"
                          >
                            mdi-pencil
                          </v-icon>
                          <v-icon
                            size="20"
                            color="#49BF88"
                            @click="deleteItem(item.id)"
                          >
                            mdi-delete
                          </v-icon>
                        </v-row>
                      </v-col>
                    </template>
                    <template v-slot:no-data>
                      <v-btn color="primary"> Reset </v-btn>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <custom-alert></custom-alert>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, url } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import CustomAlert from '../../../components/custom-alert.vue'
import companyUpdate from '../../../components/forms/company-update.vue'
import jobCreate from '../../../components/forms/job-create.vue'
export default {
  layout: 'dashboard',
  middleware: ['admin', 'user'],
  data() {
    return {
      dialog: false,
      tab: '',
      logo: {
        url: '',
        file: null,
      },
      datepicker: false,
      search: '',
      headers: [
        { text: 'Position', value: 'position' },
        { text: 'Company', value: 'company' },
        { text: 'Location', value: 'location' },
        { text: 'Date', value: 'date' },
      ],
      items: [],
    }
  },
  mixins: [validationMixin],

  validations: {
    name: { required },
    description: { required },
    website: { required, url },
  },

  created() {
    this.$store.dispatch('companies/fetchCompany', this.$route.params.company)
    this.$store.dispatch('levels/fetchLevels')
  },
  computed: {
    ...mapState({
      company: (state) => state.companies.company,
      levels: (state) => state.levels.levels,
    }),
    name: {
      get() {
        return this.company.name
      },
      set(value) {
        this.$store.commit('companies/SET_NAME', value)
      },
    },
    description: {
      get() {
        return this.company.description
      },
      set(value) {
        this.$store.commit('companies/SET_DESCRIPTION', value)
      },
    },

    website: {
      get() {
        return this.company.website
      },
      set(value) {
        this.$store.commit('companies/SET_WEBSITE', value)
      },
    },
    company_logo: {
      get() {
        return this.company.logo
      },
    },
  },
  components: {
    CustomAlert,
    companyUpdate,
    jobCreate,
  },

  methods: {
    validate(rules, v) {
      const errors = []
      switch (rules) {
        case 'required':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          return errors
        case 'required, url':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          !v.email && errors.push('Must be a valid url.')
          return errors

        default:
          break
      }
    },

    system_alert(status, color, message) {
      this.$store.dispatch(
        'alerts/createAlert',
        {
          color: color,
          message: message,
          status: status,
          timeout: 5000,
          visible: true,
        },
        { root: true }
      )
    },
    update() {
      this.$store
        .dispatch('companies/updateCompany', {
          id: this.$route.params.company,
          data: {
            name: this.name,
            description: this.description,
            website: this.website,
          },
        })
        .then((rs) => {
          this.system_alert(
            'Success',
            'success',
            'Company ' + rs.data.name + ' details successfuly updated.'
          )
        })
    },

    upload() {
      this.$store.dispatch('companies/upload', {
        id: this.$route.params.company,
        logo: this.logo.file,
      })
    },

    selectedFile() {
      this.logo.url = this.logo.file
        ? URL.createObjectURL(this.logo.file)
        : 'https://via.placeholder.com/150?text=512x512'
    },
  },
}
</script>

<style></style>
