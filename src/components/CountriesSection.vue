<template>
    <div class="countries-graph">
        <div class="header">
            TOP COUNTRIES
            <div>{{ (firstEntry[1]*100).toFixed(2) }} % from {{ firstEntry[0] }}</div>
        </div>
        <div class="body">
            <div
                v-for="([key, value], index) in sortedMap"
                :key="index"
                class="percentage-wrapper"
            >
                <div class="label">
                     <div class="country">
                        {{ key }}
                    </div>
                    <div class="percentage">
                        {{ value }}%
                    </div>
                </div>
               
                <div class="bar">
                    <div class="progress" :style="{ width: (value * 100).toFixed(2) + '%' }"></div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
}
.body {
  margin-top: 12px;
  max-height: 500px;
  overflow-y: scroll;
}
.label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
}
.percentage-wrapper {
    margin-right: 12px;
    margin-bottom: 4px;
    color: rgba(255, 255, 255, 0.6);

}
.bar {
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    height: 16px;
    position: relative;
}
.progress {
    background: #8C96FF;
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 4px;
    right: 4px;
    border-radius: 8px;
}
.percentage-wrapper:first-child .progress {
   background: #64FFAA; 
}

.body::-webkit-scrollbar {
  width: 10px;
}

.body::-webkit-scrollbar-track {
  background: #34374C;
  border-radius: 8px;
}

.body::-webkit-scrollbar-thumb {
  background-color: #51546B;
  border-radius: 8px;
}

</style>

<script>
import axios from 'axios'
export default {
  name: 'CountriesSection',
  data() {
    return {
        countriesData: {},
        maxObj: {},
        sortedMap: null,
        firstEntry: []
    }
  },
  mounted () {
    this.getCountriesData()
  },
  methods: {
    getCountriesData () {
        axios.get(`https://staging.campaygn.com/assessment/audience_demographics`).then((response) => {
            this.countriesData = response.data.countries || {}
            this.findMaxContribution()
        }).catch((err) => {
            console.log(err)
        }) 
    },
    findMaxContribution () {
        this.sortedMap = new Map(
            Object.entries(this.countriesData).sort(([, valueA], [, valueB]) => valueB - valueA)
        )
        this.firstEntry = this.sortedMap.entries().next().value;
    }
  }
}
</script>