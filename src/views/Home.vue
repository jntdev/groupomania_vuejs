<template>
  <section>
    <div class="hero"></div>
  </section>
  <section class="login_section">
    {{API_SERVICE_URL}}
    <div class="card">
      <div class="tabs" v-if="mode == 'login'">
        <div class="tab connexion_tab">
          <h2 class="activ">Connexion</h2>
        </div>
        <div class="tab register_tab" @click="switchToRegister">
          <h2>S'enregistrer</h2>
        </div>
      </div>
      <div class="tabs" v-if="mode == 'create'">
        <div class="tab connexion_tab" @click="switchToLogin">
          <h2>Connexion</h2>
          
        </div>
        <div class="tab register_tab">
          <h2 class="activ">S'enregistrer</h2>
        </div>
      </div>
      <div class="form" autocomplete="off">
          <input autocomplete="false" name="hidden" type="text" style="display:none;">
        <div class="emailField">
          <input v-model="email" type="text" name="email" placeholder="Email" autocomplete="off" />
        </div>
        
        <div class="passwordField">
            <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Mot de passe"
            autocomplete="off"
            />
            <p class="regexAlert" v-if="mode == 'create'" >
              minimum 7 caractères
            </p>
        </div>
        

        <button
          @click="login"
          class="submit"
          type="submit"
          v-if="mode == 'login'"
        >
          <span v-if="status === 'loading'">Connexion en cours...</span>
          <span v-else>Se connecter</span>
        </button>
        
        <button
          @click="createAccount"
          class="submit"
          type="submit"
          v-if="mode == 'create'"
        >
          S'enregistrer
        </button>
      </div>
    </div>
    <div class="error_msg" v-if="mode == login && status == 'error_login'">
      <p>Adresse mail et/ou mot de passe invalide</p>
    </div>
    <div class="error_msg" v-if="mode == create && status == 'error_create'">
      <p>Adresse mail déjà utilisée</p>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  data: function () {
    return {
      API_SERVICE_URL: process.env.API_SERVICE_URL,
      mode: "login",
      email: "",
      password: "",
      regexEmail: /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/,
      regexPassword: /.[^"'`]{7,}/,
    };
  },
  mounted: function () {
    if (this.$store.state.user.id != -1) {
      this.$router.push("/posts");
      return;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToRegister: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      const self = this;
      if (!this.regexEmail.test(this.email)) {
        self.$toast.error("Email non valide");
        return;
      }
      if (!this.regexPassword.test(this.password)) {
        self.$toast.error("Sécurité du mot de passe insuffisante");
        return;
      }
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.$router.push("/posts");
          },
          function (error) {
            error.message == "Request failed with status code 400" ?
              self.$toast.error("Le mot de passe est incorrect"):
              self.$toast.error(error.message)
           console.log(error)
          }
        );
    },
    createAccount: function () {
      const self = this;
      if (!this.regexEmail.test(this.email)) {
        self.$toast.error("Email non valide");
        return;
      }
      if (!this.regexPassword.test(this.password)) {
        self.$toast.error("Sécurité du mot de passe insuffisante");
        return;
      }
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
           
            self.login();

            self.$router.push("/posts");
          },
          function (error) {
            error.message == "Request failed with status code 422" ?
              self.$toast.error("Adresse mail déja enregistrée"):
              self.$toast.error(error.message)
              console.log(error);
            }
            
          
        );
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/_vars.scss';

/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
.hero {
  height: 400px;
  width: 100%;
  background-image: url("../assets/icon-left-font.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 20% 50%;
 }
.login_section {
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  display: flex;
  border-radius: 0 15px 15px 15px;
  box-shadow: 5px 7px 15px -5px $thirdColor;
  padding: 20% 20% 10% 20%;
  flex-direction: column;
  justify-content: space-around;
  height: 250px;
}

.passwordField{
  position: relative;
}

.regexAlert{
  position: absolute;
  color: black;
  bottom : -35px;
 
  
}
.tabs {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.tab {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
h2 {
  color: $thirdColor;
}
.activ {
  color: $primaryColor;
}
input {
  font-family: "raleway";
  height: 45px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid $primaryColor;
  background-color: white;
}
.submit {
  border: none;
  background-color: $primaryColor;
  border-radius: 8px;
  padding: 4%;
  font-family: "Raleway", sans-serif;
  font-size: 18px;
  color: white;
  align-self: flex-end;
}

.submit:hover{
  background-color: $thirdColor;
}

.disabled {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

@media (max-width: 700px) {
  .form{
    box-shadow: none;
    padding:0;
  }
  .hero{
    background-position: 70% 50%;;
  }
  
  
}
</style>
