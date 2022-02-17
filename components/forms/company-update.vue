<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-3"
        color="#49BF88"
        fab
        small
        dark
        elevation="0"
        v-bind="attrs"
        v-on="on"
        icon
      >
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        <v-icon class="mr-3" color="#69BF88">mdi-domain-plus</v-icon> Edit
        Company</v-card-title
      >
      <v-card-text class="mt-5">
        <v-text-field
          label="Name"
          v-model="name"
          @blur="$v.name.$touch()"
          @input="$v.name.$touch()"
          :error-messages="validate('required', $v.name)"
          prepend-inner-icon="mdi-domain"
          color="#69BF88"
          outlined
          clearable
          dense
        >
        </v-text-field>
        <v-text-field
          label="Website"
          color="#69BF88"
          prepend-inner-icon="mdi-web"
          v-model="website"
          @blur="$v.website.$touch()"
          @input="$v.website.$touch()"
          :error-messages="validate('required, url', $v.website)"
          outlined
          clearable
          dense
        >
        </v-text-field>
        <!-- Use the component in the right place of the template -->

        <tiptap-vuetify
          class="my-3"
          placeholder="All about the company."
          v-model="description"
          :extensions="extensions"
        />

        <template #placeholder> Loading... </template>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#69BF88" text @click="update()">
          <v-icon color="#69BF88" class="mr-2">mdi-send</v-icon>
          Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { mapState } from 'vuex'
import { required, url } from 'vuelidate/lib/validators'
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'
export default {
  data() {
    return {
      datepicker: false,
      dialog: false,
      // declare extensions you want to use
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
      // starting editor's content
    }
  },
  mixins: [validationMixin],
  validations: {
    name: { required },
    description: { required },
    // yr_established: { required },
    // population: { required },
    website: { required, url },
  },
  components: {
    TiptapVuetify,
  },
  computed: {
    ...mapState({
      company: (state) => state.companies.company,
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
          !v.url && errors.push('Must be a valid url.')
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
  },
}
</script>
