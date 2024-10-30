<template>
    <div class="performance">
        <div>PERFORMANCE TIMELINE</div>
        <div class="line-chart">
          <canvas ref="lineChart"></canvas>
        </div>
    </div>
</template>

<script>
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns'
Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale);
import axios from 'axios';

export default {
  data() {
    return {
      lineChart: null,
      data: {}
    };
  },
  mounted() {
    this.getPerformanceDetails()
  },
  beforeDestroy() {
    if (this.lineChart) {
      this.lineChart.destroy()
    }
  },
  computed: {
    followersValue () {
      return this.data.followers.map(follower => follower.followers.value)
    }
  },
  methods: {
    createChart() {
      const ctx = this.$refs.lineChart.getContext('2d');
      const labels = this.data.followers.map(data => new Date(data.date));
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Followers',
              data: this.followersValue,
              borderColor: '#8C96FF',
              backgroundColor: 'rgba(136, 132, 216, 0.2)',
              pointBackgroundColor: '#fff',
              pointBorderColor: '#8C96FF',
              pointHoverRadius: 8,
              pointHoverBackgroundColor: '#21eb78',
              pointHoverBorderColor: '#21eb78',
              pointRadius: 4,
              pointHoverBorderWidth: 3,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: '#282B41',
              bodyColor: '#fff',
              displayColors: false,
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()} Followers`,
                title: (tooltipItem) => `Followers on ${tooltipItem[0].label}`,
              },
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month',
                displayFormats: {
                  month: 'MMMM',
                }
              },
              grid: {
                display: true,
                borderDash: [5, 5],
                color: 'rgba(255, 255, 255, 0.2)',
              },
              ticks: {
                color: '#b0b0b0',
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                display: false
              },
            },
          },
        },
      });
    },
    getPerformanceDetails() {
        axios.get('https://staging.campaygn.com/assessment/performance_timeline')
            .then(response => {
                this.data = response.data
                this.createChart()
            })
            .catch(error => {
                console.error(error)
            })
    }
  },
}
</script>
<style scoped>
.performance {
  padding: 48px 24px;
  font-size: 20px;
  color: #FFFFFF;
}
.line-chart {
  width: 100%;
  height: 400px;
  margin-top: 40px;
  border: 1px dotted rgba(255, 255, 255, 0.2);
}
</style>