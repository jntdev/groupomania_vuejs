import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        postInfo: {
            title: "",
            content:
                "",
        }
    },
    mutations: {

    },
    actions: {
        newPost: ({ commit }, postInfo) => {
            //route get
            instance.post("/posts", postInfo)
                .then(function (response) {
                    commit('setStatus', 'post_created');
                    resolve(response);
                })
                .catch(function (error) {
                    commit('setStatus', 'error_postc_reate');
                    reject(error);
                });
        }
    }
})