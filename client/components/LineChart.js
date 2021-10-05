import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    linechartdata: {
      type: Object,
      default: null
    },
    linechartoptions: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.linechartdata, this.linechartoptions)
  }
}