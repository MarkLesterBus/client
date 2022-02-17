<template>
  <v-container>
    <custom-appbar title="Terminals" :prominent="false"> </custom-appbar>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="routes"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-col cols="12" md="12" sm="12">
            <v-row align="center">
              <!-- <terminal-create></terminal-create> -->

              <v-divider vertical class="mx-3"></v-divider>
              <v-toolbar-title>Manage Routes</v-toolbar-title>
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
import CustomAlert from '../components/custom-alert.vue'
import customAppbar from '../components/custom-appbar.vue'
import {
  defineComponent,
  computed,
  useStore,
  useFetch,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'dashboard',
  // middleware: ['admin'],
  setup() {
    const headers = ref([
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Code', value: 'code' },
      { text: 'Origin', value: 'origin' },
      { text: 'Destination', value: 'destination' },
      { text: 'Distance (km)', value: 'distance' },
      { text: 'Duration', value: 'duration' },

      { text: 'Actions', value: 'actions', sortable: false },
    ])
    const search = ref('')
    const loading = ref(false)
    const store = useStore()
    const router = useRouter()
    const routes = computed(() => store.state.routes.routes)

    const { fetch, fetchState } = useFetch(async () => {
      await store.dispatch('routes/fetchRoutes').catch(() => {
        console.log(fetchState)
      })
    })

    function editItem(id) {
      loading.value = true
      store.dispatch('routes/fetchRoute', id)
      router.push({ name: 'admin-routes-route', params: id })
    }

    function deleteItem(id) {
      store.dispatch('routes/removeRoute', id).then(() => {
        fetch()
      })
    }
    return { headers, search, loading, routes, editItem, deleteItem }
  },
  components: { customAppbar, CustomAlert, TerminalCreate },
})
</script>
