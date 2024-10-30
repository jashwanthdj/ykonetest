<template>
    <div class="container">
        <div>{{ type }}</div>
        <div class="sub-section">
            <img  v-if="statusMessage.image === 1" src="../assets/images/arrow-up.svg" alt="Image">
            <img v-if="statusMessage.image === 2"  src="../assets/images/arrow-up-average.svg" alt="Image">
            <img  v-if="statusMessage.image === 3" src="../assets/images/arrow-down.svg" alt="Image">
            <div :class="statusMessage.value">
                <div class="sub-section_value">{{ displayValue }}</div>
                <div class="sub-section_remark">{{ statusMessage.value }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
 data: () => {
    return {

    }
 },
 props: {
    value: {
        type: Object
    },
    type: {
        type: String
    }
 },
 computed:  {
    displayValue () {
        if(this.value.type === 'percentage') {
            const percentage = this.value.value * 100;
            return percentage.toFixed(2) + '%'
        } else {
            const millions = this.value.value / 1000000;
            return millions.toFixed(1) + '€'
        }
    },
    statusMessage() {
      switch (this.value.direction) {
        case 'positive':
          return {
            value: 'Excellent',
            image: 1
          }
        case 'neutral':
        return {
            value: 'Average',
            image: 2
          }
        case 'negative':
        return {
            value: 'Bad',
            image: 3
          }
        default:
          return {
            image: '',
            value: ''
          };
      }
    }
 }
}
</script>
<style scoped>
.container {
    padding: 20px;
    color:#FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
.sub-section_image {
   height: 16px;
   width: 16px; 
}
.sub-section_value {
    font-size: 32px;
}
.sub-section_remark {
    font-size: 14px;
}
.Excellent {
  color: #64FFAA;
}

.Average {
  color: #FFC164;
}

.Bad {
  color: #FF6464;
}
</style>