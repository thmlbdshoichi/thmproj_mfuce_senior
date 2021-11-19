<template>
  <v-app>
    <div>
      <v-app-bar color="#881518" class="navbar">
        <img src="@/assets/image/logo.png" href="https://www.mfu.ac.th/mfu-landing-page.html" alt="Logo" class="iconmfu" />
        <div class="decoration">
            <div class="decoration-inside"></div>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div>
            <center>
                <h6 class="title1">Service Evaluation</h6>
                <hr width="100%" size="1"/>
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
                <v-flex lg6 md10 sm12 xs12>
                  <div v-if="divUnselected" align="center" justify="center">
                    <div align-center justify-center class="gg elevation-12">
                      <br/>
                      <v-img align="center" justify="center">
                          <img src="@/assets/image/evaluation.png" class="logomfu" align="center" />
                      </v-img>
                      <br/>
                      <div class="box-select">
                        <div align="center">
                          <v-container fluid>
                            <v-col>
                              <h3 class="tbtitle" align="center" justify="space-around">แบบประเมินความพึงพอใจ</h3>
                              <br/>
                              <v-select 
                                v-model="divTagIndex" 
                                :items="divisionLists" 
                                item-text="divName" 
                                item-value="divTag" 
                                label="เลือกแผนกที่ต้องการประเมิน" 
                                color="gold" 
                                background-color="#F8F5FD"
                                outlined></v-select>
                              <v-btn rounded block x-large class="btn_st_color" elevation="8" color="#881518" @click.prevent="startQuiz()">เริ่มทำการประเมิน<v-icon small>mdi-arrow-right-circle</v-icon></v-btn>
                            </v-col>
                          </v-container>
                        </div>
                      </div>
                    </div>
                  </div>
                  <template>
                    <v-card flat v-if="divSelected">
                      <v-window v-model="onboarding">
                        <v-window-item v-for="n in length" :key="n">
                          <template>
                            <v-card color="basil" flat>
                              <div v-if="divSelected">
                                <v-container>
                                  <v-card-text align="center">
                                    <div v-for="( question, index ) in specificQuestion" :key="index">
                                      <div v-show="index === questionIndex">
                                        <template>
                                          <v-progress-linear rounded striped color="indigo" height="13" :value="(question.qSequence / specificQuestion.length) * 100"></v-progress-linear>
                                          <v-card-text align="center">{{ question.qSequence }} / {{ specificQuestion.length }}</v-card-text>
                                        </template>
                                        <h2>
                                          <v-icon large color="#bc8e5d" class="mr-2">mdi-numeric-{{ question.qSequence }}-circle</v-icon>{{ question.qName }}
                                        </h2>
                                        <br/>
                                        <v-card-text>
                                          <v-row>
                                            <v-col cols="12" sm="6" md="6" lg="6" align="center" justify="center">
                                              <v-card v-on:click="updateScore(questionIndex, 1)" color="#DB4437" class="box_sl worst">
                                                <v-card-text class="answercard">
                                                  <br/>
                                                  <img src="@/assets/image/bad2.png" alt="worst" class="img_sl" />
                                                  <h2>แย่</h2>
                                                  <br/>
                                                </v-card-text>
                                              </v-card>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" lg="6" align="center" justify="center">
                                              <v-card v-on:click="updateScore(questionIndex, 2)" color="#F4B400" class="box_sl moderate">
                                                <v-card-text class="answercard">
                                                  <br/>
                                                  <img src="@/assets/image/moderate2.png" alt="moderate" class="img_sl" />
                                                  <h2>พอใช้</h2>
                                                  <br/>
                                                </v-card-text>
                                              </v-card>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" lg="6" align="center" justify="center">
                                              <v-card v-on:click="updateScore(questionIndex, 3)" color="#4285F4" class="box_sl good">
                                                <v-card-text class="answercard">
                                                  <br/>
                                                  <img src="@/assets/image/best2.png" alt="good" class="img_sl" />
                                                  <h2>ดี</h2>
                                                  <br/>
                                                </v-card-text>
                                              </v-card>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" lg="6" align="center" justify="center">
                                              <v-card v-on:click="updateScore(questionIndex, 4)" color="#0F9D58" class="box_sl best">
                                                <v-card-text class="answercard">
                                                  <br/>
                                                  <img src="@/assets/image/good2.png" alt="best" class="img_sl" />
                                                  <h2>ดีมาก</h2>
                                                  <br/>
                                                </v-card-text>
                                              </v-card>
                                            </v-col>
                                            <v-overlay :value="overlay">
                                              <v-progress-circular indeterminate size="64"></v-progress-circular>
                                            </v-overlay>
                                          </v-row>
                                        </v-card-text>
                                      </div>
                                    </div>
                                    <div v-show="questionIndex == specificQuestion.length">
                                      <h2>ข้อเสนอแนะ<v-icon right>mdi-pencil</v-icon></h2>
                                      <br/>
                                      <template>
                                        <v-textarea
                                        v-model="evalResult.comment"
                                        name="input-7-4" 
                                        rows="15"
                                        label="ช่วยให้หน่วยงานของเราให้บริการได้ดีขึ้น ด้วยการให้ข้อเสนอแนะที่นี่ :)"
                                        solo counter></v-textarea>
                                      </template>
                                    </div>
                                  </v-card-text>
                                </v-container>
                              </div>
                            </v-card>
                          </template>
                        </v-window-item>
                      </v-window>
                      <v-card-text>
                        <v-row>
                          <v-col cols="6" sm="6" md="6">
                            <div class="addressmfu_left">
                              <v-icon large color="#bc8e5d" v-if="questionIndex > 0" v-on:click="prev()" class="ma-2 btn-prev">mdi-chevron-left</v-icon>
                            </div>
                          </v-col>
                          <v-col cols="6" sm="6" md="6">
                            <div class="addressmfu">
                              <v-icon v-if="questionIndex < specificQuestion.length" large color="#bc8e5d" v-on:click="next()" class="ma-2">mdi-chevron-right</v-icon>
                            </div>
                            <div class="addressmfu">
                              <v-btn v-if="questionIndex >= specificQuestion.length" rounded color="primary" dark @click="submit()">ส่ง</v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-flex>
              </v-layout>
            </v-container>
          </v-main>
        </v-app>
      </div>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" max-width="500" persistent>
            <v-card align="center" justify="center">
              <v-card-text>
                <br/>
                <v-img align="center" justify="center">
                  <img src="@/assets/image/check.png" class="check-logo" align="center" />
                </v-img>
                <v-card-title class="text-h5 justify-center">ขอบคุณสำหรับการประเมินของคุณ<v-icon class="ml-2" medium color="green darken-1">mdi-checkbox-marked</v-icon></v-card-title>
                <v-card-text class="text-center">
                  เราจะนำผลการประเมินของคุณไปใช้ในการปรับปรุงคุณภาพการให้บริการของเรา
                  จะกลับไปหน้าหลักในอีก.. {{ timerCount }} วินาที
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="close()">กลับไปหน้าแรก</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog2" max-width="700" persistent>
            <v-card>
              <v-card-text>
                <br/>
                <v-img align="center" justify="center">
                  <img src="@/assets/image/error.png" class="check-logo" align="center" />
                </v-img>
                <v-card-title class="text-h6 justify-center">โปรดเลือกคะแนนความพึงพอใจให้ครบทุกข้อ</v-card-title>
                <v-card-text class="text-center">{{evalResult.evalScore}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog2 = false">ปิด</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog3" max-width="700" persistent>
            <v-card>
              <br/>
              <v-img align="center" justify="center">
                <img src="@/assets/image/error.png" class="check-logo" align="center" />
              </v-img>
              <v-card-text>
                <v-card-title class="text-h6 justify-center">
                  โปรดเลือกหน่วยงานที่ท่านต้องการประเมิน - คำถามไม่พร้อมใช้งาน
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog3 = false">ปิด</v-btn>
                </v-card-actions>
              </v-card-text>
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
                  <br/>
                  มหาวิทยาลัยแม่ฟ้าหลวง<br/>
                  Mae Fah Luang University
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="addressmfu">
                  <br/>
                  333 Moo1, Thasud, Muang, Chiang Rai 57100<br/>
                  Tel: 0-5391-6000, 0-5391-7034 Fax: 0-5391-6034, 0-5391-7049<br/>
                  Mae Fah Luang University, Bangkok Office Tel: 0-2679-0038-9 Fax:
                  0-2679-0038 <br/>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import bikeImg from '../assets/image/bg.png'
export default {
  data: () => ({
      image: bikeImg,
      dialog: false,
      dialog2: false,
      dialog3: false,
      overlay: false,
      timerCount: '',
      divUnselected: true,
      divSelected: false,
      divisionLists: [],
      divTagIndex: '',
      specificQuestion: [],
      questionIndex: 0,
      testscore: '',
      evalResult: {
          divTag: '',
          evalScore: [],
          comment: '',
      },
      length: 5,
      onboarding: 0,
  }),
  watch: {
      divTagIndex() {
          this.evalResult.divTag = this.divTagIndex
      },
      timerCount(val) {
          if (val > 0) {setTimeout(() => {this.timerCount--}, 1000)
          } else {
              this.dialog = false
              this.$router.go()
          }
      },
  },
  methods: {
      async fetchItems() {
          const apiURLdivs = `${process.env.AXIOS_BASEURL}/api/divs`
          await this.$axios.get(apiURLdivs).then((res) => {this.divisionLists = res.data}).catch((err) => {console.log(err)})
      },
      async fetchQuestions() {
          const apiURLSpecificQuestion = `${process.env.AXIOS_BASEURL}/api/questions/${this.divTagIndex}`
          await this.$axios.get(apiURLSpecificQuestion).then((res) => {this.specificQuestion = res.data}).catch((err) => {console.log(err)})
          this.qsIndex = this.qs
      },
      async startQuiz() {
          if(this.divTagIndex) {
              await this.fetchQuestions()
              if(this.specificQuestion.length != 0){
                this.divSelected = true
                this.divUnselected = false
                this.evalResult.evalScore = new Array(this.specificQuestion.length)
              } else {
                this.dialog3 = true
              }
          } else { 
              this.dialog3 = true
          }
      },
      async updateScore(qidx, score) {
          await this.evalResult.evalScore.splice(qidx, 1, score)
          this.next()
      },
      next() {
          this.questionIndex++
          this.onboarding = this.onboarding + 1
      },
      prev() {
          this.questionIndex--
          this.onboarding = this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1
      },
      close() {
          this.dialog = false
          this.$router.go()
      },
      submit() {
          if (!this.evalResult.evalScore.includes(undefined)) {
            const apiURLevalResultCreate = `${process.env.AXIOS_BASEURL}/api/evalresults`
            this.$axios.post(apiURLevalResultCreate, this.evalResult).then((res) => {
              this.dialog = true 
              this.timerCount = 5 }).catch((err) => {
                    this.createAlert(
                        `เกิดข้อผิดพลาดขึ้นในการส่งผลการประเมิน - ${err}`,
                        'error'
                    )
                })
          } else { this.dialog2 = true}
      },
  },
  created() {
      this.fetchItems()
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');

#app {
  font-family: 'Kanit', sans-serif;
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

.box-select {
  padding-left: 25px;
  padding-right: 25px;
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

.addressmfu_left {
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

.check-logo {
  height: 60%;
  width: auto;
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

.answercard > h2 {
color: #FFFFFF
}

.worst {
  width: 100%;
  color: #fffdfd;
}

.worst :hover {
  background-color: #E57360;
}

.moderate {
  width: 100%;
  color: #fffdfd;
}

.moderate :hover {
  background-color: #FBCB43;
}

.good {
  width: 100%;
  color: #fffdfd;
}

.good :hover {
  background-color: #76A7FA;
}

.best {
  width: 100%;
  color: #fffdfd;
}

.best :hover {
  background-color: #33B679;
}

.btn-prev-next {
  align-content: right;
}

.btn_st_eva {
  width: 50%;
}

.titlehd {
  font-family: 'Acme', sans-serif;
  font-size: 40px;
  color: #000000;
  text-shadow: 2px 2px 5px rgb(128, 124, 124);
}

.box_sl {
  border-radius: 12px;
  width: 100%;
}

.img_sl {
  height: auto;
  width: 30%;
}

.gg {
  border-radius: 20px;
  align-content: center;
  justify-content: center;
  padding: 15px 15px 15px 15px;
  background: linear-gradient(-50deg, rgb(231, 230, 230), rgb(255, 255, 255));
}

.btn_st_color {
  color: #ffffff;
}

.crop {
  width: 50%;
}

/* Portrait */
@media only screen and (min-device-width: 375px) and (max-device-width: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) {
  .navbar {
      display: none;
  }

  .ftcl {
      display: none;
  }
}

/* Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 1366px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
  .navbar {
      display: none;
  }

  .ftcl {
      display: none;
  }
}
</style>
