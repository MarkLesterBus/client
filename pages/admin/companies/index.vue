<template>
  <v-container>
    <custom-appbar title="Companies" :prominent="false"> </custom-appbar>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="companies"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-col cols="12" md="12" sm="12">
            <v-row align="center">
              <company-create></company-create>

              <v-divider vertical class="mx-3"></v-divider>
              <v-toolbar-title>Manage Companies</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                class="ms-3"
                v-model="search"
                append-icon="mdi-magnify"
                hide-details
                color="#49BF88"
                label="Search"
                outlined
                dense
              ></v-text-field>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-col col="2">
          <v-row>
            <v-icon size="20" color="#49BF88" @click="viewItem(item.id)">
              mdi-eye
            </v-icon>
            <v-icon size="20" color="#49BF88" @click="editItem(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon size="20" color="#49BF88" @click="deleteItem(item.id)">
              mdi-delete
            </v-icon>
          </v-row>
        </v-col>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
    <v-row>
      <custom-alert></custom-alert>
    </v-row>
  </v-container>
</template>

<script>
import CustomAlert from '../../../components/custom-alert.vue'
import customAppbar from '../../../components/custom-appbar.vue'
import { mapState } from 'vuex'
import CompanyCreate from '../../../components/forms/company-create.vue'

export default {
  layout: 'dashboard',
  middleware: ['admin'],
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Website', value: 'website' },

        { text: 'Actions', value: 'actions', sortable: false },
      ],

      search: '',
      loading: false,
    }
  },

  async fetch({ store, error }) {
    try {
      await store.dispatch('companies/fetchCompanies')
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Unable to fetch companies at this time. Please try again later.',
      })
    }
  },

  components: { customAppbar, CustomAlert, CompanyCreate },

  computed: {
    ...mapState({
      companies: (state) => state.companies.companies,
    }),
  },

  methods: {
    viewItem(company) {
      this.$router.push({
        name: 'admin-companies-company',
        params: { company: company },
      })
    },
    editItem(company) {
      this.$router.push({
        name: 'admin-companies-company-edit',
        params: { company: company },
      })
    },

    deleteItem(id) {
      this.$store.dispatch('companies/removeCompany', id).then(() => {
        this.$store.dispatch('companies/fetchCompanies')
      })
    },
  },
}
</script>
