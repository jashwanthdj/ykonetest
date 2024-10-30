<template>
    <div v-if="apiCall" class="main-container">
        <div class="profile-pic border">
            <img :src="profileData.profile_display_picture" alt="profile-pic" class="profile-image">
        </div> 
        <div class="details border">
            <div class="details__header">
                <div>
                    <div>{{ profileData.profile_name }}</div>
                    <div class="profile-username">{{ profileData.profile_username }}</div>
                </div>
                <div>
                    <div>{{ profileData.profile_followers.value | convertToMillions }} M</div>
                    <div class="profile-username">Followers</div>
                </div>
            </div>
            <div class="details__body">
                <div class="details__body_sub">
                    <img src="../assets/images/flag.svg" alt="">
                    <span>{{ profileData.profile_type }}</span>
                </div>
                <div class="details__body_sub">
                    <img src="../assets/images/location.svg" alt="">
                    <span>{{  profileData.profile_country.name }}</span>
                </div>
                <div class="details__body_sub">
                    <img src="../assets/images/influencer-type.svg" alt="">
                    <span>{{profileData.profile_theme.join(', ') }}</span>
                </div>
                <div class="details__body_sub">
                    <img src="../assets/images/gender.svg" alt="">
                    <span>{{ profileData.profile_gender === 'f' ? 'Female': 'Male' }}</span>
                </div>
                <div class="details__body_sub">
                    <img src="../assets/images/hashtag.svg" alt="">
                    <span>{{ profileData.profile_keyword.join(', ') }}</span>
                </div>
            </div>
            <div class="details__footer">
                <div>
                    <img src="../assets/images/instagram.svg" alt="">
                    &nbsp;
                    <img src="../assets/images/email.svg" alt="">
                    &nbsp;
                    <img src="../assets/images/youtube.svg" alt="">
                </div>
                <div class="details__footer_timestamp">
                    Added on {{ convertTimestampToDate(profileData.profile_created_at) }}
                </div>
            </div>
        </div>
        <ProfileDetailsSub class="engagement border" :value="profileData.profile_engagement_rate" :type="'ENGAGEMENT RATE'"></ProfileDetailsSub>
        <div class="quality border">
         <div>QUALITY SCORE</div>
         <div class="quality_score">
          <div :class="[directionClass]">
            <div class="quality_direction" :class="[`image_${directionClass}`]"></div>
            <div><span class="quality_percentage">{{ profileData.profile_quality.score.value }}</span> /100</div>
            <div>Average</div>
          </div>
          <div>
            <RadarGraph v-if="apiCall" :scoreMetrics="profileData.profile_quality.score_metrics"></RadarGraph>
          </div>
         </div>
        </div>
        <ProfileDetailsSub class="followers border" :value="profileData.profile_active_followers" :type="'ACTIVE FOLLOWERS'"></ProfileDetailsSub>
        <ProfileDetailsSub class="emv border" :value="profileData.profile_media_value" :type="'EMV'"></ProfileDetailsSub>
    </div>
</template>
<script>
import axios from 'axios';
import { convertToMillions } from '../utils/conversions'
import ProfileDetailsSub from './ProfileDetailsSub.vue';
import RadarGraph from './RadarGraph.vue';
export default {
    data: () => {
        return {
            profileData: [],
            apiCall: false
        }
    },
    computed: {
      directionClass() {
        return this.profileData.profile_quality.score.direction
      }
    },
    components:{ 
        ProfileDetailsSub,
        RadarGraph
    },
    filters: {
      convertToMillions
    },
    methods: {
        getProfileDetails() {
            axios.get('https://staging.campaygn.com/assessment/profile_data')
            .then(response => {
                this.profileData = response.data
                this.apiCall = true
            })
            .catch(error => {
                console.error(error)
            })
        },
        convertTimestampToDate(timestamp) {
            const date = new Date(timestamp * 1000);
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            return formattedDate; 
        }
    },
    mounted () {
        this.getProfileDetails()
    }
}
</script>
<style scoped>
.main-container {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  height: 640px;
}
.border {
  border: 1px solid #FFFFFF0A;
  background: rgba(255, 255, 255, 0.02);
}
.profile-pic {
  grid-column: 1 / 4;
  grid-row: 1 / 7;
}
.profile-image {
  height: 100%;
  width: 100%;
}
.details {
  grid-column: 4 / 6;
  grid-row: 1 / 4;
  padding: 30px;
}
.details__header {
  padding-bottom: 16px;
  font-size: 20px;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #36394E;
}
.details__body {
  padding: 20px 0px;
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  align-items: center;
  color: #FFFFFF;
}
.details__body_sub {
  display: flex;
  align-items: center;
  gap: 10px;
}
.profile-username {
  font-size: 14px;
  color: #FFFFFF99;
}
.details__footer {
  display: flex;
  justify-content: space-between;
  align-items: center
}
.details__footer_timestamp {
  color: #FFFFFF99;
}
.quality {
  grid-column: 4 / 6;
  grid-row: 4 / 7;
  padding: 20px;
  color: #FFFFFF;
}
.quality_score {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 200px;
}
.quality_direction {
  height: 16px;
  width: 16px;
  background-size: 100% 100%;
  margin-bottom: 20px;
}
.neutral {
  color: #FFC164;
}
.positive {
  color: #64FFAA;
}
.negative {
  color: #FF6464;
}
.image_neutral {
  background-image: url('../assets/images/arrow-up-average.svg');
}
.image_positive {
  background-image: url('../assets/images/arrow-up.svg');
}
.image_negative {
  background-image: url('../assets/images/arrow-down.svg');
}
.quality_percentage {
  font-size: 64px;
}
.engagement {
  grid-column: 6 / 7;
  grid-row: 1 / 3;
}
.followers {
  grid-column: 6 / 7;
  grid-row: 3 / 5;
}
.emv {
  grid-column: 6 / 7;
  grid-row: 5 / 7;
}
</style>