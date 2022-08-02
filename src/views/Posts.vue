<template>
  <Header />
  <section class="board">
    <section class="all_posts">
      <h2>Tout les posts</h2>
      <Post />
    </section>
    <Panel />
  </section>
</template>
<script>
import Post from "../components/Post.vue";
import Panel from "../components/Panel.vue";
import Header from "../components/Header.vue";
export default {
  name: "Posts",
  components: {
    Header,
    Post,
    Panel,
  },
  data() {
    return {};
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    newPost: function () {
      this.$router.push("/newpost");
    },
    //getPosts() {
    //  const self = this;
    //  this.$store
    //    .dispatch("getPosts")
    //    .then()
    //    .catch(() =>
    //      self.$toast.error("Erreur lors de la récupération des posts")
    //    );
    //},
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
    //aller chercher le store
    //aller chercher la bonne fonction
  },
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
</style>
