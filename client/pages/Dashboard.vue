<template>
  <div>
    <v-card>
    <v-card-title>
      <!--  เลือกหน่วยงาน --> 
        <v-col cols="12" sm="6" md="6" lg="6">
          <v-icon medium color="#bc8e5d"> mdi-numeric-1-circle </v-icon>
          เลือกหน่วยงานที่ต้องการ
          <v-select 
          @change="changeSelect1" 
          v-model="divTagIndex" 
          @input="fetchQuestion()"
          :items="userResDiv" 
          :item-text="item => item.divTag +' - '+ item.divName"
          item-value="divTag" 
          prepend-icon="mdi-magnify" 
          single-line hide-details></v-select>
        </v-col>
      
      <!--เลือกคำถาม --> 
        <v-col cols="12" sm="6" md="6" lg="6" v-if="select1" >
          <v-icon medium color="#bc8e5d"> mdi-numeric-2-circle </v-icon>
          เลือกคำถามที่ต้องการ
          <v-select 
          @change="changeSelect2" 
          v-model="qSequenceIndex"
          @input="statOneQuestionScore()"
          :items="specificQuestion" 
          :item-text="item => item.qSequence +' - '+ item.qName"
          item-value="qSequence" 
          prepend-icon="mdi-magnify" 
          single-line hide-details></v-select>
        </v-col>
      </v-card-title>
    </v-card>
    <br>

    <div>
      <v-row>
        <!--  กล่อง1 --> 
          <v-col cols="12" sm="6" md="6" lg="6"  align="center" justify="center">
            <v-card color="#FFFFFF">  
              <v-card-text class="box1">
                <h1>ทั้งหมด</h1>
                <br>
                  <h1>{{resDivResults.length}} ผลลัพธ์</h1>
                  <h3>ในทุกหน่วยงานที่คุณรับผิดชอบ</h3>
              </v-card-text>
            </v-card>
          </v-col>
        
        <!--กล่อง2--> 
          <v-col cols="12" sm="6" md="6" lg="6" align="center" justify="center" >
            <v-card color="#bc8e5d">
              <v-card-text class="box2">
                <h1>ทั้งหมด</h1>
                <br>
                <h1>{{specificResultsLength}} ผลลัพธ์</h1>
                <h3>ในหน่วยงานที่คุณเลือก</h3>
              </v-card-text>
            </v-card>
          </v-col>
      </v-row>
    </div>
    <br>

    <v-card>
      <v-card-title>
        <!--เลือกระยะเวลาที่ต้องการดู --> 
        <!-- v-if="selected" -->
        <v-col cols="12" sm="12" md="12" lg="12" >
          <v-icon medium color="#bc8e5d">mdi-clock-time-three-outline </v-icon> เลือกระยะเวลาที่ต้องการดู
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" >
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDateTimeSelected"
                    label="ตั้งแต่"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-card>
                  <v-date-picker
                    v-model="startDateTime.date"
                    color="#bc8e5d"
                    scrollable
                  >
                  </v-date-picker>
                  <v-time-picker
                    v-model="startDateTime.time"
                    format="24hr"
                    use-seconds
                    color="#bc8e5d"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="#bc8e5d" @click="clearStartDate">ล้างข้อมูล</v-btn>
                    <v-btn text color="#bc8e5d" @click="menu1 = false">ปิด</v-btn>
                  </v-time-picker>
                </v-card>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" >
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDateTimeSelected"
                    label="จนถึง"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-card>
                  <v-date-picker
                    v-model="endDateTime.date"
                    color="#bc8e5d"
                    scrollable
                  >
                  </v-date-picker>
                  <v-time-picker
                    v-model="endDateTime.time"
                    format="24hr"
                    use-seconds
                    color="#bc8e5d"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="#bc8e5d" @click="clearEndDate">ล้างข้อมูล</v-btn>
                    <v-btn text color="#bc8e5d" @click="menu2 = false">ปิด</v-btn>
                  </v-time-picker>
                </v-card>
              </v-menu>
            </v-col>
            </v-row>
        </v-col>
        <v-col>
          <v-btn block :loading="searchButtonloading" :disabled="searchButtonloading" color="success" @click="searchButtonloader = 'searchButtonloading'">
            <v-icon left>mdi-file-find</v-icon>ค้นหา
          </v-btn>
        </v-col>
      </v-card-title>
    </v-card>
    <br>
      <v-card :color="satisfyStats.color" v-if="satisfyStats.show">  
        <v-col cols="12" sm="12" md="12" lg="12"  align="center" justify="center">
        <v-card-text class="box2">
          <h1>ผู้มาใช้บริการรู้สึก "{{satisfyStats.text}}"</h1>
          <v-icon color="#FFFFFF" class="mt-3 mb-3" x-large>{{satisfyStats.icon}}</v-icon>
            <h2>คะแนนความพึงพอใจเฉลี่ย {{this.satisfyStats.score}}</h2>
        </v-card-text>
        </v-col>
      </v-card>
    
    <br>
    <v-alert :type="alertbox.type" transition="fade-transition" :value="alertbox.alert" dismissible>{{alertbox.msg}}</v-alert>
    <!-- graph -->
    <v-card>
      <v-card-text>
        <v-col md="12" v-if="overview">
          <v-card-title> 
            <v-icon class="mr-4" medium color="#bc8e5d">mdi-chart-bar</v-icon>สรุปคะแนนความพึงพอใจของหน่วยงานทั้งหมดที่รับผิดชอบ
          </v-card-title>
          <br>
          <v-row>
            <v-col cols="1" sm="1" md="1" lg="1"></v-col>
            <v-col cols="10" sm="10" md="10" lg="10">
              <v-card>
                <bar-chart
                  :chartData="barchartScoreResDivData"
                  :options="barchartoptions"
                />
              </v-card>
              <v-row class="mt-1">
                <v-col class="text-center" cols="12" sm="12" md="12" lg="12">
                  <h3>
                    <v-icon medium color="primary">mdi-information</v-icon>
                    คะแนน: 1.00-1.99 ไม่พึงพอใจ(แย่), 2.00-2.99 เฉยๆ(ปานกลาง), 3.00-3.50 พึงพอใจ(ดี), 3.51-4.00 พึงพอใจมาก(ดีมาก)
                  </h3>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" sm="1" md="1" lg="1"></v-col>
          </v-row>
        </v-col>
        <!-- graph by each quesions-->
        <template>
          <v-item-group v-if="anyquesion">
            <v-container>
              <v-card-title>
                <v-icon class="mr-4" medium color="#bc8e5d">mdi-chart-bar</v-icon>
                สรุปคะแนนความพึงพอใจของหน่วยงาน {{divSelected[0].divTag}} - "{{divSelected[0].divName}}"
              </v-card-title>
              <br>
              <v-row>
                <v-col cols="1" sm="1" md="1" lg="1"></v-col>
                <v-col cols="10" sm="10" md="10" lg="10">
                  <v-card class="g-quesion d-flex align-center">
                    <v-card-text>
                      <bar-chart 
                        :chartData="barchartScoreAllQData"
                        :options="barchartoptions"
                      />
                    </v-card-text>
                  </v-card>
                  <v-row class="mt-1">
                    <v-col class="text-center" cols="12" sm="12" md="12" lg="12">
                      <h3>
                        <v-icon medium color="primary">mdi-information</v-icon>
                        คะแนน: 1.00-1.99 ไม่พึงพอใจ(แย่), 2.00-2.99 เฉยๆ(ปานกลาง), 3.00-3.50 พึงพอใจ(ดี), 3.51-4.00 พึงพอใจมาก(ดีมาก)
                      </h3>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="1" sm="1" md="1" lg="1"></v-col>
              </v-row>
              <v-row class="mb-5">
                <v-col cols="1" sm="1" md="1" lg="1"></v-col>
                <v-col cols="10" sm="10" md="10" lg="10">
                  <v-card block class="mx-auto mt-10">
                    <v-toolbar class="text-center" color="info" dark>
                      <v-icon medium color="#FFFFFF">mdi-information</v-icon>
                      <h3 class="ml-2 mr-2">ข้อเสนอแนะ (Comments)</h3>
                    </v-toolbar>
                    <v-list style="max-height: 500px" class="overflow-y-auto">
                      <template v-for="(comment, index) in resultsDivComments">
                        <v-divider
                          :key="index"
                        ></v-divider>
                        <v-list-item
                          :key="comment"
                        >
                          <v-list-item-avatar>
                            <v-img src="/comments.png" alt='students'></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title v-html="comment"></v-list-item-title>
                            
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card>
                </v-col>
                <v-col cols="1" sm="1" md="1" lg="1"></v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </template>
        <!-- graph with one quesion-->
        <v-col md="12" v-if="onequesion"> 
          <v-card-title>
            <v-icon medium color="#bc8e5d">mdi-chart-bar</v-icon> 
            กราฟแสดงสถิติความพึงพอใจในคำถามที่ {{qSelected[0].qSequence}} - "{{qSelected[0].qName}}"
          </v-card-title>
          <br>
          <v-row>
            <v-col cols="1" sm="1" md="1" lg="1"></v-col>
            <v-col cols="10" sm="10" md="10" lg="10">
              <v-card>
                <bar-chart
                  :chartData="barchartScoreEachQData"
                  :options="barchartoptions2"
                />
              </v-card>
              <v-row class="mt-1">
                <v-col class="text-center" cols="12" sm="12" md="12" lg="12">
                  <h3>
                    <v-icon medium color="primary">mdi-information</v-icon>
                    คำอธิบาย: Y-axis จำนวนคนที่โหวตให้กับคำถามนี้, X-axis ระดับความพึงพอใจ (แย่, ปานกลาง, ดี, ดีมาก)
                  </h3>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" sm="1" md="1" lg="1"></v-col>
          </v-row>
        </v-col>
      </v-card-text>
    </v-card>  
  </div>
</template>

<script>
import BarChart from "../components/BarChart.js";

export default {
  layout: "user",
  middleware: ['auth'],
  components: { BarChart },
  data: () => ({
    // BARCHART OF OVERALL SCORE DIVISIONS
    barchartScoreResDivData: {
      labels: [],
      datasets: [
        {
          label: "คะแนนความพึงพอใจ",
          data: [],
          backgroundColor: [
            "rgba(66,133,244,0.9)",
            "rgba(219,68,55,0.9)",
            "rgba(244,180,0,0.9)",
            "rgba(15, 157, 88,0.9)",
            "rgba(255,90,95,0.9)",
            "rgba(255,153,0,0.9)",
            "rgba(120,194,87,0.9)",
            "rgba(66,103,178,0.9)",
            "rgba(255, 252, 0,0.9)",
            "rgba(30,215,96,0.9)",
            "rgba(0,178,255,0.9)",
            "rgba(229,9,20,0.9)",
          ],
          borderColor: [
            "rgba(66,133,244,1)",
            "rgba(219,68,55,1)",
            "rgba(244,180,0,1)",
            "rgba(15, 157, 88,1)",
            "rgba(255,90,95,1)",
            "rgba(255,153,0,1)",
            "rgba(120,194,87,1)",
            "rgba(66,103,178,1)",
            "rgba(255, 252, 0,1)",
            "rgba(30,215,96,1)",
            "rgba(0,178,255,1)",
            "rgba(229,9,20,1)",
          ],
          borderWidth: 3,

        }
      ],
    },
    //
    // BARCHART OF OVERALL SCORE QUESTIONS
    barchartScoreAllQData: {
      labels: [],
      datasets: [
        {
          label: "คะแนนความพึงพอใจ",
          data: [],
          backgroundColor: [
            "rgba(229,9,20,0.9)",
            "rgba(0,178,255,0.9)",
            "rgba(30,215,96,0.9)",
            "rgba(255, 252, 0,0.9)",
            "rgba(66,103,178,0.9)",
            "rgba(120,194,87,0.9)",
            "rgba(255,153,0,0.9)",
            "rgba(255,90,95,0.9)",
            "rgba(15, 157, 88,0.9)",
            "rgba(244,180,0,0.9)",
            "rgba(219,68,55,0.9)",
            "rgba(66,133,244,0.9)",
            
          ],
          borderColor: [
            "rgba(229,9,20,1)",
            "rgba(0,178,255,1)",
            "rgba(30,215,96,1)",
            "rgba(255, 252, 0,1)",
            "rgba(66,103,178,1)",
            "rgba(120,194,87,1)",
            "rgba(255,153,0,1)",
            "rgba(255,90,95,1)",
            "rgba(15, 157, 88,1)",
            "rgba(244,180,0,1)",
            "rgba(219,68,55,1)",
            "rgba(66,133,244,1)",
            
          ],
          borderWidth: 3,
        },
      ],
    },
    // BARCHART OF COUNT EACH SCORE FOR SPECIFIC QUESTION
    barchartScoreEachQData: {
      labels: ['1. ไม่พึงพอใจ(แย่)','2. ค่อนข้างพึงพอใจ(ปานกลาง)','3. พึงพอใจ(ดี)','4. พึงพอใจมาก(ดีมาก)'],
      datasets: [
        {
          label: "จำนวนคนให้คะแนน",
          data: [],
          backgroundColor: [
            "rgba(219,50,54,0.9)",
            "rgba(244,180,0,0.9)",
            "rgba(72,133,237,0.9)",
            "rgba(60,186,84,0.9)",
          ],
          borderColor: [
            "rgba(219,50,54,1)",
            "rgba(244,180,0,1)",
            "rgba(72,133,237,1)",
            "rgba(60,186,84,1)",
          ],
          borderWidth: 3,
        },
      ],
    },
    barchartoptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontSize: 12
            },
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'ระดับคะแนน',
              fontSize: 14
            }
          },
        ],
        xAxes:[
          {
            ticks: {
              autoSkip: false,
              minRotation: 0,
              maxRotation: 90,
              fontSize: 12,
            },
            gridLines: {
              display: false,
            }
          },
        ],
      },
    },
    barchartoptions2: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontSize: 12
            },
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'จำนวนคน',
              fontSize: 14
            }
          },
        ],
        xAxes:[
          {
            ticks: {
              autoSkip: false,
              minRotation: 0,
              maxRotation: 90,
              fontSize: 12,
            },
            gridLines: {
              display: false,
            }
          },
        ],
      },
    },
    overview: true,
    onequesion:false,
    anyquesion: false,
    loaded: false,
    select1: false,
    // script of date
    startDateTime: {
      date: "",
      time: ""
    },
    endDateTime: {
      date: "",
      time: "",
    },
    menu1: false,
    menu2: false,
    //Backend - Fetch data variable do not touch or add anything below here!!
    searchButtonloader: null,
    searchButtonloading: false,
    alertbox: {
      alert: false,
      msg: "",
      type: "info",
    },
    divTagIndex: "",
    qSequenceIndex: "",
    divisionLists: [],
    specificQuestion: [],
    resDivResults: [],
    specificResultsLength: 0,
    resultsDivComments: [],
    satisfyStats: {
      icon: "mdi-emoticon-sad",
      score: "",
      text: "",
      color: "",
      show: false,
    },
  }),
  computed:{
    startDateTimeSelected(){
      return `${this.startDateTime.date} - ${this.startDateTime.time}`
    },
    endDateTimeSelected(){
      return `${this.endDateTime.date} - ${this.endDateTime.time}`
    },
    rangeDateTimeSelected(){
      return `${this.startDateTime.date}T${this.startDateTime.time}&${this.endDateTime.date}T${this.endDateTime.time}`
    },
    divSelected(){
      if(this.divTagIndex){
        return this.userResDiv.filter(div => div.divTag == this.divTagIndex);
      }
        return "";
    },
    qSelected(){
      if(this.qSequenceIndex){
        return this.specificQuestion.filter(q => q.qSequence == this.qSequenceIndex);
      }
    },
    userResDiv(){
      if(this.$auth.loggedIn){
        return this.divisionLists.filter((div) => this.$auth.user.resDiv.includes(div.divTag))
      } else {
        return []
      }
    },
  },
  watch:{
    searchButtonloader(){
        const l = this.searchButtonloader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.searchButtonloader = null
        this.fetchAllResultsByTime()
      },
    'satisfyStats.score'(){
      if(this.satisfyStats.score >= 3.5){
        this.satisfyStats.icon = 'mdi-emoticon-excited';
        this.satisfyStats.text = 'พึงพอใจมาก'
        this.satisfyStats.color = 'green darken-1'
        this.satisfyStats.show = true;
      } 
      else if(this.satisfyStats.score >= 3){
        this.satisfyStats.icon = 'mdi-emoticon-happy';
        this.satisfyStats.text = 'พึงพอใจ'
        this.satisfyStats.color = 'blue darken-1'
        this.satisfyStats.show = true;
      }
      else if(this.satisfyStats.score >= 2){
        this.satisfyStats.icon = 'mdi-emoticon-neutral';
        this.satisfyStats.text = 'เฉยๆ'
        this.satisfyStats.color = 'yellow darken-3'
        this.satisfyStats.show = true;
      }
      else if(this.satisfyStats.score >= 1){
        this.satisfyStats.icon = 'mdi-emoticon-sad';
        this.satisfyStats.text = 'ไม่พึงพอใจ'
        this.satisfyStats.color = 'red'
        this.satisfyStats.show = true;
      } else {
        this.satisfyStats.icon = '';
        this.satisfyStats.text = ''
        this.satisfyStats.color = ''
        this.satisfyStats.show = false;
      }
    },
    
    
  },
  methods: {
    // BELOW IS BACK-END FETCH USER - RELATED FIELD DO NOT ADD ANY FUNCTION!!
    async fetchItems(){
      const apiURLdivs = `${process.env.AXIOS_BASEURL}/api/divs`;
      const apiURLAllresDivResults = `${process.env.AXIOS_BASEURL}/api/evalresults/resDivResults`;
      await this.$axios.get(apiURLdivs).then(res => {this.divisionLists = res.data}).catch(err => { console.log(err) });
      await this.$axios.post(apiURLAllresDivResults, {userResDiv: this.userResDiv})
      .then(res => {this.resDivResults = res.data}).catch(err => { console.log(err) });
      await this.barchartScoreResDivData.labels.push(...this.userResDiv.map(div => div.divName));
      await this.statresDivScore();
      await this.updateCharts();     
    },
    async fetchQuestion(){
      let apiURLAllresDivResults;
      if (this.rangeDateTimeSelected){
        apiURLAllresDivResults = `${process.env.AXIOS_BASEURL}/api/evalresults/resDivResults/${this.rangeDateTimeSelected}`;
      }
      else{
        apiURLAllresDivResults = `${process.env.AXIOS_BASEURL}/api/evalresults/resDivResults`;
      }
      await this.$axios.post(apiURLAllresDivResults, {userResDiv: this.userResDiv})
      .then(res => {this.resDivResults = res.data}).catch(err => { console.log(err) });
      const apiURLSpecificQuestion = `${process.env.AXIOS_BASEURL}/api/questions/${this.divTagIndex}`;
      await this.$axios.get(apiURLSpecificQuestion).then(res => {this.specificQuestion = res.data}).catch(err => {});
      this.barchartScoreAllQData.labels = [];
      this.barchartScoreAllQData.datasets[0].data = [];
      await this.barchartScoreAllQData.labels.push(...this.specificQuestion.map(q => q.qName));
      await this.statOneDivScore();
      await this.updateCharts();
    },
    async fetchAllResultsByTime(){
      let apiURLAllresDivResultsTime = ``;
      if(this.startDateTime.date && this.startDateTime.time && this.endDateTime.date && this.endDateTime.time){
        apiURLAllresDivResultsTime = `${process.env.AXIOS_BASEURL}/api/evalresults/resDivResults/${this.rangeDateTimeSelected}`;
      } else {
        apiURLAllresDivResultsTime = `${process.env.AXIOS_BASEURL}/api/evalresults/resDivResults`;
      }
      await this.$axios.post(apiURLAllresDivResultsTime, {userResDiv: this.userResDiv})
      .then(res => {this.resDivResults = res.data}).catch(err => { console.log(err) });
      await this.statresDivScore();
      if(this.divTagIndex){
        await this.statOneDivScore();
      }
      if(this.qSequenceIndex){
        await this.statOneQuestionScore();
      }
      await this.updateCharts();
    },
    async updateCharts() {
      this.barchartScoreResDivData = {...this.barchartScoreResDivData};
      this.barchartScoreAllQData = {...this.barchartScoreAllQData};
      this.barchartScoreEachQData = {...this.barchartScoreEachQData};
    },
    async statresDivScore(){
      this.barchartScoreResDivData.datasets[0].data = [];
      const resDivResults = this.resDivResults
      const resDivTag = this.userResDiv.map(a => a.divTag);
      for (const divTag of resDivTag){
        let sumScore = 0;
        let dataScoreLength = 0;
        let avgScore;
        let dataScore = resDivResults.filter((div) => div.divTag === divTag)
        dataScore = dataScore.map(data => data.evalScore)
        for (const scoreArray of dataScore){
          for (const score of scoreArray){
            sumScore += score
            dataScoreLength += 1;
          }
        }
        avgScore = (sumScore / dataScoreLength);
        avgScore = avgScore.toFixed(2);
        avgScore = parseFloat(avgScore);
        this.barchartScoreResDivData.datasets[0].data.push(avgScore);
      }
    },
    async statOneDivScore(){
      this.barchartScoreAllQData.datasets[0].data = [];
      const divTag = this.divTagIndex;
      const resDivResults = this.resDivResults;
      let dataScore = resDivResults.filter((div) => div.divTag === divTag);
      if(!dataScore.length == 0){
        let comments = dataScore.map(data => data.comment);
        let sumAllavgQuestionScore = 0;
        let avgAllQuestionScore = 0;
        this.resultsDivComments = comments
        dataScore = dataScore.map(data => data.evalScore);
        this.specificResultsLength = dataScore.length;
        dataScore = dataScore[0].map((col, i) => dataScore.map(row => row[i])); //Transposing Array from one result to each question
        for (const scoreArray of dataScore){
          let sumEachQuestionScore = 0;
          let dataScoreLength = 0;
          let avgEachQuestionScore = 0;
          for (const score of scoreArray){
            sumEachQuestionScore += score
            dataScoreLength = scoreArray.length;
          }
          avgEachQuestionScore = (sumEachQuestionScore / dataScoreLength);
          avgEachQuestionScore = avgEachQuestionScore.toFixed(2);
          avgEachQuestionScore = parseFloat(avgEachQuestionScore);
          sumAllavgQuestionScore += avgEachQuestionScore;
          this.barchartScoreAllQData.datasets[0].data.push(avgEachQuestionScore);
        }
        avgAllQuestionScore = parseFloat((sumAllavgQuestionScore / this.specificQuestion.length).toFixed(2));
        this.satisfyStats.score = avgAllQuestionScore;
      } else {
        this.satisfyStats.score = 0;
        this.specificResultsLength = 0;
        this.resultsDivComments = [];
      }
    },
    async statOneQuestionScore(){
      this.barchartScoreEachQData.datasets[0].data = [];
      const divTag = this.divTagIndex;
      const qSequence = this.qSequenceIndex;
      const qArrayidx = qSequence - 1
      const resDivResults = this.resDivResults;
      let dataScore = resDivResults.filter((div) => div.divTag === divTag);
      let countScore1 = 0;
      let countScore2 = 0;
      let countScore3 = 0;
      let countScore4 = 0;
      if (!dataScore.length == 0){
        dataScore = dataScore.map(data => data.evalScore);
        dataScore = dataScore[0].map((col, i) => dataScore.map(row => row[i])); //Transposing Array from one result to each question
        for(const scoreArray of dataScore[qArrayidx]){
          if(scoreArray == 1){
            countScore1 += 1;
          } 
          else if(scoreArray == 2){
            countScore2 += 1;
          }
          else if(scoreArray == 3){
            countScore3 += 1;
          }
          else if(scoreArray == 4){
            countScore4 += 1;
          }
          else{

          } 
        }
        let arrayCountScore = [countScore1, countScore2, countScore3,countScore4];
        this.barchartScoreEachQData.datasets[0].data.push(...arrayCountScore);
        this.updateCharts()
      }
    },
    // ABOVE IS BACK-END FETCH USER - PLEASE ADD OTHER FUNCTION BELOW !
    clearStartDate(){
      this.startDateTime.date = '';
      this.startDateTime.time = '';
    },
    clearEndDate(){
      this.endDateTime.date = '';
      this.endDateTime.time = '';
    },
    createAlert(msg, type, delay=5000){
      this.alertbox.msg = msg;
      this.alertbox.type = type;
      this.alertbox.alert = true;
      setInterval(() => {
        this.alertbox.alert = false
        this.alertbox.msg = "";
      }, delay)
    },
    changeSelect1(selectObj) {
        this.select1 = true;
        this.overview = false;
        this.anyquesion = true;
        this.onequesion = false;
        this.qSequenceIndex = '';
     },
     changeSelect2(selectObj) {
        this.select2 = true;
        this.anyquesion = false;
        this.onequesion = true;
     },
  },
  async created() {
    await this.fetchItems();
  },
};
</script>


<style scoped>
.box1 > h1,
.box1 > h3 {
  color: #bc8e5d;
}
.box2 > h1,
.box2 > h3,
.box2 > h2{
  color: #FFFFFF;
}
.g-quesion{
  height: auto;
  padding: 10px;
  align-items: center;
}
@-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
}
</style>