<template>
  <div>
    <v-row align="center">
      <h3>Division:</h3>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="items"
          label="Choose Division to Create"
          dense
          solo
        ></v-select>
      </v-col>
    </v-row>

    <v-card>
      <v-card-text>
        <v-row>
          <v-col md="6">
            <v-card>
              <bar-chart
                :barchartdata="barchartdata"
                :barchartoptions="barchartoptions"
              />
            </v-card>
            <v-card>
              <line-chart
                :linechartdata="chartdata"
                :linechartoptions="options"
              />
            </v-card>
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
    loaded: false,
    apichartdata: {
      labels: [],
      datasets: [],
    },
    jsonchartdata: {
      labels: [],
      datasets: [],
    },
  }),
  methods: {
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