<template>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8" v-for="(item, index) in donationItems" :key="index" class="card-col">
        <a-card :class="stockStatus(item.totalnumber)" :bordered="false" body-style="display: flex; align-items: center; justify-content: center;">
          <template #title>
            <div class="card-title">{{ item.name }}</div>
          </template>
          <p class="card-content">{{ item.totalnumber }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      donationItems: []
    }
  },
  async created() {
    try {
      const response = await axios.get('https://swen90016.herokuapp.com/request/category');
      console.log(response)
      this.donationItems = response.data;
      console.log(this.donationItems)
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    stockStatus(totalnumber) {
      if (totalnumber < 100) {
        return 'low-stock';
      } else if (totalnumber < 200) {
        return 'medium-stock';
      } else if (totalnumber >= 200) {
        return 'high-stock';
      } 
      else {
        return '';
      }
    }
  }
}
</script>
<!-- <script>
import axios from 'axios';

export default {
  data() {
    return {
      donationItems: []
    }
  },
  async created() {
    try {
      const response = await axios.get('http://your-api-url.com/donation_items');
      this.donationItems = response.data.donation_items;
    } catch (error) {
      console.error(error);
    }
  }
}
</script> -->

<style scoped>
.card-col {
  margin-bottom: 16px;
}

.card-title {
  text-align: center;
}

.card-content {
  text-align: center;
  width: 100%;
}

.low-stock {
  background-color: rgb(255, 136, 136);
}
.medium-stock {
  background-color: rgb(247, 247, 140);
}
.high-stock {
  background-color: rgb(140, 247, 165);
}
</style>