import UserService from '~/services/UserService'
export const namespaced = true
export const state = () => ({
  users: [], // Users Object
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    contact_no: '',
    address: '',
    role: '',
    title: '',
    image: '',
  }, // User Object
})

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload
  },

  SET_USER(state, payload) {
    state.user.id = payload.id
    state.user.name = payload.name
    state.user.email = payload.email
    state.user.password = ''
    state.user.contact_no = payload.contact_no
    state.user.address = payload.address
    state.user.title = payload.title
    state.user.role = payload.role
    state.user.image = payload.image
  },
  SET_NAME(state, payload) {
    state.user.name = payload
  },
  SET_EMAIL(state, payload) {
    state.user.email = payload
  },
  SET_PASSWORD(state, payload) {
    state.user.password = payload
  },
  SET_CONTACT_NO(state, payload) {
    state.user.contact_no = payload
  },
  SET_ADDRESS(state, payload) {
    state.user.address = payload
  },
  SET_ROLE(state, payload) {
    state.user.role = payload
  },
  SET_TITLE(state, payload) {
    state.user.title = payload
  },

  STORE_USER(state, payload) {
    state.users.push(payload)
  },
  REMOVE_USER(state, payload) {
    state.users = state.users.filter((user) => user.id !== payload)
  },
}

export const actions = {
  fetchUsers({ commit, dispatch }) {
    return UserService.fetchtUsers()
      .then((rs) => {
        commit('SET_USERS', rs.data)
      })
      .catch(() => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'red',
            message: 'Unable to fetch users at this time.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  fetchUser({ commit }, payload) {
    return UserService.fetchUser(payload)
      .then((rs) => {
        commit('SET_USER', rs.data)
      })
      .catch((er) => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'red',
            message: 'Unable to fetch specific user at this time.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  storeUser({ commit, dispatch, getters }, payload) {
    if (getters.getExisitingUser(payload.email)) {
      return UserService.storeUser(payload)
        .then((rs) => {
          commit('STORE_USER', rs.data)
          dispatch('fetchUsers', {}, { root: true })
          dispatch(
            'alerts/createAlert',
            {
              color: 'green',
              message: 'New user created: ' + rs.data.name,
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
              color: 'error',
              message: 'Unable to create new user, email was already taken.',
              status: 'ERROR',
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
          color: 'error',
          message: 'Unable to create new user, email was already taken.',
          status: 'ERROR',
          timeout: 5000,
          visible: true,
        },
        { root: true }
      )
    }
  },
  updateUser({ commit, dispatch }, payload) {
    return UserService.updateUser(payload)
      .then((rs) => {
        commit('SET_USER', rs.data)
        dispatch(
          'alerts/createAlert',
          {
            color: 'info',
            message: 'User ' + rs.data.name + ', successfuly updated.',
            status: 'INFO',
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
            color: 'error',
            message: 'Unable to update specific user.',
            status: 'ERROR',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  removeUser({ commit, dispatch }, payload) {
    return UserService.removeUser(payload)
      .then((rs) => {
        commit('REMOVE_USER', rs.data)
        dispatch(
          'alerts/createAlert',
          {
            color: 'success',
            message: 'User ' + rs.data.name + ', successfuly deleted.',
            status: 'SUCCESS',
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
            color: 'error',
            message: 'Unable to delete specific user.',
            status: 'ERROR',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  uploadImage({ commit, dispatch }, payload) {
    return UserService.uploadImage(payload).then((rs) => {
      commit('SET_USER', rs.data)
      console.log(rs)
      dispatch(
        'alerts/createAlert',
        {
          color: 'success',
          message: 'User ' + rs.data.name + ', image successfuly uploaded.',
          status: 'SUCCESS',
          timeout: 5000,
          visible: true,
        },
        { root: true }
      )
    })
  },
}

export const getters = {
  getExisitingUser: (state) => (payload) => {
    return state.users.find((user) => user.email === payload)
  },
}
