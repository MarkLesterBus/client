import CategoryService from '~/services/CategoryService'
export const namespaced = true
export const state = () => ({
  categories: [], // companies Object
  category: {
    id: '',
    name: '',
  }, // Category Object
})

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },

  SET_CATEGORY(state, payload) {
    state.category.id = payload.id
    state.category.name = payload.name
  },

  SET_NAME(state, payload) {
    state.category.name = payload
  },

  STORE_CATEGORY(state, payload) {
    state.categories.push(payload)
  },
  REMOVE_CATEGORY(state, payload) {
    state.categories = state.categories.filter(
      (category) => category.id !== payload
    )
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
  fetchCategories({ commit, dispatch }) {
    return CategoryService.fetchCategories()
      .then((rs) => {
        commit('SET_CATEGORIES', rs.data)
      })
      .catch(() => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'red',
            message: 'Unable to fetch categories, please try again.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  fetchCategory({ commit, dispatch }, payload) {
    return CategoryService.fetchCategory(payload)
      .then((rs) => {
        commit('SET_CATEGORY', rs.data)
      })
      .catch((er) => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'red',
            message: 'Unable to fetch specific category, please try again.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  storeCategory({ commit, getters, dispatch }, payload) {
    if (!getters.getExisitingCategory(payload.name)) {
      return CategoryService.storeCategory(payload)
        .then((rs) => {
          commit('STORE_CATEGORY', rs.data)

          dispatch(
            'alerts/createAlert',
            {
              color: 'green',
              message: 'Category ' + rs.data.name + ', successfuly created.',
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
              message: 'Unable to create new category, please try again.',
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
          message: 'Unable to create new Category, category was already taken.',
          status: 'Error',
          timeout: 5000,
          visible: true,
        },
        { root: true }
      )
    }
  },
  updateCategory({ commit, dispatch }, payload) {
    return CategoryService.updateCategory(payload)
      .then((rs) => {
        commit('SET_CATEGORY', rs.data)
        dispatch(
          'alerts/createAlert',
          {
            color: 'green',
            message: 'Category ' + rs.data.name + ', successfuly updated.',
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
            message: 'Unable to update category, please try again.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  removeCategory({ commit, dispatch }, payload) {
    return CategoryService.removeCategory(payload)
      .then((rs) => {
        commit('REMOVE_CATEGORY', rs.data)
        dispatch(
          'alerts/createAlert',
          {
            color: 'green',
            message: 'Category ' + rs.data.name + ', successfuly deleted.',
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
            message: 'Category ' + rs.data.name + ', successfuly deleted.',
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
  getExisitingCategory: (state) => (payload) => {
    return state.categories.find((category) => category.name === payload)
  },
}
