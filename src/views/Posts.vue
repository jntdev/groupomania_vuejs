<template>
  <Header />
  <section class="board">
    <button
      @click="newPost()"
      class="display_desktop new_post_button board_button button"
    >
      Nouvelle publication
    </button>
    <section class="all_posts">
      <div class="post_head">
        <button
          @click="newPost()"
          class="display_smartphone new_post_button board_button button"
        >
          Nouvelle publication
        </button>
        <h2>Fil d'actualité</h2>
      </div>
      <Post />
    </section>
  </section>
</template>
<script>
import Post from "../components/Post.vue";
import Header from "../components/Header.vue";
export default {
  name: "Posts",
  components: {
    Header,
    Post,
  },
  data() {
    return {};
  },
  methods: {
    newPost: function () {
      this.$router.push("/newpost");
    },
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
  computed: {},
};
</script>
<style lang="scss">
@import "@/assets/scss/_vars.scss";
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post_head {
  h2 {
    text-align: center;
  }
}
.all_posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}
.board_button {
  margin-top: 20px;
  padding: 15px 30px;
}
.board_button:hover {
  background-color: $secondaryColor;
}
.display_smartphone {
  display: none;
}
.display_desktop {
  position: absolute;
  top: 80px;
  left: 80px;
}

@media (max-width: 1060px) {
  .display_smartphone {
    display: unset;
  }
  .display_desktop {
    display: none;
  }
}
</style>
