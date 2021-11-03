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
          :items="items" 
          item-text="divName" 
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
          v-model="divTagIndex" 
          @input="fetchItems()"
          :items="items" 
          item-text="divName" 
          item-value="divTag" 
          prepend-icon="mdi-magnify" 
          single-line hide-details></v-select>
        </v-col>

        <!--เลือกระยะเวลาที่ต้องการดู --> 
         <!-- v-if="selected" --> 
        <v-col cols="12" sm="6" md="6" lg="6" v-if="select2" >
              <v-icon medium color="#bc8e5d"> mdi-numeric-3-circle </v-icon>
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

    <v-card>
      <v-card-text>
        <v-row>
          <v-col md="6">
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

          <v-col md="6">
            <!--<v-card>
              <bar-chart
                :barchartdata="barchartdata"
                :barchartoptions="barchartoptions"
              />
            </v-card>-->
          </v-col>
        </v-row>

        <v-row>
          <v-col md="12">
            <v-card v-if="loaded">
              <line-chart
                :linechartdata="jsonchartdata"
                :lineoptions="barchartoptions"
              />
            </v-card>
            <v-card v-if="loaded">
              <line-chart
                :linechartdata="jsonchartdata"
                :lineoptions="barchartoptions"
              />
            </v-card>
          </v-col>
        </v-row>
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
    overview: true,
    loaded: false,
    select1: false,
    select2: false,
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
  }),
  
  methods: {
    changeSelect1(selectObj) {
        this.select1 = true;
        this.loaded = true;
        this.overview = false;
     },
     changeSelect2(selectObj) {
        this.select2 = true;
     },
    async fetchItems(){
      const apiURLdivs = `${process.env.AXIOS_BASEURL}/api/divs`;
      this.$axios.get(apiURLdivs).then(res => {this.divisions = res.data})
    },
  },
  async mounted() {
    /*this.loaded = false;
    try {
      const res = await this.$axios.get(url);
      const results = res.data;
      let tmplabels = [], tmpdata = [];
      results.forEach(function (x) {
        tmplabels.push(x.id);
        tmpdata.push(parseFloat(x.salary));
      });

      let tempData = {
        labels: tmplabels,
        datasets: [
          {
            label: "Salary by ID",
            data: tmpdata,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      };
      this.jsonchartdata = tempData;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }*/
  },
  async created() {
    await this.fetchItems();
  },
};
</script>