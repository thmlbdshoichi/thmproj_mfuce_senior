<template>
  <v-app>
    <div>
      <v-app-bar color="#881518" class="navbar">
        <img
          src="@/assets/image/logo.png"
          href="https://www.mfu.ac.th/mfu-landing-page.html"
          alt="Logo"
          class="iconmfu"
        />

        <div class="decoration">
          <div class="decoration-inside"></div>
        </div>
        &nbsp;&nbsp;&nbsp;

        <div>
          <center>
            <h6 class="title1">Service Evaluation</h6>

            <hr width="100%" size="1" />

            <h5 class="title2">Mae fah Luang University</h5>
          </center>
        </div>
      </v-app-bar>

      <!--body-->
      <div>
        <v-app
          id="inspire"
          class="bg-img"
          :style="{ backgroundImage: `url(${image})` }"
        >
          <v-main>
            <v-container fluid fill-height>
              <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12 box-login">
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      align="center"
                      justify="center"
                    >
                      <v-img align="center" justify="center">
                        <img
                          src="@/assets/image/logo.png"
                          class="logomfu"
                          align="center"
                        />
                      </v-img>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      align="center"
                      justify="center"
                    >
                      <v-toolbar-title
                        class="tbtitle"
                        align="center"
                        justify="space-around"
                        >Login
                      </v-toolbar-title>
                      <v-toolbar-title
                        class="tbtitle"
                        align="center"
                        justify="space-around"
                        >Welcome to Service Evaluation
                      </v-toolbar-title>
                    </v-col>
                    <v-card-text>
                      <v-form ref="formLoginuser" lazy-validation>
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              v-model="login.username"
                              prepend-icon="mdi-account"
                              color="gold"
                              label="ชื่อผู้ใช้"
                              type="text"
                              :rules="[
                                v => !!v || 'กรุณากรอกชื่อผู้ใช้งาน',
                                v =>
                                  /^[A-Za-z0-9]*$/.test(v) ||
                                  'ชื่อผู้ใช้งานต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น'
                              ]"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              v-model="login.password"
                              prepend-icon="mdi-lock"
                              color="gold"
                              label="รหัสผ่าน"
                              :type="showpwd ? 'text' : 'password'"
                              :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']"
                              :append-icon="showpwd ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="showpwd = !showpwd"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-row>
                        <v-col cols="12" sm="12" md="12" align="center" justify="center">
                          <v-btn
                            color="blue darken-1"
                            outlined
                            rounded
                            @click="userLogin"
                            ><v-icon left>mdi-login</v-icon>เข้าสู่ระบบ</v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-main>
        </v-app>
      </div>
      <div class="text-center">
        <v-snackbar v-model="snackbar" :timeout="10000">
          {{snacktext}}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = false; snacktext = ''"
            >
              ปิด
            </v-btn>
          </template>
        </v-snackbar>
      </div>

      <v-footer dark padless class="ftcl">
        <div class="line"></div>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <div class="namemfu">
                <br />
                มหาวิทยาลัยแม่ฟ้าหลวง<br />
                Mae Fah Luang University
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <div class="addressmfu">
                <br />
                333 Moo1, Thasud, Muang, Chiang Rai 57100<br />
                Tel: 0-5391-6000, 0-5391-7034 Fax: 0-5391-6034, 0-5391-7049<br />
                Mae Fah Luang University, Bangkok Office Tel: 0-2679-0038-9 Fax:
                0-2679-0038 <br /></div
            ></v-col>
          </v-row>
        </v-card-text>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import bikeImg from '../assets/image/bg.png'
export default {
  layout: 'login',
  props: {
    source: String
  },
  data: () => ({
    snackbar: false,
    snacktext: '',
    showpwd: false,
    image: bikeImg,
    login: {
      username: '',
      password: ''
    }
  }),
  middleware: ['auth'],
  methods: {
    userLogin() {
      if (this.$refs.formLoginuser.validate()) {
        this.$auth.loginWith('local', { data: {username: this.login.username, password: this.login.password}})
        .then(res => {
          //this.$axios.setToken('')
          if(this.$auth.user.role === "Admin"){
            this.$router.push({name: 'ListAccount'});
          } 
          else if(this.$auth.user.role === "Observer"){
            this.$router.push({name: 'Dashboard'});
          } else {
            
          }
        })
        .catch(err => {
          this.snackbar = true;
          this.snacktext = 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง';
        })
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');

#app {
  font-family: 'Kanit', sans-serif;
}

.tbtitle {
  font-family: 'Acme', sans-serif;
  font-size: 25px;
}
.headline {
  margin: auto;
  width: 70%;
  /*border: 1px solid #BC8E5D;*/
  padding: 1%;
  color: #881518;
  text-shadow: 0 0 0.3em #bc8e5d;
}

.start {
  text-shadow: 0 0 0.1em #16881c;
}

.v-application {
  background-color: #e2dcdc;
}

.message {
  color: #881518;
  font-size: 20px;
}

.box-login {
  height: auto;
  padding: 30px 30px 30px 30px;
}

.v-card {
  width: 100%;
}

.iconmfu {
  width: 35px;
  height: auto;
  margin-right: 5px;
  margin-left: 19px;
}

.addressmfu {
  float: right;
  text-align: right;
  font-size: 16px;
}
.namemfu {
  float: left;
  text-align: right;
  font-size: 16px;
}

.ftcl {
  background-color: #881518;
}

.line {
  height: 10px;
  width: 100%;
  background-color: #bc8e5d;
}
.title1 {
  color: #e7e5e5;
  font-size: 15px;
}
.title2 {
  color: #e7e5e5;
  font-size: 11px;
}

.bg-img {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #999;
}

.bg {
  height: 565px;
  width: 100%;
}

.cd {
  height: 512px;
}

.logomfu {
  height: auto;
  width: 140px;
}

.navbar {
  height: 50px;
  width: 100%;
}

.decoration {
  text-align: left;
}

.decoration .decoration-inside {
  height: 40px;
  width: 3px;
  background-color: rgb(188, 142, 93);
  display: block;
}

/* Portrait */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 1366px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1) {
  .navbar {
    display: none;
  }
  .ftcl {
    display: none;
  }
}

/* Landscape */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 1366px) 
  and (orientation: landscape) 
  and (-webkit-min-device-pixel-ratio: 1) {
  .navbar {
    display: none;
  }
  .ftcl {
    display: none;
  }
}
</style>
