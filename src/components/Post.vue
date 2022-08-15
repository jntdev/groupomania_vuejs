<template>
  <div v-if="posts.length > 0">
    <div v-for="(post, index) in posts" :key="index">
      <div class="post card_border">
        <div v-if="post.user_id == myId || myRole == 1" class="post_admin">
          <button class="admin_post_button">modify</button>
          <button @click="deletePost(post.id)" class="admin_post_button">
            delete
          </button>
        </div>
        <div class="post_header">
          <h3>{{ post.title }}</h3>
          <div class="owner flexcol">
            <p>Publié le {{ formatDate(post.created_at) }}</p>

            <p>par {{ post.user.email }}</p>
          </div>
        </div>
        <hr class="post_hr" />
        <div class="post_content">
          <p>
            {{ post.content }}
          </p>
        </div>
        <div class="post_panel">
          <button class="comment_button button">Comment</button>
          <div class="likes">
            <button>Like</button>
            <button>Dislike</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "Post",
  data: function () {
    return {
      myId: sessionStorage.getItem("userId"),
      myRole: sessionStorage.getItem("userRole"),
    };
  },
  mounted: function () {
    this.getPosts();
  },

  methods: {
    getUser(post) {},

    formatDate: function (value) {
      moment.locale("fr");
      return moment(value).format("dddd Do MMMM YYYY");
    },

    getPosts() {
      const self = this;
      this.$store
        .dispatch("getPosts")
        .then()
        .catch((error) => {
          self.$toast.error("Erreur lors de la récupération des posts");
          console.log(error);
        });
    },

    deletePost: function (id) {
      const self = this;
      this.$store
        .dispatch("deletePost", id)
        .then(() => {
          self.$toast.success("Publication supprimée");
        })
        .catch((err) => {
          if (err.message == "Request failed with status code 405") {
            self.$toast.error("Vous n'avez pas les droits suffisant");
          }
          self.$toast.error("Erreur lors de la suppression");
        });
    },
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
    user() {
      return this.$store.getters.getUserInfos;
    },
  },
};
</script>
<style>
.post {
  margin-top: 40px;
  width: 600px;
  padding: 1% 3% 3% 3%;
}
.post_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post_hr {
  width: 80%;
  margin-left: 0;
  border: 0;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(122, 0, 0, 1) 20%,
    rgba(255, 0, 0, 1) 40%
  );
  height: 2px;
}
.post_panel {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.button {
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  background-color: rgb(255, 255, 255);
  border-color: red;
  border-radius: 40px;
  color: rgb(0, 0, 0);
}
.comment_button {
  padding: 1.2% 4%;
}
.post_admin {
  display: flex;
  justify-content: flex-end;
}
.admin_post_button {
  cursor: pointer;
  font-family: "Raleway", sans-serif;
  border: none;
  background-color: white;
  color: red;
}
</style>
