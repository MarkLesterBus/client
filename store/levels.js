import LevelService from '~/services/LevelService'
export const namespaced = true
export const state = () => ({
  levels: [], // companies Object
  level: {
    id: '',
    level: '',
  }, // Level Object
})

export const mutations = {
  SET_LEVELS(state, payload) {
    state.levels = payload
  },

  SET_LEVEL(state, payload) {
    state.level.id = payload.id
    state.level.level = payload.level
  },

  SET_NAME(state, payload) {
    state.level.level = payload
  },

  STORE_LEVEL(state, payload) {
    state.levels.push(payload)
  },
  REMOVE_LEVEL(state, payload) {
    state.levels = state.levels.filter((level) => level.id !== payload)
  },
}

export const actions = {
  alert({ dispatch }, status, color, message) {
    dispatch(
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
  fetchLevels({ commit, dispatch }) {
    return LevelService.fetchLevels()
      .then((rs) => {
        commit('SET_LEVELS', rs.data)
      })
      .catch(() => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'red',
            message: 'Unable to fetch Levels, please try again.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  fetchLevel({ commit, dispatch }, payload) {
    return LevelService.fetchLevel(payload)
      .then((rs) => {
        commit('SET_LEVEL', rs.data)
      })
      .catch((er) => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'red',
            message: 'Unable to fetch specific Level, please try again.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  storeLevel({ commit, getters, dispatch }, payload) {
    if (!getters.getExisitingLevel(payload.level)) {
      return LevelService.storeLevel(payload)
        .then((rs) => {
          commit('STORE_LEVEL', rs.data)
          dispatch(
            'alerts/createAlert',
            {
              color: 'green',
              message: 'Level ' + rs.data.name + ', successfuly created.',
              status: 'Success',
              timeout: 5000,
              visible: true,
            },
            { root: true }
          )
        })
        .catch((er) => {
          console.log(er)
          dispatch(
            'alerts/createAlert',
            {
              color: 'red',
              message: 'Unable to create new Level, please try again.',
              status: 'Error',
              timeout: 5000,
              visible: true,
            },
            { root: true }
          )
        })
    } else {
      dispatch(
        'alerts/createAlert',
        {
          color: 'red',
          message: 'Unable to create new Level, Level email was already taken.',
          status: 'Error',
          timeout: 5000,
          visible: true,
        },
        { root: true }
      )
    }
  },
  updateLevel({ commit, dispatch }, payload) {
    return LevelService.updateLevel(payload)
      .then((rs) => {
        console
        commit('SET_LEVEL', rs.data)
        dispatch(
          'alerts/createAlert',
          {
            color: 'green',
            message: 'Level ' + rs.data.name + ', successfuly updated.',
            status: 'Success',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
      .catch((er) => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'red',
            message: 'Unable to update Level, please try again.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  removeLevel({ commit, dispatch }, payload) {
    return LevelService.removeLevel(payload)
      .then((rs) => {
        commit('REMOVE_LEVEL', rs.data)
        dispatch(
          'alerts/createAlert',
          {
            color: 'green',
            message: 'Level ' + rs.data.name + ', successfuly deleted.',
            status: 'Success',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
      .catch((er) => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'green',
            message: 'Level ' + rs.data.name + ', successfuly deleted.',
            status: 'Success',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
}

export const getters = {
  getExisitingLevel: (state) => (payload) => {
    return state.levels.find((level) => level.level === payload)
  },
}
