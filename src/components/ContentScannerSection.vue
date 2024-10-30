<template>
    <div class="content-scanner">
      <h3>CONTENT SCANNER</h3>
      <div class="search-bar">
        <img src="../assets/images/search.svg">
        <input
          type="text"
          placeholder="Type anything to search..."
          v-model="searchQuery"
        />
      </div>
      <div class="popular-searches">
        <span class="title">Popular searches:</span>
        <span
          v-for="(tag, index) in popularTags"
          :key="index"
          class="tag"
          @click="searchQuery = tag"
        >
          {{ tag }}
          <img class="image" src="../assets/images/Info.svg">
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        popularTags: ['Fashion', 'Beauty', 'Luxury', 'Travel'],
      };
    },
  };
  </script>
  
  <style scoped>
  .content-scanner {
    padding: 48px 24px;
    color: #fff;
    margin-top: 30px;
    border-top: 1px solid #FFFFFF1A;
    border-bottom: 1px solid #FFFFFF1A;
    font-size: 20px;
  }
  
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    background-color: #3d3d56;
    padding: 15px;
    border-radius: 5px;
    margin-top: 120px;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .search-icon {
    margin-right: 10px;
    color: #b0b0b0;
  }
  
  input[type="text"] {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    width: 40%;
  }
  
  input::placeholder {
    color: #b0b0b0;
  }
  
  .popular-searches {
    margin: 20px auto 0px auto;
    width: 70%;
  }
  
  .popular-searches .title {
    font-size: 14px;
    color: #FFFFFF99;
  }
.image {
    position: relative;
    top: 4px;
    left: 2px;
  }
  .tag {
    background-color: #2C2F4B;
    padding: 5px 10px;
    border-radius: 15px;
    margin-left: 5px;
    cursor: pointer;
    font-size: 13px;
    color: #FFFFFF;
    box-shadow: 0px 5px 30px 0px #FFFFFF0D inset;
  }
  </style>
  