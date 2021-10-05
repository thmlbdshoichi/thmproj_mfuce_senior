import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    barchartdata: {
      type: Object,
      default: null
    },
    barchartoptions: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.barchartdata, this.barchartoptions)
  }
}