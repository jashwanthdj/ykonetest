<template>
    <div class="age-range">
        <div>AGE RANGE</div>
        <div class="chart-container">
          <canvas ref="ageChart"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'AgeRange',
  data: () => {
    return {
        ageChart: null,
        obj: {}
    }
  },
  props: {
    ageDetails: {
        type: Object,
        default: () => {}
    }
  },
  mounted() {
    this.renderChart()
  },
  watch : {
    ageDetails(val) {
        if (val) {
          this.renderChart() 
        }
      }
    },
  methods: {
    renderChart() {
    if(!Object.keys(this.ageDetails).length){
      return
    }
    this.destroyChart()
    const newObject = {};
    const keys = ['13-17', '18-24', '25-34', '35-44', '45-64', '65+'];
    keys.forEach(key => {
     newObject[key] = this.ageDetails[key.replace('+', '-')];
    })
      const labels = Object.keys(newObject)
      const dataValues = Object.values(newObject)
      const maxIndex = dataValues.indexOf(Math.max(...dataValues))
      const myArray = Array(6).fill('#8C96FF')
      myArray[maxIndex] = '#64FFAA'
      const borderColors = Array(6).fill('rgba(255, 255, 255, 0.05)')
      const borderWidths = Array(6).fill(2)
      this.ageChart = new Chart(this.$refs.ageChart, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: myArray,
              borderColor: borderColors,
              borderWidth: borderWidths,
              borderRadius: 50,
              borderSkipped: false,
            }
          ]
        },
        options: {
          responsive: true,
          barPercentage: 0.15,
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#FFFFFF99',
                font: {
                  size: 14
                }
              }
            },
            y: {
              beginAtZero: true,
              display: false
            },
          },
          plugins: {
            legend: {
              display: false
            },
            datalabels: {
              display: false,
            }
          },
          layout: {
            padding: {
              bottom: 20
            }
          },
          elements: {
            bar: {
              borderRadius: 10,
            },
          }
        }
      })
    },
    destroyChart () {
        if (this.ageChart) {
      this.ageChart.destroy()
      this.ageChart = null
    }
    }
  },
  beforeDestroy() {
    this.destroyChart()
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
}
.age-range {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>