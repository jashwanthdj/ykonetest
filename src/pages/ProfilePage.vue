<template>
    <div class="main-container">
        <ProfileDetails></ProfileDetails>
        <ContentSection></ContentSection>
        <AudienceSection></AudienceSection>
        <ContentScannerSection></ContentScannerSection>
        <PerformanceTimeline></PerformanceTimeline>
        <PerformanceTimeline2></PerformanceTimeline2>
    </div>
</template>

<script>

import ProfileDetails from '@/components/ProfileDetails.vue';
import ContentSection from '@/components/ContentSection.vue';
import AudienceSection from '@/components/AudienceSection.vue';
import ContentScannerSection from '@/components/ContentScannerSection.vue';
import PerformanceTimeline from '@/components/PerformanceTimeline.vue';
import PerformanceTimeline2 from '@/components/PerformanceTimeline2.vue';
export default {
  name: 'ProfilePage',
  components: {
    ProfileDetails,
    ContentSection,
    AudienceSection,
    ContentScannerSection,
    PerformanceTimeline,
    PerformanceTimeline2
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
</style>