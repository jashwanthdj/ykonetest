<template>
    <div class="main-container">
        <div class="title">
            AUDIENCE DEMOGRAPHICS
        </div>
        <div class="graphs-container">
            <GenderGraph v-if="apiCall" class="gender-graph grid-item" :genderDetails="audienceData.genders"></GenderGraph>
            <AgeRange v-if="apiCall" class="age-graph grid-item" :ageDetails="audienceData.ages"></AgeRange>
            <CountriesSection class="countries-graph grid-item"></CountriesSection>
            <EthinicitySection
                v-if="audienceData && audienceData.ethnicities && audienceData.ethnicities.length"
                class="ethnicities grid-item"
                :ethnicityData="audienceData.ethnicities">
            </EthinicitySection>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import GenderGraph from '@/components/GenderGraph.vue'
import AgeRange from '@/components/AgeRange.vue'
import CountriesSection from '@/components/CountriesSection.vue'
import EthinicitySection from '@/components/EthinicitySection.vue'

export default {
    data: () => {
        return {
          audienceData: {},
          apiCall: false
        }
    },
    components: {
        GenderGraph,
        AgeRange,
        CountriesSection,
        EthinicitySection
    },
    mounted () {
        this.getAudienceDetails()
    },
    methods: {
        getAudienceDetails() {
            axios.get('https://staging.campaygn.com/assessment/audience_demographics')
            .then(response => {
                this.audienceData = response.data
                this.apiCall = true
            })
            .catch(error => {
                console.error(error)
            })
        }
    }
}
</script>

<style scoped>
.main-container {
  padding: 30px;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
}
.title {
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 30px;
}
.graphs-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.grid-item {
  border: 1px solid #FFFFFF0A;
  background: rgba(255, 255, 255, 0.02);
  padding: 30px;
  color: rgba(255, 255, 255, 1);
}
</style>