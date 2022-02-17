<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2"
        color="#49BF88"
        fab
        dark
        elevation="0"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon> mdi-file-tree </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        <v-icon class="mr-3" color="#69BF88">mdi-domain-plus</v-icon> Add
        Job</v-card-title
      >
      <v-card-text class="mt-5">
        <!-- Use the component in the right place of the template -->

        <label for="Title">
          <p class="text-h6">Title</p>
          <custom-editor v-model="title" />
        </label>
        <v-divider class="my-3"></v-divider>
        <label for="Details" class="mb-3">
          <p class="text-h6">Details</p>
          <custom-editor v-model="details" />
        </label>
        <br />
        <label for=""
          >Company
          <v-select
            label="Company"
            outlined
            dense
            v-model="company"
            :items="companies"
            item-text="name"
            item-value="id"
            return-object
          ></v-select>
        </label>
        <label for=""
          >Qualification
          <v-select
            label="Level"
            outlined
            dense
            :items="levels"
            v-model="level"
            item-text="level"
            item-value="id"
            return-object
          ></v-select>
          <v-select
            label="Category"
            :items="categories"
            outlined
            dense
            v-model="category"
            item-text="name"
            item-value="id"
            return-object
          ></v-select>
        </label>

        <label for="location"
          >Location
          <v-radio-group v-model="choices1" row>
            <v-radio label="On Site" value="On Site"></v-radio>

            <v-radio label="Work From Home" value="Work From Home"></v-radio>
          </v-radio-group>
        </label>

        <v-text-field
          v-if="choices1 == 'On Site'"
          label="Location"
          v-model="location"
          color="#69BF88"
          outlined
          clearable
          dense
        >
        </v-text-field>
        <v-textarea
          label="Address"
          v-model="address"
          color="#69BF88"
          type="number"
          outlined
          clearable
          dense
        >
        </v-textarea>
        <label for="">
          Date
          <v-radio-group v-model="choices2" row>
            <v-radio label="Date" value="Date"></v-radio>
            <v-radio label="Urgent" value="Urgent"></v-radio>
            <v-radio label="Featured" value="Featured"></v-radio>
          </v-radio-group>
        </label>
        <v-menu
          v-if="choices2 == 'Date'"
          v-model="datepicker_menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Date"
              readonly
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="datepicker_menu = false"
          ></v-date-picker>
        </v-menu>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#69BF88" text @click="submit()">
          <v-icon color="#69BF88" class="mr-2">mdi-send</v-icon>
          Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomEditor from '../../components/custom-editor.vue'
import {
  defineComponent,
  reactive,
  ref,
  computed,
  useStore,
  useFetch,
  onMounted,
  toRefs,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const job = reactive({
      title: ``,
      details: ``,
      location: '',
      address: '',
      date: '',
      choices1: '',
      choices2: '',

      level: '',
      category: '',
      company: '',
    })

    const datepicker_menu = ref(false)
    const dialog = ref(false)
    const store = useStore()
    const { fetch, fetchState } = useFetch(async () => {
      await store.dispatch('levels/fetchLevels')
      await store.dispatch('companies/fetchCompanies')
      await store.dispatch('categories/fetchCategories')
    })
    const levels = computed(() => store.state.levels.levels)
    const categories = computed(() => store.state.categories.categories)
    const companies = computed(() => store.state.companies.companies)

    return {
      levels,
      companies,
      categories,
      datepicker_menu,
      ...toRefs(job),
    }
  },
  components: {
    CustomEditor,
  },
})
</script>
