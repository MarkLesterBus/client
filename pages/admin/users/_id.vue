<template>
  <v-container>
    <custom-appbar title="Users" :prominent="false"> </custom-appbar>
    <v-card flat width="900">
      <v-card-title class="text-h5">
        <v-icon class="mr-3" color="#69BF88">mdi-account-plus</v-icon> Edit
        User</v-card-title
      >
      <v-card-text>
        <v-row>
          <v-col>
            <v-card class="my-4">
              <v-card-title>
                <v-icon class="mr-3" color="#69BF88">mdi-pencil</v-icon>
                Role / Position Title
              </v-card-title>
              <v-card-text>
                <v-combobox
                  label="Role"
                  :items="roles"
                  v-model="role"
                  color="#69BF88"
                  @blur="$v.role.$touch()"
                  @input="$v.role.$touch()"
                  :error-messages="validation('required', $v.role)"
                  outlined
                  dense
                >
                </v-combobox>
                <v-combobox
                  label="Position Title"
                  :items="titles"
                  v-model="title"
                  color="#69BF88"
                  @blur="$v.title.$touch()"
                  @input="$v.title.$touch()"
                  :error-messages="validation('required', $v.title)"
                  outlined
                  dense
                >
                </v-combobox>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="#69BF88" @click="updateRole">
                  <v-icon class="mr-2">mdi-floppy</v-icon> Save
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card class="my-4">
              <v-card-title
                ><v-icon class="mr-3" color="#69BF88">mdi-pencil</v-icon>
                Account</v-card-title
              >
              <v-card-text>
                <v-text-field
                  label="Name"
                  v-model="name"
                  @blur="$v.name.$touch()"
                  @input="$v.name.$touch()"
                  :error-messages="validation('required', $v.name)"
                  clearable
                  color="#69BF88"
                  outlined
                  dense
                >
                </v-text-field>

                <v-text-field
                  label="Email"
                  v-model="email"
                  @blur="$v.email.$touch()"
                  @input="$v.email.$touch()"
                  :error-messages="validation('required, email', $v.email)"
                  color="#69BF88"
                  clearable
                  outlined
                  dense
                ></v-text-field>
              </v-card-text>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="#69BF88" @click="updateAccount()">
                  <v-icon class="mr-2">mdi-floppy</v-icon> Save
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-card class="my-4">
              <v-card-title>
                <v-icon class="mr-3" color="#69BF88">mdi-pencil</v-icon>
                Contact / Address</v-card-title
              >
              <v-card-text>
                <v-text-field
                  label="Contact #."
                  color="#69BF88"
                  v-model="contact_no"
                  :placeholder="user.contact_no"
                  @blur="$v.contact_no.$touch()"
                  @input="$v.contact_no.$touch()"
                  :error-messages="validation('required', $v.contact_no)"
                  outlined
                  clearable
                  dense
                >
                </v-text-field>

                <v-textarea
                  label="Address"
                  color="#69BF88"
                  v-model="address"
                  :placeholder="user.address"
                  @blur="$v.address.$touch()"
                  @input="$v.address.$touch()"
                  :error-messages="validation('required', $v.address)"
                  outlined
                  dense
                ></v-textarea>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="#69BF88" @click="updateContact">
                  <v-icon class="mr-2">mdi-floppy</v-icon> Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="my-4">
              <v-card-title>
                <v-icon class="mr-3" color="#69BF88">mdi-pencil</v-icon>
                Image</v-card-title
              >
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <v-img
                      :src="
                        user.image
                          ? user.image
                          : 'https://via.placeholder.com/150?text=512x512'
                      "
                    ></v-img>
                  </v-col>
                  <v-col cols="7">
                    <p>
                      We recommend an image of at least 512x512 for the
                      property.
                    </p>
                    <v-file-input
                      color="#69BF88"
                      label="Select image file"
                      v-model="image.file"
                      @change="selectedFile()"
                      dense
                      outlined
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="#69BF88" @click="uploadImage">
                  <v-icon class="mr-2">mdi-floppy</v-icon> Save
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card class="my-4">
              <v-card-title>
                <v-icon class="mr-3" color="#69BF88">mdi-pencil</v-icon>
                Password</v-card-title
              >
              <v-card-text>
                <v-text-field
                  label="Password"
                  v-model="password"
                  @blur="$v.password.$touch()"
                  @input="$v.password.$touch()"
                  :error-messages="
                    validation('required, minLength', $v.password)
                  "
                  color="#69BF88"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  label="Confirm Password"
                  v-model="confirm"
                  @blur="$v.confirm.$touch()"
                  @input="$v.confirm.$touch()"
                  :error-messages="validation('sameAs', $v.confirm)"
                  color="#69BF88"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  outlined
                  dense
                >
                </v-text-field>
              </v-card-text>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="#69BF88" @click="updatePassword()">
                  <v-icon class="mr-2">mdi-floppy</v-icon> Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <custom-alert></custom-alert>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import CustomAlert from '../../../components/custom-alert.vue'
export default {
  layout: 'dashboard',
  middleware: ['admin', 'user'],
  data() {
    return {
      dialog: false,
      show: false,
      roles: ['Administrator', 'User'],
      titles: ['Manager', 'Staff'],
      confirm: '',
      image: {
        url: 'https://via.placeholder.com/150?text=512x512',
        file: null,
      },
    }
  },

  mixins: [validationMixin],

  validations: {
    name: { required },
    email: { required, email },
    password: { minLength: minLength(8) },
    confirm: { sameAs: sameAs('password') },
    address: { required },
    contact_no: { required },
    role: { required },
    title: { required },
  },

  created() {
    this.$store.dispatch('users/fetchUser', this.$route.params.id)
    console.log()
  },

  computed: {
    ...mapState({
      user: (state) => state.users.user,
    }),
    role: {
      get() {
        return this.user.role
      },
      set(value) {
        this.$store.commit('users/SET_ROLE', value)
      },
    },
    title: {
      get() {
        return this.user.title
      },
      set(value) {
        this.$store.commit('users/SET_TITLE', value)
      },
    },
    name: {
      get() {
        return this.user.name
      },
      set(value) {
        this.$store.commit('users/SET_NAME', value)
      },
    },
    email: {
      get() {
        return this.user.email
      },
      set(value) {
        this.$store.commit('users/SET_EMAIL', value)
      },
    },
    password: {
      get() {
        return this.user.password
      },
      set(value) {
        this.$store.commit('users/SET_PASSWORD', value)
      },
    },

    contact_no: {
      get() {
        return this.user.contact_no
      },
      set(value) {
        this.$store.commit('users/SET_CONTACT_NO', value)
      },
    },
    address: {
      get() {
        return this.user.address
      },
      set(value) {
        this.$store.commit('users/SET_ADDRESS', value)
      },
    },
  },
  components: {
    CustomAlert,
  },
  methods: {
    validation(rules, v) {
      const errors = []
      switch (rules) {
        case 'required':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          return errors
        case 'required, email':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          !v.email && errors.push('Must be a valid email.')
          return errors
        case 'required, minLength':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          !v.minLength && errors.push('Minimum of 8 characters.')
          return errors
        case 'required, sameAs':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          !v.sameAs && errors.push('Password does not match.')
          return errors
        default:
          break
      }
    },
    messageAlert(status, color, message) {
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
    updateRole() {
      this.$store.dispatch('users/updateUser', {
        id: this.$route.params.id,
        data: {
          role: this.role,
          title: this.title,
        },
      })
    },
    updateAccount() {
      this.$store.dispatch('users/updateUser', {
        id: this.$route.params.id,
        data: {
          name: this.name,
          email: this.email,
        },
      })
    },
    updatePassword() {
      this.$store
        .dispatch('users/updateUser', {
          id: this.$route.params.id,
          data: {
            password: this.password,
          },
        })
        .then(() => {
          this.resetForm
        })
    },
    updateContact() {
      this.$store.dispatch('users/updateUser', {
        id: this.$route.params.id,
        data: {
          contact_no: this.contact_no,
          address: this.address,
        },
      })
    },
    uploadImage() {
      this.$store.dispatch('users/uploadImage', {
        id: this.$route.params.id,
        image: this.image.file,
      })
    },

    resetPassword() {
      this.password = ''
      this.confirm = ''
    },
    selectedFile() {
      this.image.url = this.image.file
        ? URL.createObjectURL(this.image.file)
        : 'http://placehold.jp/b7b7b8/ffffff/150x150.png?css=%7B%22border-radius%22%3A%2215px%22%7D'
    },
  },
}
</script>

<style></style>
