import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({ storage: window.sessionStorage })],
    state: {
        token: null,
        Servertoken:null,
        user: null,
        server:null,
        isUserLoggedIn: false,
        isServerLoggedIn:false
        },

        mutations: {
        setToken (state, token) {
        state.token = token
        if (token && state.token == 200) {
        state.isUserLoggedIn = true
        } else {
        state.isUserLoggedIn = false
        }
        },
        setServerToken (state, token) {
            state.Servertoken = token
            if (token && state.Servertoken == 200) {
                state.isServerLoggedIn = true
            } else {
                state.isServerLoggedIn = false
            }
        }
        },

        actions: {
        setToken ({ commit }, token) {
        commit('setToken', token)
        },
        setServerToken({commit},token){
            commit('setServerToken',token)
        }
    }
});
export default store;