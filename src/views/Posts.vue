<template>
  <section class="board">
    <div class="left_panel">
      <button @click="logout()" class="board_button button">Déconnexion</button>
      <button @click="newPost()" class="new_post_button board_button button">
        Nouveau Post
      </button>
    </div>
    <hr class="board_hr" />
    <section class="all_posts">
      <h2>Tout les posts</h2>
      <Post />
    </section>
  </section>
</template>
<script>
import Post from "../components/Post.vue";
export default {
  name: "Posts",
  components: {
    Post,
  },
  data() {
    return {};
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.all_posts {
  flex: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.board {
  display: flex;
  flex: 2;
  padding: 3%;
  .left_panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 200px;
    height: 20vh;
    justify-content: space-around;
  }
  .board_button {
    padding: 3% 6%;
  }
  .new_post_button {
    border-color: rgb(0, 0, 0);
  }
}
.board_hr {
  margin-left: 50px;
  height: 60vh;
  border: solid 1px red;
}
</style>
