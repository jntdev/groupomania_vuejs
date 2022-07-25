<template>
  <div class="post">
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo deleniti
        possimus, iusto dicta aperiam nam modi ducimus aliquam ratione autem
        placeat aspernatur accusantium ab odio quae consectetur vero? Dolorem,
        magni.
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
</template>
<script>
export default {
  name: "Post",
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style>
.post {
  width: 40%;
  padding: 1% 3% 3% 3%;
  border-radius: 15px;
  box-shadow: 5px 7px 15px -5px #000000;
}
.post_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post_hr {
  width: 80%;
  margin-left: 0;
  border: solid 1px red;
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
