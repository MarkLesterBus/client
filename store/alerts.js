export const namespaced = true
export const state = () => ({
  alerts: [],
  alert: {
    color: '',
    message: '',
    status: '',
    timeout: 5000,
    visible: false,
  },
})

export const mutations = {
  SET_ALERT(state, alert) {
    state.alert.color = alert.color
    state.alert.message = alert.message
    state.alert.status = alert.status
    state.alert.timeout = alert.timeout
    state.alert.visible = alert.visible
  },
  SET_ALERT_VISIBILITY(state, visible) {
    state.alert.visible = visible
  },
  CREATE_ALERT(state, alert) {
    state.alerts.push(alert)
  },

  CLOSE_ALERT(state, visible) {
    state.alert.visible = visible
  },
}

export const actions = {
  createAlert({ commit }, alert) {
    commit('SET_ALERT', alert)
    commit('CREATE_ALERT', alert)
  },
  closeAlert({ commit }) {
    commit('CLOSE_ALERT', false)
  },
}
