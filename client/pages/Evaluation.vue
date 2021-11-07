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
        <v-app id="inspire" class="bg-img" :style="{ backgroundImage: `url(${image})` }">
          <v-main>
            <v-container fluid fill-height>
              <v-layout align-center justify-center>
                  <!--<v-card> -->
                  <div v-if="start_evlaution" class="streva  " align="center" justify="center">
                    <div class="titlehd">SERVICE EVALUATION</div><br>
                    <div class="box-select elevation-12">
                        <div align="center">
                          <v-container fluid >
                              <v-col >
                                <v-select v-model="results.divTag" :items="items" label="เลือกแผนกที่ต้องการประเมิน" outlined></v-select>
                                <v-btn block large x-large outlined color="#BC8E5D" dark @click.prevent="startQuiz()" class="font-weight-black">
                                    เริ่มทำการประเมิน
                                </v-btn>
                              </v-col>
                          </v-container>
                        </div>
                    </div> 
                  </div>
                  <v-flex lg6 md>
                  <v-card class="elevation-12 box-question" v-if="selected" >
                      <v-card-text align="center">
                        <div v-for="(question, index) in quiz.questions" :key="index" >
                          <div v-show="index === questionIndex" >
                            <h4>{{ question.qSequence }} of {{ quiz.questions.length }}</h4><br>
                            <h2><v-icon medium color="#bc8e5d"> mdi-numeric-{{ question.qSequence }}-circle </v-icon>  
                            {{ question.qName }}</h2>
                              <br> 
                              <v-card-text>
                                <v-row>
                                  <v-col cols="12" sm="6" md="6" lg="6">
                                      <v-btn  v-model="results.evalScore"  v-on:click="addScore1(), next()" block large x-large color="#F9957F" depressed elevation="7" rounded class="worst font-weight-black" >
                                        WORST 
                                      </v-btn>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6" lg="6">
                                      <v-btn   v-model="results.evalScore"  v-on:click="addScore2(), next()" block large x-large color="#F7D7C2" depressed elevation="7" rounded class="moderate font-weight-black">
                                        MODERATE
                                      </v-btn>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12" sm="6" md="6" lg="6">
                                      <v-btn   v-model="results.evalScore"  v-on:click="addScore3(), next()" block large x-large color="#D4E6C4" depressed elevation="7" rounded class="good font-weight-black">
                                        GOOD 
                                      </v-btn >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6" lg="6">
                                      <v-btn   v-model="results.evalScore"  v-on:click="addScore4(), next()" block large x-large color="#ABCFD1" depressed elevation="7" rounded class="best font-weight-black" >
                                        BEST
                                      </v-btn>
                                  </v-col>
                                </v-row>
                                <v-row >
                                  <v-col cols="6" sm="6" md="6"> 
                                    <div class="addressmfu_left">
                                      <v-btn v-if="questionIndex > 0" v-on:click="prev()"  small class="ma-2 btn-prev" outlined rounded color="#bc8e5d">
                                          ย้อนกลับ
                                      </v-btn>
                                    </div>
                                  </v-col>
                                  <v-col cols="6" sm="6" md="6">
                                    <div class="addressmfu">
                                      <v-btn v-on:click="next()"  small class="ma-2" outlined rounded color="#bc8e5d">
                                        ไปต่อ
                                      </v-btn>
                                    </div>
                                  </v-col>
                                </v-row>
                            </v-card-text>
                          </div>
                        </div>
                        <!-- ข้อเสนอแนะ -->
                        <div v-show=" questionIndex == quiz.questions.length" >
                          <h2> ข้อเสนอแนะ <v-icon right>mdi-pencil</v-icon> </h2>
                          <br>
                            <template>
                            <v-textarea
                                solo
                                name="input-7-4"
                                label="กรุณาให้ข้อเสนอแนะ........"
                              ></v-textarea>
                              <v-row >
                                  <v-col cols="6" sm="6" md="6"> 
                                    <div class="addressmfu_left">
                                      <v-btn v-if="questionIndex > 0" v-on:click="prev()"  small class="ma-2 btn-prev" outlined rounded color="#bc8e5d">
                                          ย้อนกลับ
                                      </v-btn>
                                    </div>
                                  </v-col>
                                  <v-col cols="6" sm="6" md="6">
                                    <div class="addressmfu">
                                     <v-btn rounded color="primary"  dark @click="submit">
                                        ส่ง
                                    </v-btn>
                                    </div>
                                  </v-col>
                                </v-row>                         
                            </template>
                        </div>
                      </v-card-text>
                    </v-card>
                  <!--</v-card> -->
                </v-flex>
              </v-layout>
            </v-container>
          </v-main>
        </v-app>
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
  import bikeImg from '../assets/image/eva.png'
  // ทดสอบ (ตัวอย่างข้อมูล)
  let quiz = {
      title: 'My Quiz',
      questions: [{
          qSequence: 1,
          qName: "What is your pet name?",
          divTag: "C0",
        },
        {
          qSequence: 2,
          qName: "How old are you?",
          divTag: "C1",
        },
        {
          qSequence: 3,
          qName: "Where did you go last year?",
          divTag: "C2",
        },
        {
          qSequence: 4,
          qName: "Pad Thai อร่อยไหม?",
          divTag: "C3",
        },
      ]
    } //

export default {
  data () {
      return {
        image: bikeImg,
        select: ['Division'],
        items: [
          'Division01',
          'Division02',
          'Division03',
        ],
        start_evlaution: true,
        selected: false,
        quiz: quiz,
        questionIndex: 0,
        results:[{
          divTag: "",
          quesTag: "",
          evalScore: "",
         }],
        nextresultquesTag: 1,

      }
    },
  methods: {
    addScore1() {
      this.results.push({
        quesTag: this.nextresultquesTag++,
        evalScore: this.score = 1,
      })
      this.score = ''
    }, 
    addScore2() {
      this.results.push({
        quesTag: this.nextresultquesTag++,
        evalScore: this.score = 2
      })
      this.score = ''
    }, 
    addScore3() {
      this.results.push({
        quesTag: this.nextresultquesTag++,
        evalScore: this.score = 3 
      })
      this.score = ''
    }, 
    addScore4() {
      this.results.push({
        quesTag: this.nextresultquesTag++,
        evalScore: this.score = 4
      })
      this.score = ''
    }, 

    startQuiz () {
     // this.$store.dispatch('beginQuiz', this.Division)
     this.selected = true;
     this.start_evlaution = false;
    },
    next (){
      this.questionIndex ++;
    },

    prev () {
      this.questionIndex --;
    },
    submit () {
     // something ...
    },
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

.box-question {
  height: auto;
  padding: 30px 30px 30px 30px;
}
.box-select {
  background: #ffffff;
  height: auto;
  width: auto;
  border-radius: 12px;

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
.addressmfu_left{
  float: left;
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

.question {
  margin-left: 10%;
  width: 100%;
  padding: 3%;
}
.worst {
  width: 100%;
  color: #fffdfd;
}
.moderate {
  width: 100%;
  color: #fffdfd;
}
.good {
  width: 100%;
  color: #fffdfd;
}
.best {
  width: 100%;
  color: #fffdfd;
}

.btn-prev-next {
  align-content: right;
}
.streva{
  height: auto;
  position: absolute;
}
.titlehd{
  font-family: 'Acme', sans-serif;
  font-size: 40px;
  color: #000000;
  text-shadow: 2px 2px 5px rgb(128, 124, 124);
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
