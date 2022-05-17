import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({ storage: window.sessionStorage })],
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false
        },

        mutations: {
        setToken (state, token) {
        state.token = token
        if (token && state.token == 200) {
        state.isUserLoggedIn = true
        } else {
        state.isUserLoggedIn = false
        }
        }
        },

        actions: {
        setToken ({ commit }, token) {
        commit('setToken', token)
        }
    }
});
export default store;