<template>
  <div v-if="posts.length > 0">
    <div v-for="(post, index) in posts" :key="index">
      <div class="post card_border">
        <div class="post_admin">
          <button class="admin_post_button">modify</button>
          <button class="admin_post_button">delete</button>
        </div>
        <div class="post_header">
          <h3>toto</h3>
          <p>Date</p>
        </div>
        <hr class="post_hr" />
        <div class="post_content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            deleniti possimus, iusto dicta aperiam nam modi ducimus aliquam
            ratione autem placeat aspernatur accusantium ab odio quae
            consectetur vero? Dolorem, magni.
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
export default {
  name: "Post",
  data: function () {
    this.getPosts();
  },
  props: {
    user: Object,
  },
  methods: {
    getPosts() {
      const self = this;
      this.$store
        .dispatch("getPosts")
        .then()
        .catch(
          (error) => console.log(error)
          //self.$toast.error("Erreur lors de la récupération des posts")
        );
    },
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
  },
};
</script>
<style>
.post {
  width: 40%;
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
  font-family: "Raleway", sans-serif;
  border: none;
  background-color: white;
  color: red;
}
</style>
