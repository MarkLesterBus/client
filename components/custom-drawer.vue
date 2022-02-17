<template>
  <v-navigation-drawer v-model="visible" :mini-variant="mini" fixed app>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon size="40" color="orange">mdi-handshake</v-icon>
        </v-list-item-avatar>
        <v-list-item-content v-if="!mini">
          <v-list-item-title
            class="text-h5 font-weight-bold"
            style="color: orange"
          >
            PESO
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            Employment System
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-{{ `chevron-${mini ? 'right' : 'left'}` }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item class="px-2" v-if="mini">
        <v-list-item-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-{{ `chevron-${mini ? 'right' : 'left'}` }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list v-for="item in menu" :key="item.header">
      <v-subheader class="text-caption" v-if="!mini">{{
        item.header
      }}</v-subheader>
      <v-list-item-group v-model="selectedItem" color="orange">
        <v-list-item
          v-for="ls in item.menu"
          :key="ls.title"
          :to="ls.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ ls.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="ls.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import list from '../components/helpers/menu'
import NuxtLogo from '../components/NuxtLogo.vue'
export default {
  name: 'CustomDrawer',
  data() {
    return {
      menu: list,
      selectedItem: null,
    }
  },
  computed: {
    ...mapState({
      drawer: (state) => state.system.drawer,
    }),
    visible: {
      get() {
        return this.drawer.visible
      },
      set(value) {
        this.$store.commit('system/SET_VISIBILITY', value)
      },
    },
    mini: {
      get() {
        return this.drawer.mini
      },
      set(value) {
        this.$store.commit('system/SET_VARIANT', value)
      },
    },
  },
  components: { NuxtLogo },
}
</script>
