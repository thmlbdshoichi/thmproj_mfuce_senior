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
                  <div v-if="divUnselected" class="streva  " align="center" justify="center">
                    <div class="titlehd">SERVICE EVALUATION</div><br>
                    <div class="box-select elevation-12">
                        <div align="center">
                          <v-container fluid >
                              <v-col >
                                <v-select 
                                v-model="divTagIndex" 
                                :items="divisionLists" 
                                item-text="divName" 
                                item-value="divTag" 
                                label="เลือกแผนกที่ต้องการประเมิน" 
                                outlined></v-select>
                                <v-btn block large x-large outlined color="#BC8E5D" dark @click.prevent="startQuiz()" class="font-weight-black">เริ่มทำการประเมิน</v-btn>
                              </v-col>
                          </v-container>
                        </div>
                    </div> 
                  </div>
                  <v-flex lg6 md>
                  <v-card class="elevation-12 box-question" v-if="divSelected" >
                    <v-card-text align="center">
                      <div v-for="(question, index) in specificQuestion" :key="index" >
                        <div v-show="index === questionIndex" >
                          <h4>{{ question.qSequence }} of {{ specificQuestion.length }}</h4><br>
                          <h2><v-icon medium color="#bc8e5d"> mdi-numeric-{{ question.qSequence }}-circle </v-icon>  
                          {{ question.qName }}</h2>
                            <br> 
                            <v-card-text>
                              <v-row>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-btn v-on:click="updateScore(questionIndex,1)" block large x-large color="#F9957F" depressed elevation="7" rounded class="worst font-weight-black" >
                                      WORST 
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-btn v-on:click="updateScore(questionIndex,2)" block large x-large color="#F7D7C2" depressed elevation="7" rounded class="moderate font-weight-black">
                                      MODERATE
                                    </v-btn>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-btn v-on:click="updateScore(questionIndex,3)" block large x-large color="#D4E6C4" depressed elevation="7" rounded class="good font-weight-black">
                                      GOOD 
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-btn v-on:click="updateScore(questionIndex,4)" block large x-large color="#ABCFD1" depressed elevation="7" rounded class="best font-weight-black" >
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
                                    <v-btn v-on:click="next()" small class="ma-2" outlined rounded color="#bc8e5d">
                                      ไปต่อ
                                    </v-btn>
                                  </div>
                                </v-col>
                              </v-row>
                          </v-card-text>
                        </div>
                      </div>
                      <!-- ข้อเสนอแนะ -->
                      <div v-show="questionIndex == specificQuestion.length" >
                        <h2> ข้อเสนอแนะ <v-icon right>mdi-pencil</v-icon></h2>
                        <br>
                        <template>
                          <v-textarea
                            v-model="evalResult.comment"
                            solo
                            name="input-7-4"
                            label="ช่วยให้หน่วยงานของเราให้บริการได้ดีขึ้น ด้วยการให้ข้อเสนอแนะที่นี่ :)"
                          ></v-textarea>
                          <v-row>
                            <v-col cols="6" sm="6" md="6"> 
                              <div class="addressmfu_left">
                                <v-btn v-if="questionIndex > 0" v-on:click="prev()"  small class="ma-2 btn-prev" outlined rounded color="#bc8e5d">
                                    ย้อนกลับ
                                </v-btn>
                              </div>
                            </v-col>
                            <v-col cols="6" sm="6" md="6">
                              <div class="addressmfu">
                                <v-btn rounded color="primary" dark @click="submit()">ส่ง</v-btn>
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
      <template>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            max-width="500"
            persistent
          >
            <v-card>
              <v-card-title class="text-h5 justify-center">ขอบคุณสำหรับการประเมินของคุณ<v-icon class="ml-2" medium color="green darken-1">mdi-checkbox-marked</v-icon></v-card-title>
              <v-card-text class="text-center">
                เราจะนำผลการประเมินของคุณไปใช้ในการปรับปรุงคุณภาพการให้บริการของเรา
                จะกลับไปหน้าหลักในอีก.. {{timerCount}} วินาที
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="close()">กลับไปหน้าแรก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
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

export default {
  data: () => ({
    image: bikeImg,
    dialog: false,
    timerCount: "",
    divUnselected: true,
    divSelected: false,
    divisionLists: [],
    divTagIndex: "",
    specificQuestion: [],
    questionIndex: 0,
    testscore: "",
    evalResult: {
      divTag: "",
      evalScore: [],
      comment: "",
    },

  }),
  watch: {
    divTagIndex(){
      this.evalResult.divTag = this.divTagIndex;
    },
    timerCount(val){
      if (val > 0) {
        setTimeout(() => {
            this.timerCount--;
        }, 1000);
      } else {
        this.dialog = false;
        this.$router.go();
      }
    },
  },
  methods: {
    async fetchItems() {
      const apiURLdivs = `${process.env.AXIOS_BASEURL}/api/divs`;
      await this.$axios.get(apiURLdivs).then(res => {this.divisionLists = res.data}).catch(err => { console.log(err) });
    },
    async fetchQuestions(){
      const apiURLSpecificQuestion = `${process.env.AXIOS_BASEURL}/api/questions/${this.divTagIndex}`
      await this.$axios.get(apiURLSpecificQuestion).then(res => {this.specificQuestion = res.data})
      .catch(err => { console.log(err) });
    },
    async startQuiz() {
      await this.fetchQuestions();
      this.divSelected = true;
      this.divUnselected = false;
      this.evalResult.evalScore = new Array(this.specificQuestion.length);
    },
    async updateScore(qidx, score) {
      await this.evalResult.evalScore.splice(qidx, 1, score);
      this.next();
    },
    next() {
      this.questionIndex ++;
    },
    prev() {
      this.questionIndex --;
    },
    close(){
      this.dialog = false;
      this.$router.go();
    },
    submit() {
      const apiURLevalResultCreate = `${process.env.AXIOS_BASEURL}/api/evalresults`;
      this.$axios.post(apiURLevalResultCreate, this.evalResult)
      .then(res => {this.dialog = true; this.timerCount = 5;})
      .catch(err => {this.createAlert(`เกิดข้อผิดพลาดขึ้นในการส่งผลการประเมิน - ${err}`, "error")});
    },
  },
  created(){
    this.fetchItems();
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
