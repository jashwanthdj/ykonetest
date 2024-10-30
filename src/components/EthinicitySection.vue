<template>
  <div class="container">
    <div class="header">
      <div>TOP ETHNICITIES</div>
      <div v-if="sortedData && sortedData.length">{{ (sortedData[0].weight*100).toFixed(2) }}% from {{ sortedData[0].name }}</div>
    </div>
    <div class="ethnicity-body">
      <canvas ref="radarChart"></canvas>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.body {
}
</style>

<script>
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default {
  name: 'EthinicitySection',
  props: ['ethnicityData'],
  data () {
    return {
      chart: null,
      sortedData: []
    }
  },
  mounted () {
    this.renderChart()
  },
  methods: {
    renderChart () {
      if (!this.ethnicityData.length) {
        return
      }
      const data = this.ethnicityData
      this.sortedData = data.sort((a, b) => b.weight - a.weight)
      const labels = this.sortedData.map(item => item.name);
      const dataPoints = this.sortedData.map(item => (item.weight * 100).toFixed(2)); 
      this.chart = new Chart(this.$refs.radarChart, {
         type: 'radar',
         data: {
          labels: labels,
          datasets: [
            {
              data: dataPoints,
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderColor: 'rgba(255, 255, 255, 0.05)',
              borderWidth: 0,
              pointRadius: 6,
              pointBackgroundColor: ['rgba(100, 255, 170, 1)', ...Array(dataPoints.length - 1).fill('rgba(140, 150, 255, 1)')],
              pointBorderWidth: 0,
              fill: false,
              showLine: false
            }
          ]
        },
        options: {
          scales: {
            r: {
              angleLines: {
                display: true,
                borderDash: [5, 5],
                color: 'rgba(255, 255, 255, 1)', 
              },
              grid: { 
                display: true,
                circular: true,
                color: 'rgba(255, 255, 255, 0.05)',
              },
               pointLabels: {
                color: 'rgba(255, 255, 255, 0.6)',
                font: {
                    size: 14,
                }
              },
              ticks: { 
                display: false,
                count: 5
              },
              suggestedMin: 0,
              suggestedMax: 100
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            },
             datalabels: {
              display: false
            }
          }
        }
      })
    }
  }
}
</script>