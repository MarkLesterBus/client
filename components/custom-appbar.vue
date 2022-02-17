<template>
  <v-app-bar dark color="orange" flat fixed app>
    <v-app-bar-nav-icon @click.stop="visible = !visible" />
    <v-toolbar-title v-text="title" />

    <v-spacer></v-spacer>
    <v-btn v-if="$auth.loggedIn" icon><v-icon>mdi-bell</v-icon></v-btn>
    <v-menu v-if="$auth.loggedIn" v-model="menu" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs">
          <v-avatar size="35">
            <v-img
              :src="
                user.image
                  ? user.image
                  : 'https://via.placeholder.com/150?text=512x512'
              "
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card width="300">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="user.image"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              <v-list-item-subtitle class="text-caption"
                >{{ user.role }}, {{ user.title }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item-group router>
            <v-list-item :to="'/admin/users/' + user.id">
              <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Edit Profile</v-list-item-title>
            </v-list-item>
            <v-list-item :to="redirectTo()">
              <v-list-item-icon>
                <v-icon>mdi-cogs</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <v-divider></v-divider>
          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <div v-else>
      <v-btn text>Bookings</v-btn>
      <v-btn text>Trips</v-btn>
      <v-btn text>About</v-btn>
      <v-btn text>FAQ</v-btn>
      <v-divider vertical></v-divider>
      <v-btn to="/login" text>Login</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['title', 'prominent'],
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    ...mapState({
      drawer: (state) => state.system.drawer,
      user: (state) => state.auth.user,
    }),

    visible: {
      get() {
        return this.drawer.visible
      },
      set(value) {
        this.$store.commit('system/SET_VISIBILITY', value)
      },
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    redirectTo() {
      if (this.$auth.user.role === 'Administrator') {
        return '/admin'
      } else {
        return '/user'
      }
    },
  },
}
</script>
