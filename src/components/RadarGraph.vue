<template>
  <div>
    <canvas id="radarChart"></canvas>
    <div
      id="tooltip"
      style="position: absolute; background-color: #2C2F4B; border: 1px solid #FFFFFF0D; color: white; padding: 5px; border-radius: 3px; pointer-events: none; opacity: 0; box-shadow: 0px 5px 30px 0px #FFFFFF0D inset;"
    ></div>
  </div>
</template>

<script>
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js"
Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default {
  name: "RadarChart",
  props: {
    scoreMetrics: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    const ctx = document.getElementById("radarChart").getContext("2d")
    const values = Object.values(this.scoreMetrics)
    const cornerDotsPlugin = {
      id: "cornerDotsPlugin",
      afterEvent(chart, args) {
        const { event } = args
        const { scales, canvas } = chart
        const rScale = scales.r
        const maxRadius = rScale.getDistanceFromCenterForValue(rScale.max)
        const angleStep = (Math.PI * 2) / rScale._pointLabels.length
        let hoveredDot = null

        rScale._pointLabels.forEach((label, index) => {
          const angle = index * angleStep - Math.PI / 2
          const x = rScale.xCenter + Math.cos(angle) * maxRadius
          const y = rScale.yCenter + Math.sin(angle) * maxRadius

          const distance = Math.sqrt((event.x - x) ** 2 + (event.y - y) ** 2)
          if (distance < 10) {
            hoveredDot = {
              label,
              value: chart.data.datasets[0].data[index],
              x,
              y
            }
          }
        })

        const tooltipEl = document.getElementById("tooltip")
        if (hoveredDot) {
          const rect = canvas.getBoundingClientRect()
          tooltipEl.style.opacity = 1
          tooltipEl.style.left = `${rect.left + hoveredDot.x - tooltipEl.offsetWidth / 2}px`
          tooltipEl.style.top = `${rect.top + hoveredDot.y - tooltipEl.offsetHeight - 10}px`
          tooltipEl.innerText = `${hoveredDot.label}: ${hoveredDot.value}`
        } else {
          tooltipEl.style.opacity = 0
        }
      },
      afterDraw(chart) {
        const { ctx, scales } = chart
        const rScale = scales.r
        const maxRadius = rScale.getDistanceFromCenterForValue(rScale.max)
        const angleStep = (Math.PI * 2) / rScale._pointLabels.length

        rScale._pointLabels.forEach((label, index) => {
          const angle = index * angleStep - Math.PI / 2
          const x = rScale.xCenter + Math.cos(angle) * maxRadius
          const y = rScale.yCenter + Math.sin(angle) * maxRadius

          ctx.beginPath()
          ctx.arc(x, y, 5, 0, 2 * Math.PI)
          ctx.fillStyle = "#FF9F40"
          ctx.fill()
          ctx.closePath()
        })
      }
    }

    new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Growth", "Interaction", "Impression", "Reach", "Media Value"],
        datasets: [
          {
            label: "Performance Metrics",
            data: values,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            borderColor: "rgba(255, 255, 255, 0.25)",
            borderWidth: 3,
            pointBackgroundColor: "#FF9F40",
            pointBorderColor: "#fff",
            pointRadius: 0,
            pointHoverRadius: 0,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        scales: {
          r: {
            angleLines: {
              display: false
            },
            grid: {
              circular: true,
              color: "rgba(255, 255, 255, 0.2)"
            },
            pointLabels: {
              display: false
            },
            ticks: {
              display: false,
              count: 5,
              max: 80,
              backdropColor: "transparent"
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      plugins: [cornerDotsPlugin]
    })
  }
}
</script>

<style scoped>
canvas {
  max-width: 220px;
  max-height: 220px;
}
</style>
