<template>
  <div>
    <h2>Additional Aid Recipient Details</h2>
  </div>
  <div class="basicInfo">
    <div class="recipentDetails">
      <a-avatar :size="150">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <div class="mainRecipentInfo">
        <a-list size="medium">
          <a-list-item v-for="(item, index) in recipientData" :key="index">
            <div class="listItemContent">
              <div class="listItemTitle">{{ item.title }}</div>
              <div class="listItemDescription">{{ item.description }}</div>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>

  <div class="detail-wrapper">
    <div class="detail-header">
      <h4>Recipient Detailed Information</h4>
    </div>
    <div class="detail">
      <div class="flex-container">
        <a-list size="medium" class="column">
          <a-list-item v-for="(item, index) in recdetailData.filter((_, i) => i % 2 === 0)" :key="index">
            <div class="listItemContent">
              <span class="listItemTitle">{{ item.title }}</span>
              <span class="listItemDescription">{{ item.description }}</span>
            </div>
          </a-list-item>
        </a-list>
        <a-list size="medium" class="column">
          <a-list-item v-for="(item, index) in recdetailData.filter((_, i) => i % 2 !== 0)" :key="index">
            <div class="listItemContent">
              <span class="listItemTitle">{{ item.title }}</span>
              <span class="listItemDescription">{{ item.description }}</span>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
  <div class="file-wrapper">
    <div class="file-header">
      <h4>Main Identify Document File</h4>
    </div>
    <div v-if="mainfileData.length === 0" class="blank">
      <div class="file-list">
        <!-- You can add placeholder text or image here -->
        <p>No identity documents available.</p>
      </div>
    </div>
    <div v-else v-for="group in mainfileData" :key="'group-' + group.group" class="identify-file">
      <div class="donorIdentify">
        <a-list size="medium" class="file-list">
          <a-list-item v-for="(item, index) in group.items" :key="index">
            <div class="listItemContent" v-if="!item.imageUrl">
              <span class="listItemTitle">{{ item.title }}</span>
              <span class="listItemDescription">{{ item.description }}</span>
            </div>
          </a-list-item>
        </a-list>
        <div class="thumbnail-wrapper">
          <img class="thumbnail" :src="group.imageUrl" alt="thumbnail">
          <a :href="group.imageUrl" target="_blank">
            <a-button class="view-button" type="primary">
              View
            </a-button>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="family-file-wrapper">
    <div class="member-header">
      <h4>Family Identify Document File</h4>
    </div>
    <div v-if="familyfileData.length === 0" class="blank">
      <div class="file-list">
        <!-- You can add placeholder text or image here -->
        <p>No identity documents available.</p>
      </div>
    </div>
    <div v-else v-for="group in familyfileData" :key="'group-' + group.group" class="f-identify-file">
      <div v-if="group.items.length > 0" class="relationship-info">
        <span class="listItemTitle">{{ group.items[0].title }}</span>
        <span class="listItemDescription">{{ group.items[0].description }}</span>
      </div>
      <div class="donorIdentify">
        <a-list size="medium" class="file-list">
          <a-list-item v-for="(item, index) in group.items.slice(1)" :key="index">
            <div class="listItemContent" v-if="!item.imageUrl">
              <span class="listItemTitle">{{ item.title }}</span>
              <span class="listItemDescription">{{ item.description }}</span>
            </div>
          </a-list-item>
        </a-list>
        <div class="thumbnail-wrapper">
          <img class="thumbnail" :src="group.imageUrl" alt="thumbnail">
          <a :href="group.imageUrl" target="_blank">
            <a-button class="view-button" type="primary">
              View
            </a-button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { UserOutlined } from '@ant-design/icons-vue';
import axios from 'axios';

export default {
  components: {
    UserOutlined,
  },
  data() {
    return {
      recipientData: [

      ],
      recdetailData: [

      ],
      mainfileData: [

      ],
      familyfileData: [

      ],
    };
  },
  async created() {
    try {
      const recipientID = this.$route.params.recipientID;
  // axios.get(`/api/users/${userID}/donors/${donorID}`)
      const backendData = await axios.get(`https://swen90016.herokuapp.com/recipient/recipient/${recipientID}`);//访问/donor的时候会获取所有的id，我需要获得点击的特定的id
      console.log(backendData)
      this.formatDataFromBackend(backendData);
      this.donationItems = backendData.data;
      console.log(this.donationItems)
    } catch (error) {
      console.error(error);
    }
  },
  methods: {

    filteredDescriptions(title) {
      return this.HistoryData.filter(item => item.title === title);
    },
    formatDataFromBackend(backendData) {
      const data = backendData.data;  // 访问 backendData.data 而不是 backendData

      // donorData的处理
      const recipientData = [
        { title: 'Name:', description: data.name },
        { title: 'Total Family Members:', description: data.totalFamilyMembers },

      ];
      const recdetailData = [
        { title: 'Age:', description: data.age },
        
        { title: 'Address:', description: data.mailingAddress },
      ];
      const mainfileData = data.identityInfo && data.identityInfo.length > 0
        ? data.identityInfo.map((doc, index) => ({
          group: index + 1,
          imageUrl: doc.identityDocument, // 注意这里只是一个示例，可能需要你根据实际的URL地址进行修改
          items: [
            { title: 'Nationality:', description: doc.nationality },
            { title: 'Identity Document Type:', description: doc.idType },
            { title: 'Identity Document Number:', description: doc.cardNumber },
            { title: 'Identity Document Expiry Date:', description: doc.datePicker },
          ],
        }))
        : [];

        const familyfileData = data.familyMembers && data.familyMembers.length > 0
        ? data.familyMembers.map((doc, index) => ({
          group: index + 1,
          imageUrl: doc.identityDocument, // 注意这里只是一个示例，可能需要你根据实际的URL地址进行修改
          items: [
            { title: 'Family Member Relationship:', description: doc.relationship },
            { title: 'Name:', description: doc.name },
            { title: 'Age:', description: doc.age },
            { title: 'Nationality:', description: doc.nationality },
            { title: 'Identity Document Type:', description: doc.idType },
            { title: 'Identity Document Number:', description: doc.cardNumber },
            { title: 'Identity Document Expiry Date:', description: doc.datePicker },
          ],
        }))
        : [];




      // 更新数据
      this.recipientData = recipientData;
      this.recdetailData = recdetailData;
      this.mainfileData = mainfileData;
      this.familyfileData = familyfileData;

    }
  },
  computed: {
    uniqueTitles() {
      const titles = this.HistoryData.map(item => item.title);
      return Array.from(new Set(titles));
    },
    organizedHistoryData() {
      const organizedData = [];
      const itemsPerGroup = this.uniqueTitles.length;

      for (let i = 0; i < this.HistoryData.length; i += itemsPerGroup) {
        organizedData.push(this.HistoryData.slice(i, i + itemsPerGroup));
      }

      return organizedData;
    },
  },
};
</script>
  
<style scoped>
.recipentDetails {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.mainRecipentInfo {
  margin-left: 60px;
}

.listItemContent {
  display: flex;
}

.listItemTitle {
  margin-right: 5px;
  font-weight: bold;
  /* Make the list titles bold */
}

.detail {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;
  border: 2px solid black;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.column {
  width: 50%;
}

.detail-wrapper {
  position: relative;
  margin-top: 40px;
  margin-left: 200px;
  width: 80%;
}

.detail-header {
  margin: 0;
  padding: 0 10px;
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
}

.file-wrapper {
  position: relative;
  margin-top: 40px;
  margin-left: 200px;
  width: 80%;
}

.donorIdentify {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
}

.file-header {
  margin: 0;
  padding: 0 10px;
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
}

.file-list {
  flex: 1;
}

.thumbnail-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
}

.thumbnail {
  width: 200px;
  height: auto;
  border: 1px solid #03ffee00;
  margin-bottom: 10px;
}

.view-button {
  width: 100%;
}

.identify-file {
  margin-bottom: 30px;
}

.identify-file:last-child {
  margin-bottom: 0;
}
.blank {
  /* Inherits styles from .donorIdentify */
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
}
.f-identify-file {
  margin-bottom: 30px;
  position: relative;
}

.f-identify-file:last-child {
  margin-bottom: 0;
}


.listItemTitle {
  font-weight: bold;
  text-align: center;
}



.listItemDescription {
  text-align: center;
  max-height: 100px;
  overflow: auto;
}

.family-file-wrapper {
  position: relative;
  margin-top: 40px;
  margin-left: 200px;
  width: 80%;
}

.relationship-info {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #145070;
}
</style>
  



