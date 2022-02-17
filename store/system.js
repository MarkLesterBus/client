export const state = () => ({
  drawer: {
    visible: false,
    mini: false,
  },
})

export const mutations = {
  SET_VISIBILITY(state, visible) {
    state.drawer.visible = visible
  },

  SET_VARIANT(state, mini) {
    state.drawer.mini = mini
  },
}

export const actions = {
  setVisible({ commit }, visible) {
    commit('SET_VISIBILITY', visible)
  },

  setMini({ commit }, mini) {
    commit('SET_VARIANT', mini)
  },
}
