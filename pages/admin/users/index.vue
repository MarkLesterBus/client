<template>
  <v-container>
    <custom-appbar title="Users" :prominent="false">
      <!-- <template v-slot:actions>
        <v-tabs align-with-title>
          <v-tab>Administrator</v-tab>
          <v-tab>Staff</v-tab>
          <v-tab>Manager</v-tab>
        </v-tabs>
      </template> -->
    </custom-appbar>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="users"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-col cols="12" md="12" sm="12">
            <v-row align="center">
              <user-create></user-create>
              <v-divider vertical class="mx-3"></v-divider>
              <v-toolbar-title>Manage Users</v-toolbar-title>
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
import UserCreate from '../../../components/forms/user-create.vue'
import { mapState } from 'vuex'

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
        { text: 'Email', value: 'email' },
        { text: 'Title', value: 'title' },
        { text: 'Contact #', value: 'contact_no' },
        { text: 'Address', value: 'address' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      search: '',
      loading: false,
    }
  },

  async fetch({ store, error }) {
    try {
      await store.dispatch('users/fetchUsers')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch users at this time. Please try again later.',
      })
    }
  },

  components: { customAppbar, CustomAlert, UserCreate },

  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
  },

  methods: {
    editItem(id) {
      this.$router.push({ name: 'admin-users-id', params: { id: id } })
    },

    deleteItem(id) {
      this.$store.dispatch('users/removeUser', id).then(() => {
        this.$store.dispatch('users/fetchUsers')
      })
    },
  },
}
</script>
