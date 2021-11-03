<template>
  <v-app>
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

    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex lg7 md>
          <v-card color="#F6EEE0" class="elevation-12 box-login">
            <div class="header">
              <h1>Service Evaluation</h1>
            </div>
            <div align="center">
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-combobox
                      v-model="select"
                      :items="items"
                      label="Select Division"
                      outlined
                      dense
                    ></v-combobox>
                    <v-btn @click.prevent="startQuiz()">Start Evaluation</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <v-card-text>
              <div class="question">
                <v-row align="center">
                  <h3>Question:</h3>
                  <v-col cols="8">
                    <v-text-field label="xxxxxxxxxxxxxxxx" solo></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div align="center">
                <v-btn
                  color="#F9957F"
                  depressed
                  elevation="7"
                  large
                  rounded
                  class="worst"
                >
                  WORST </v-btn
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <v-btn
                  color="#F7D7C2"
                  depressed
                  elevation="7"
                  large
                  rounded
                  class="moderate"
                >
                  MODERATE
                </v-btn>

                <br /><br />
                <v-btn
                  color="#D4E6C4"
                  depressed
                  elevation="7"
                  large
                  rounded
                  class="good"
                >
                  GOOD </v-btn
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn
                  color="#ABCFD1"
                  depressed
                  elevation="7"
                  large
                  rounded
                  class="best"
                >
                  BEST
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer dark padless class="ftcl">
      <div class="line"></div>
      <v-card-text>
        <div class="namemfu">
          <br />
          มหาวิทยาลัยแม่ฟ้าหลวง<br />
          Mae Fah Luang University
        </div>

        <div class="addressmfu">
          <br />
          333 Moo1, Thasud, Muang, Chiang Rai 57100<br />
          Tel: 0-5391-6000, 0-5391-7034 Fax: 0-5391-6034, 0-5391-7049<br />
          Mae Fah Luang University, Bangkok Office Tel: 0-2679-0038-9 Fax:
          0-2679-0038 <br />
        </div>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
      return {
        select: ['Division'],
        items: [
          'Division01',
          'Division01',
          'Division01',
        ],
      }
    },
  data: () => ({
    first: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  }),
}
</script>

<style>
.question {
  margin-left: 10%;
  width: 100%;
  padding: 3%;
}
.worst {
  width: 250px;
}
.moderate {
  width: 250px;
}
.good {
  width: 250px;
}
.best {
  width: 250px;
}

.box-login {
  height: auto;
  padding: 30px 30px 30px 30px;
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

.logomfu {
  height: auto;
  width: 180px;
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

.header {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>


