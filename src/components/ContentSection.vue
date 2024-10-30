<template>
    <div class="main-container">
        <div>
            <span class="title">CONTENT</span>
            <div class="filter-section">
                <div v-for="i in filterList" :key="i.name" :class="{'selected-filter': selectedFilter === i.sortby}" @click="applyFilter(i)">
                    {{ i.name }} &nbsp;
                </div>
            </div>
        </div>
        <div class="photo-gallery">
          <div v-for="(item, index) in postsData" :key="item.id" class="photo" @mouseover="showDetails(index)"  @mouseleave="hideDetails">
              <img :src="item.image" alt="image" >
              <p class="image-index">{{ index + 1 }}</p>
            <div class="image-details" v-if="showDetailsIndex === index">
                <div class="created-date">
                    {{ formattedTimestamp(item.created_at) }}
                </div>
                <div class="sub-section" v-for="(metric, metricIndex) in metricsData" :key="metricIndex">
                    <div>{{ metric.label }}</div>
                    <div>{{ formatTheData(item[metric.valueProperty].value, item[metric.valueProperty].type) }}</div>
                </div>
            </div>
          </div>
        </div>
        <div class="button-section">
            <span class="button" @click="loadMoreData">LOAD MORE</span>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { convertTimeStampToDate, convertIntoPercentage, convertIntoCurrency, formatNumber } from '../utils/conversions'
export default {
    data: () => {
        return {
            filterList: [
                { 
                  name: 'DATE',
                  sortby: 'created_at',   
                },
                {
                  name: 'REACH',
                  sortby: 'reach',  
                },
                {
                  name: 'IMPRESSIONS',
                  sortby: 'impressions',
                },
                {
                  name: 'ENGAGEMENT',
                  sortby: 'engagement_rate',
                },
                {
                  name: 'INTERACTIONS',
                  sortby: 'interactions',
                },
                {
                  name: 'EMV',
                  sortby: 'media_value'
                }
            ],
            postsData: [],
            showDetailsIndex: null,
            selectedFilter: 'created_at',
            page: 0
        }
    },
    computed: {
        metricsData() {
            return [
                { label: 'Reach', valueProperty: 'reach' },
                { label: 'Impressions', valueProperty: 'impressions' },
                { label: 'Engagement Rate', valueProperty: 'engagement_rate' },
                { label: 'Likes', valueProperty: 'likes_count' },
                { label: 'Comments', valueProperty: 'comments_count' },
                { label: 'Influencer EMV', valueProperty: 'media_value' },
            ]
        }
    },
    mounted () {
      this.getPosts(0, true, 'created_at')
    },
    methods: {
        getPosts(page, initialCall, filter) {
            axios.get(`https://staging.campaygn.com/assessment/post_data/${page}?sort_by=${filter}`)
            .then(response => {
                this.selectedFilter = filter
                this.page = page
                if (initialCall) {
                    this.postsData = response.data
                } else {
                    this.postsData = [...this.postsData, ...response.data ]
                }
            })
            .catch(error => {
                console.error(error)
            })
        },
        showDetails(index) { 
          this.showDetailsIndex = index;
        },
        hideDetails() {
            this.showDetailsIndex = null;
        },
        formattedTimestamp(timestamp) {
          return convertTimeStampToDate(timestamp);
        },
        formatTheData (value, type) {
            if (type === 'numerical_short_scale') {
                return formatNumber(value)
            } else if (type === 'percentage') {
                return convertIntoPercentage(value)
            } else if (type === 'currency') {
                return convertIntoCurrency(value)
            }
        },
        applyFilter (item) {
          this.getPosts(0, true, item.sortby)
        },
        loadMoreData () {
          this.getPosts(this.page + 1, false, this.selectedFilter)
        }
    }
}
</script>

<style scoped>
.main-container {
  background: rgba(255, 255, 255, 0.02);
  margin-top: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 1);
}
.title {
  font-size: 20px;
}
.filter-section {
  display: inline-flex;
  margin-left: 20%;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
}
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}
.photo {
  position: relative;
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
.image-index {
  position: absolute;
  top: 1px;
  left: 5px;
  background: rgba(48, 51, 73, 1);
  color: white;
  width: 24px;
  text-align: center;
}

.photo:hover img {
  opacity: 0.2;
}
.image-details {
  padding: 40px 30px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  z-index: 100;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  box-sizing: border-box;
}
.sub-section {
  display: flex;
  justify-content: space-between;
}
.selected-filter {
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}
.button-section {
  text-align: center;
  margin-top: 50px;
  cursor: pointer;
}
.button-section .button {
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.25) inset;
  padding: 13px 22px;
  border-radius: 8px;
}
</style>