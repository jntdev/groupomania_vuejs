
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
        instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } catch (ex) {
        user = {
            userId: -1,
            token: '',
        };
    }
}

const store = createStore({
    state: {
        status: '',
        user: user,
        userInfos: {
            id: '',
            email: '',
            is_admin: '',
        },
        postsList: []
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            sessionStorage.setItem('user', JSON.stringify(user.user));
            sessionStorage.setItem('userId', JSON.stringify(user.user.id));
            sessionStorage.setItem('userEmail', JSON.stringify(user.user.email));
            sessionStorage.setItem('userRole', JSON.stringify(user.user.is_admin));
            sessionStorage.setItem('token', JSON.stringify(user.token));
            state.user = user;
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos;
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: '',
                is_admin: '',
            }
            sessionStorage.clear();
            window.location.reload();
        },
        setPostsList: function (state, data) {
            state.postsList = data;
        },
        addPostOnList: function (state, postCreated) {

            state.postsList.unshift(postCreated);
        },
        deletePostOnList: function (state, postId) {
            const index = state.postsList.findIndex((post) => post.id === postId);
            state.postsList.splice(index, 1);
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
        checkIfICan: ({ commit }, myId) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                commit;
                instance.post(`users/checkifican/${myId}`)
                    .then(function (response) {
                        sessionStorage.setItem('token', JSON.stringify(response.data.token));
                        commit('setStatus', 'created');
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_create');
                        reject(error);
                    });
            });
        },
        getPosts: ({ commit }) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                instance
                    .get(`/posts`)
                    .then((response) => {
                        commit("setStatus", "");
                        commit("setPostsList", response.data);
                        resolve();
                    })
                    .catch((error) => {
                        commit("setStatus", "");
                        reject(error);
                    });
            });
        },
        createPost: ({ commit }, postInfos) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                instance
                    .post(`posts/`, postInfos)
                    .then(() => {
                        commit("setStatus", "");
                        resolve();
                    })
                    .catch((error) => {
                        commit("setStatus", "");
                        reject(error);
                    });
            });
        },
        modifyPost: ({ commit }, { postId, postInfos }) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                instance
                    .post(`posts/${postId}`, postInfos)
                    .then(() => {
                        commit("setStatus", "");
                        resolve();
                    })
                    .catch((err) => {
                        commit("setStatus", "");
                        reject(err.message);
                    });
            });
        },
        deletePost: ({ commit }, { postId, myId }) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                instance
                    .delete(`posts/${postId}`, myId)
                    .then(() => {
                        commit("deletePostOnList", postId);
                        commit("setStatus", "");
                        resolve();
                    })
                    .catch((err) => {
                        commit("setStatus", "");
                        reject(err.message);
                    });
            });
        },
        toggleLike: ({ commit }, likeInfos) => {
            return new Promise((resolve, reject) => {
                instance
                    .post(`post/likes/`, likeInfos)
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    });
            });
        },
    },
    getters: {
        getUserInfos: (state) => {
            return state.user;
        },

        getPosts: (state) => {
            return state.postsList;
        },
    },
});
instance.interceptors.request.use(
    (instance.defaults.headers.common[
        "Authorization"
    ] = sessionStorage.getItem("token"))
);
export default store;







