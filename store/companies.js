import CompanyService from '~/services/CompanyService'
export const namespaced = true
export const state = () => ({
  companies: [], // companies Object
  company: {
    id: '',
    name: '',
    description: '',
    website: '',
    logo: null,
  }, // company Object
})

export const mutations = {
  SET_COMPANIES(state, payload) {
    state.companies = payload
  },

  SET_COMPANY(state, payload) {
    state.company.id = payload.id
    state.company.logo = payload.logo
    state.company.name = payload.name
    state.company.description = payload.description
    state.company.website = payload.website
  },

  SET_NAME(state, payload) {
    state.company.name = payload
  },
  SET_DESCRIPTION(state, payload) {
    state.company.description = payload
  },
  SET_WEBSITE(state, payload) {
    state.company.website = payload
  },

  STORE_COMPANY(state, payload) {
    state.companies.push(payload)
  },
  REMOVE_COMPANY(state, payload) {
    state.companies = state.companies.filter(
      (company) => company.id !== payload
    )
  },
}

export const actions = {
  fetchCompanies({ commit, dispatch }) {
    return CompanyService.companies()
      .then((rs) => {
        commit('SET_COMPANIES', rs.data)
      })
      .catch(() => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'red',
            message: 'Unable to fetch companies, please try again.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  fetchCompany({ commit, dispatch }, payload) {
    return CompanyService.company(payload)
      .then((rs) => {
        commit('SET_COMPANY', rs.data)
      })
      .catch((er) => {
        dispatch(
          'alerts/createAlert',
          {
            color: 'red',
            message: 'Unable to fetch specific companies, please try again.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  storeCompany({ commit, getters, dispatch }, payload) {
    if (!getters.getExisitingCompany(payload.name)) {
      return CompanyService.save(payload)
        .then((rs) => {
          commit('STORE_COMPANY', rs.data)

          dispatch(
            'alerts/createAlert',
            {
              color: 'green',
              message: 'company ' + rs.data.name + ', successfuly created.',
              status: 'Success',
              timeout: 5000,
              visible: true,
            },
            { root: true }
          )
        })
        .catch((er) => {
          console.log(er.message)
          dispatch(
            'alerts/createAlert',
            {
              color: 'red',
              message: 'Unable to create new company, please try again.',
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
          message:
            'Unable to create new company, Company email was already taken.',
          status: 'Error',
          timeout: 5000,
          visible: true,
        },
        { root: true }
      )
    }
  },
  updateCompany({ commit, dispatch }, payload) {
    return CompanyService.update(payload)
      .then((rs) => {
        commit('SET_COMPANY', rs.data)
        dispatch(
          'alerts/createAlert',
          {
            color: 'green',
            message: 'Company ' + rs.data.name + ', successfuly updated.',
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
            message: 'Unable to update company, please try again.',
            status: 'Error',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  removeCompany({ commit, dispatch }, payload) {
    return CompanyService.remove(payload)
      .then((rs) => {
        commit('REMOVE_COMPANY', rs.data)
        dispatch(
          'alerts/createAlert',
          {
            color: 'green',
            message: 'Company ' + rs.data.name + ', successfuly deleted.',
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
            message: 'Company ' + rs.data.name + ', successfuly deleted.',
            status: 'Success',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      })
  },
  uploadLogo({ commit, dispatch }, payload) {
    return CompanyService.upload(payload).then((rs) => {
      commit('SET_COMPANY', rs.data)
      dispatch(
        'alerts/createAlert',
        {
          color: 'green',
          message: 'Company ' + rs.data.name + ', logo successfuly uploaded.',
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
  getExisitingCompany: (state) => (payload) => {
    return state.companies.find((company) => company.name === payload)
  },
}
