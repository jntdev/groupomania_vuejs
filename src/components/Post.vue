<template>
  <div v-if="posts.length > 0">
    <div class ="flex centercenter" v-for="(post, index) in posts" :key="index">
      <div class="post card_border">
        <div v-if="post.user_id == myId || myRole == 1" class="post_admin">
         
          <router-link :to="{name : 'ModifyPost', 
          params:{
            id: post.id, 
            title: post.title, 
            content: post.content,
            }}">
            <button class="admin_post_button">modify</button>
          </router-link>
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
        <div class="post_content flex" v-if="post.img_url !=''">
          <img :src="post.img_url" alt="">
          <p>{{post.content}}</p>
        </div>
        <div class="post_content flex" v-else>
          <p>{{post.content}}</p>
        </div>
        <div class="post_panel">
            
              <button class="toggleLike" @click="toggleLike(post.id)">
               <img v-if="post.liked_by != null && JSON.parse( post.liked_by ).includes(parseInt(myId))" src="@/assets/liked.png"/>
              <img v-else src="@/assets/unliked.png"/>
              </button>
              
              
        </div>
        <div class="likes_count" v-if="post.liked_by.length-2 == 0">Soyez le premier à liker la publication !</div>
              <div class="likes_count" v-if="post.liked_by.length-2 == 1"> {{post.liked_by.length-2}} Like</div>
        <div class="likes_count"  v-if="i =JSON.parse(post.liked_by).length > 1"> {{JSON.parse(post.liked_by).length}} Likes</div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
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

    formatDate: function (value) {
      moment.locale("fr");
      return moment(value).format("dddd Do MMMM YYYY");
    },

    getPosts() {
      const self = this;
      this.$store.dispatch("getPosts").then(()=> {
      })
      .catch((error) => {
        self.$toast.error("Erreur lors de la récupération des posts");
        console.log(error);
      });
    },
    deletePost: function (id) {
      const myId = sessionStorage.getItem("userId");
      const self = this;
      self.checkIfICan();
      this.$store
        .dispatch("deletePost", { postId: id,  myId })
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
    checkIfICan: function(){
      const myId = sessionStorage.getItem("userId");
      const formData = new FormData();
      formData.append("myid", myId);
      this.$store
        .dispatch("checkIfICan",  FormData)
        .catch((err) => {
          console.log(err.message)
        });
    },
    toggleLike: function (id) {
      
      const myId = sessionStorage.getItem("userId");
      const self = this;

      this.$store
        .dispatch("toggleLike", {
          user_id: myId,
          post_id: id,
        })
        .then(() => {
          self.getPosts();
        })
        .catch(() => {
          self.$toast.error("Votre action n'a pas été prise en compte");
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

    ...mapState(["status"]),
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/_vars.scss';
.post {
  margin-top: 40px;
  width: 50%;
  min-width: 400px;
  padding: 1% 3% 3% 3%;
}
.post_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.toggleLike{
  background: none;
  border: none;
  img{
    height: 50px;
  }
}

.owner{
  p{
    margin: 0;
  }
}
.post_hr {
  width: 80%;
  margin-left: 0;
  border: 0;
  background-image: linear-gradient(
    90deg,
    $thirdColor 0%,
    rgba(122, 0, 0, 1) 20%,
    $primaryColor 40%
  );
  height: 2px;
}
.post_panel {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.likes_count{
  text-align: end;
}
.button {
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  background-color: rgb(255, 255, 255);
  border-color: $primaryColor;
  border-radius: 40px;
  color: $thirdColor;
}
.post_content{
  align-items: flex-start;
  img{
    width: 300px;
    margin-right: 40px;
  }
  
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
  color: $primaryColor;
}
@media (max-width: 1060px) {
  .post{
    width: 80%;
  }
}

@media (max-width: 980px) {
.post{
   flex-direction: column;
   
}

.post_content{
   flex-direction: column;
   img{
     margin-bottom: 40px;
     margin-right: 0;
     width: 100%
   }
}

.post_hr{
  
  width: 100%;
}
}
@media (max-width: 630px) {
   .post_header{
      flex-direction: column;
    }
}
@media (max-width: 500px) {
  
  .post{
    min-width: unset;
    width: 90%;
  }
}
</style>
