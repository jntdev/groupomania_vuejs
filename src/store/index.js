import { createStore } from "vuex";


const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3333/api/',
    headers: {
        'content-type': 'application/json',
    },
});

let user = sessionStorage.getItem('user');
if (!user) {
    user = {
        userId: -1,
        token: '',
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) {
        user = {
            userId: -1,
            token: '',
        };
    }
}

// Create a new store instance.
const store = createStore({
    state: {
        status: '',
        user: user,
        userInfos: {
            email: '',
            password: '',
        },
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            //isAuthenticated == false;
            instance.defaults.headers.common['Authorization'] = user.token;
            sessionStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos;
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: '',
            }
            sessionStorage.removeItem('user');
        },
        setPostsList: function (state, data) {
            state.postsList = data;
        },
    },
    actions: {
        login: ({ commit }, userInfos) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                instance.post('/users/login', userInfos)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_login');
                        reject(error);
                    });
            });
        },
        createAccount: ({ commit }, userInfos) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/users', userInfos)
                    .then(function (response) {
                        commit('setStatus', 'created');
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_create');
                        reject(error);
                    });
            });
        },
        getUserInfos: ({ commit }) => {
            instance.post('/infos')
                .then(function (response) {
                    commit('userInfos', response.data.infos);
                })
                .catch(function () {
                });
        },
        getPosts: ({ commit }) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                console.log(instance);
                instance
                    .get(`/posts`)
                    .then((response) => {
                        console.log(response);
                        commit("setStatus", "");
                        commit("setPostsList", response.data);
                        resolve();
                    })
                    .catch(() => {
                        commit("setStatus", "");
                        reject(error);
                    });
            });
        },
    }
});
export default store;