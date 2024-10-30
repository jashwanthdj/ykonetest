<template>
  <div class="gender-graph">
    <div>GENDER</div>
    <div class="canvas-main">
      <div class="canvas-container">
        <canvas ref="chart"></canvas>
      </div>
    </div>
    <div class="label-section">
      <div class="label-main">
        <span class="dot" :style="{ backgroundColor: '#8C96FF' }"></span>
        <span class="label">Male: {{ (100 - femalePercent).toFixed(2) }}%</span>
      </div>
      <div class="label-main">
        <span class="dot" :style="{ backgroundColor: '#64FFAA' }"></span>
        <span class="label">Female: {{ femalePercent }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js/auto';
Chart.register(...registerables);

export default {
  data: () => ({
    chart: ''
  }),
  
  props: {
    genderDetails: {
      type: Object,
      default: () => ({})
    }
  },
  
  computed: {
    femalePercent() {
      return this.genderDetails?.FEMALE 
        ? (this.genderDetails.FEMALE * 100).toFixed(2) 
        : '0.00';
    }
  },
  
  mounted() {
    this.renderChart();
  },
  
  watch: {
    genderDetails(val) {
      if (val) this.renderChart();
    }
  },
  
  methods: {
    renderChart() {
      this.destroyChart();
      
      const dataValue = (this.genderDetails?.FEMALE * 100).toFixed(2);
      const remainingValue = (100 - dataValue).toFixed(2);

      const maxValue = Math.max(dataValue, remainingValue)
      const centerTextPlugin = {
        id: 'centerTextPlugin',
        beforeDraw(chart) {
          const { ctx, chartArea: { width, height } } = chart;
          const text = chart.config.options.plugins.centerTextPlugin.text || '';
          const textColor = dataValue >= remainingValue ? '#64FFAA' : '#8C96FF';
          ctx.save();
          ctx.font = 'bold 32px sans-serif';
          ctx.fillStyle = textColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, width / 2, height / 2);

          ctx.font = '16px sans-serif';
          ctx.fillStyle = '#a6a6b3';
          const fontText = dataValue >= remainingValue ? 'Female' : 'Male';
          ctx.fillText(fontText, width / 2, height / 2 + 30);
          ctx.restore();
        }
      };

      this.chart = new Chart(this.$refs.chart, {
        type: 'doughnut',
        data: {
          labels: ['Female', 'Male'],
          datasets: [
            {
              data: [dataValue, remainingValue],
              backgroundColor: ['#64FFAA', '#8C96FF'],
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              cutout: '90%',
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
              display: true,
              formatter: () => '',
            },
            centerTextPlugin: {
              text: `${maxValue}%`
            }
          }
        },
        plugins: [centerTextPlugin]
      });
    },

    destroyChart() {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
    }
  },

  beforeDestroy() {
    this.destroyChart();
  }
};
</script>

<style scoped>
.gender-graph {
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}

.label-main {
  display: flex;
  align-items: center;
  color: #a6a6b3;
  font-size: 1.2em;
}

.label-section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.canvas-container {
  width: 300px;
  height: 300px;
}

.canvas-main {
  display: flex;
  justify-content: center;
}
</style>
