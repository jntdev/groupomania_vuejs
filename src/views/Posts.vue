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
      console.log("toto");
      this.$router.push("/");
    },
    newPost: function () {
      this.$router.push("/newpost");
    },
  },
  computed: {
    // posts() {
    //   return this.$store.getters.getPosts;
    // },
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
