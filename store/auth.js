// reusable aliases for mutations
export const AUTH_MUTATIONS = {
    SET_USER: 'SET_USER',
    SET_PAYLOAD: 'SET_PAYLOAD',
    LOGOUT: 'LOGOUT',
    SET_VIEWS: 'SET_VIEWS',
  }
  
  export const state = () => ({
    access_token: null, // JWT access token
    refresh_token: null, // JWT refresh token
    id: null, // user id
    email_address: null, // user email address
    views: [], // user views
  })
  
  export const mutations = {
    // store the logged in user in the state
    [AUTH_MUTATIONS.SET_USER] (state, { _id, email }) {
      state.id = _id
      state.email_address = email
    },

    // store the user views in the state
    [AUTH_MUTATIONS.SET_VIEWS] (state, views) {
      state.views = views
    },
  
    // store new or updated token fields in the state
    [AUTH_MUTATIONS.SET_PAYLOAD] (state, {access_token, refresh_token}) {
      state.access_token = access_token
  
      // refresh token is optional, only set it if present
      if (refresh_token) {
        state.refresh_token = refresh_token
      }
    },
  
    // clear our the state, essentially logging out the user
    [AUTH_MUTATIONS.LOGOUT] (state) {
      state.id = null
      state.email_address = null
      state.access_token = null
      state.refresh_token = null
      state.views = []
    },
  }
  
  export const actions = {
    async login ({ commit, dispatch }, { email, password }) {
      // make an API call to login the user with an email address and password
      const { data: {  user, token, refresh_token  } } = await this.$axios.post(
        '/api/user/login', 
        { email, password }
      )
      
      // commit the user and tokens to the state
      commit(AUTH_MUTATIONS.SET_USER, user)
      commit(AUTH_MUTATIONS.SET_PAYLOAD, {access_token:token, refresh_token:refresh_token})

      const { data } = await this.$axios.post(
        '/api/user/getviews', 
        { email }
      )
      
      // commit the user views to the state
      commit(AUTH_MUTATIONS.SET_VIEWS, data)
    },

    async googleAuth({commit, dispatch},{email,name,lastName}){
      // make an API call to login the user with an email address and password
      const { data: {  user, token, refresh_token  } } = await this.$axios.post(
        '/api/user/createOrGetUser', 
        { email,name,lastName }
      )
      
      commit(AUTH_MUTATIONS.SET_USER, user)
      commit(AUTH_MUTATIONS.SET_PAYLOAD, {access_token:token, refresh_token:refresh_token})

      const { data } = await this.$axios.post(
        '/api/user/getviews', 
        { email }
      )
      
      // commit the user views to the state
      commit(AUTH_MUTATIONS.SET_VIEWS, data)

    },



    async getviews ({ commit, state }) {
      const {email_address} = state
      // make an API call to getviews with an email address
      const { data } = await this.$axios.post(
        '/api/user/getviews', 
        { email:email_address }
      )
      
      // commit the user views to the state
      commit(AUTH_MUTATIONS.SET_VIEWS, data)
    },

    // given the current refresh token, refresh the user's access token to prevent expiry
    async refresh ({ commit, state }) {
      const old_refresh_token = state.refresh_token;
  
      // make an API call using the refresh token to generate a new access token
      const { data: {  user, token, refresh_token  } } = await this.$axios.post(
        '/api/user/refresh', 
        { refresh_token:old_refresh_token }
      )
      
      commit(AUTH_MUTATIONS.SET_USER, user)
      commit(AUTH_MUTATIONS.SET_PAYLOAD, {access_token:token, refresh_token:refresh_token})
    },
  
    // logout the user
    async logout ({ commit, state }) {
      const {email_address} = state
      await this.$axios.post(
        '/api/user/logout', 
        { email:email_address }
      )
      commit(AUTH_MUTATIONS.LOGOUT)
    },
  }
  
  export const getters = {
    // determine if the user is authenticated based on the presence of the access token
    isAuthenticated: (state) => {
      return state.access_token !== null && state.access_token !== '' ? true : false
    },
    views: (state) => {
      return state.views
    },
  }