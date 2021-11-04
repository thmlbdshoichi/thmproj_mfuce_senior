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
          @input="fetchItems()"
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
          @input="fetchItems()"
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
            <v-card height="130" color="#1F618D">  
              <v-card-text class="box1">
                <h1>วันนี้</h1>
                <br>
                  <h1>350</h1>
                  <h3>ตอบแบบสอบถามแล้ววันนี้</h3>
              </v-card-text>
            </v-card>
          </v-col>
        
        <!--กล่อง2--> 
          <v-col cols="12" sm="6" md="6" lg="6"  align="center" justify="center" >
            <v-card height="130" color="">
              <v-card-text class="box2">
                <h1>ทั้งหมด</h1>
                <br>
                <h1>1250</h1>
                <h3>ตอบแบบสอบถามทั้งหมด</h3>
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
        <v-col cols="12" sm="6" md="6" lg="6" >
              <v-icon medium color="#bc8e5d"> mdi-clock-time-three-outline </v-icon>
            เลือกระยะเวลาที่ต้องการดู
            <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" >
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="stdate"
                    label="Start Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="stdate"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="#bc8e5d" @click="menu1 = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="#bc8e5d" @click="$refs.menu1.save(date)" >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" >
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="eddate"
                    label="End Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="eddate"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="#bc8e5d" @click="menu2 = false" >
                    Cancel
                  </v-btn>
                  <v-btn text color="#bc8e5d" @click="$refs.menu2.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            </v-row>
        </v-col>
      </v-card-title>
    </v-card>
    <br>
    
    <!-- graph -->
    <v-card>
      <v-card-text>
          <v-col md="12">
            <v-card v-if="overview">
              <bar-chart
                :barchartdata="barchartdata"
                :barchartoptions="barchartoptions"
              />
            </v-card>
            <!--<v-card>
              <line-chart
                :linechartdata="chartdata"
                :linechartoptions="options"
              />
            </v-card>-->
          </v-col>
  
          <!-- graph by quesions-->
          <template>
            <v-item-group>
              <v-container>
                 <h2> กราฟแสดงแต่ล่ะคำถาม </h2>
                <br>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="6" v-for="(quesion, index) in quesions" :key="index" >
                    <v-card class="g-quesion d-flex align-center" >
                      <v-card-text>
                        <bar-chart 
                          :barchartdata="barchartdata"
                          :barchartoptions="barchartoptions"
                        />
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </template>
      </v-card-text>
    </v-card>  
  </div>
</template>

<script>

export default {
  layout: "user",
  middleware: ['auth'],
  components: {
  },
  data: () => ({
    items: ["Division1", "Division2", "Division3", "Division4"],
    chartdata: {
      labels: ["หน่วยงาน 1", "หน่วยงาน 2", "หน่วยงาน 3", "หน่วยงาน 4"],
      datasets: [
        {
          label: "Data One",
          borderColor: "#f87979",
          data: [40, 20, 50, 10],
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
    barchartdata: {
      labels: ["Division 1", "Division2", "Division3", "Division4"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
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
            },
          },
        ],
      },
    },
    quesions: ["Quesion 1", "Quesion 2", "Quesion 3", "Quesion 4", "Quesion 5"],
    overview: true,
    loaded: false,
    select1: false,
    apichartdata: {
      labels: [],
      datasets: [],
    },
    jsonchartdata: {
      labels: [],
      datasets: [],
    }, // script of date
    stdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    eddate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    modal: false,
    //Backend - Fetch data variable do not touch or add anything below here!!
    alertbox: {
      alert: false,
      msg: "",
      type: "info",
    },
    divTagIndex: "",
    divisionLists: [],
    specificQuestion: [],
    userDetails: {
      username: "",
      name: "",
      role: "",
      resDiv: []
      },
    userResDiv: [],
  }),
  computed:{

  },
  watch:{

  },
  methods: {
    // BELOW IS BACK-END FETCH USER - RELATED FIELD DO NOT ADD ANY FUNCTION!!
    async fetchItems(){
      const apiURLSpecificQuestion = `${process.env.AXIOS_BASEURL}/api/questions/${this.divTagIndex}`
      const apiURLdivs = `${process.env.AXIOS_BASEURL}/api/divs`;
      await this.$axios.get(apiURLSpecificQuestion).then(res => {this.specificQuestion = res.data})
      .catch(err => {this.createAlert(`โปรดเลือกหน่วยงานที่ท่านรับผิดชอบเพื่อแสดงรายการคำถาม`, "info", 60000) });
      await this.$axios.get(apiURLdivs).then(res => {this.divisionLists = res.data}).catch(err => { console.log(err) });
      if(this.$auth.loggedIn){
        this.userDetails = this.$auth.user;
        this.userResDiv = this.divisionLists.filter((div) => this.userDetails.resDiv.includes(div.divTag));
        this.loaded = true;
      }
    },
    // ABOVE IS BACK-END FETCH USER - PLEASE ADD OTHER FUNCTION BELOW !
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
        this.loaded = true;
        this.overview = false;
     },
     changeSelect2(selectObj) {
        this.select2 = true;
     },
  },
  async created() {
    await this.fetchItems();
  },
};
</script>


<style scoped>
.box1 > h1 ,
.box1 > h3 {
  color: #FDFEFE;
}
.box2 > h1 {
  color: #bc8e5d;
}
.box2 > h3{
  color: #bc8e5d;
}
.g-quesion{
  height: auto;
  padding: 20px;
  align-items: center;
}
</style>