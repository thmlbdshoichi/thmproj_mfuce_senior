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
          <v-card class="elevation-12 box-login">
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
                    <v-btn @click.prevent="startQuiz()"> Start Evaluation </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>

            <!--<v-card> -->
              <v-card-text v-if="selected" align="center">
                <div v-for="(question, index) in quiz.questions" :key="index" >
                  <div v-show="index == questionIndex" >
                    <h4>{{ question.qSequence }} of {{ quiz.questions.length }}</h4><br>
                    <h2><v-icon medium color="#bc8e5d"> mdi-numeric-{{ question.qSequence }}-circle </v-icon>  
                    {{ question.qName }}</h2>
                      <br> 
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6" md="6" lg="6">
                              <v-btn color="#F9957F" depressed elevation="7" large rounded class="worst">
                                WORST 
                              </v-btn>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" lg="6">
                              <v-btn color="#F7D7C2" depressed elevation="7" large rounded class="moderate">
                                MODERATE
                              </v-btn>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6" lg="6">
                              <v-btn color="#D4E6C4" depressed elevation="7" large rounded class="good">
                                GOOD 
                              </v-btn >
                          </v-col>
                          <v-col cols="12" sm="6" md="6" lg="6">
                              <v-btn color="#ABCFD1" depressed elevation="7" large rounded class="best" >
                                BEST
                              </v-btn>
                          </v-col>
                        </v-row>
                        <v-row >
                          <v-col cols="12" sm="6" md="6">
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <div class="addressmfu">
                              <br />
                               <v-btn v-if="questionIndex > 0" v-on:click="prev()"  class="ma-2 btn-prev" outlined rounded color="indigo">
                                prev
                              </v-btn>
                              <v-btn v-on:click="next()"  class="ma-2" outlined rounded color="indigo">
                                next
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                    </v-card-text>
                  </div>
                </div>
                <!-- ข้อเสนอแนะ -->
                <div v-show=" questionIndex == quiz.questions.length" >
                  <h2> ข้อเสนอแนะ </h2>
                  <br>
                    <template>
                     <v-textarea
                        solo
                        name="input-7-4"
                        label="กรุณาให้ข้อเสนอแนะ"
                      ></v-textarea>
                      <v-btn class="mr-4" @click="submit">
                        submit
                      </v-btn>
                    </template>
                </div>
              </v-card-text>
            </v-card>
          <!--</v-card> -->
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer dark padless class="ftcl">
        <div class="line"></div>
        <v-card-text>
          <v-row >
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
  </v-app>
</template>

<script>
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
        select: ['Division'],
        items: [
          'Division01',
          'Division02',
          'Division03',
        ],
        selected: false,
        quiz: quiz,
        questionIndex: 0,
      }
    },
  methods: {
    startQuiz () {
     // this.$store.dispatch('beginQuiz', this.Division)
     this.selected = true;
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

<style>
.question {
  margin-left: 10%;
  width: 100%;
  padding: 3%;
}
.worst {
  width: 100%;
}
.moderate {
  width: 100%;
}
.good {
  width: 100%;
}
.best {
  width: 100%;
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

.btn-prev-next {
  align-content: right;
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


