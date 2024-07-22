<template>
  <div>
    <h2>Additional Organization Donor Details</h2>
  </div>
  <div class="basicInfo">
    <div class="donorDetails">
      <a-avatar :size="150">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <div class="donorInfo">
        <a-list size="medium">
          <a-list-item v-for="(item, index) in donorData" :key="index">
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
      <h4>Donor Detailed Information</h4>
    </div>
    <div class="detail">
      <div class="flex-container">
        <a-list size="medium" class="column">
          <a-list-item v-for="(item, index) in detailData.filter((_, i) => i % 2 === 0)" :key="index">
            <div class="listItemContent">
              <span class="listItemTitle">{{ item.title }}</span>
              <span class="listItemDescription">{{ item.description }}</span>
            </div>
          </a-list-item>
        </a-list>
        <a-list size="medium" class="column">
          <a-list-item v-for="(item, index) in detailData.filter((_, i) => i % 2 !== 0)" :key="index">
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
      <h4>Identify Document File</h4>
    </div>
    <div v-for="group in fileData" :key="'group-' + group.group" class="identify-file">
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
  <div class="history-wrapper">
    <div class="history-header">
      <h4>Donation History</h4>
    </div>
    <div class="donationHistory">
      <a-collapse>
        <a-collapse-panel class="custom-panel-header" header="2023 Donation History" key="1">
          <div class="titles-row">
            <div v-for="(title, index) in uniqueTitles" :key="'title-' + index" class="listItemTitle"
              :style="{ width: '300px' }">{{ title }}</div>
          </div>
          <div v-for="(row, rowIndex) in organizedHistoryData" :key="'row-' + rowIndex" class="descriptions-row">
            <div v-for="(item, index) in row" :key="'desc-' + rowIndex + '-' + index" class="listItemDescription"
              :style="{ width: '300px'}">
              <div class="description-text">{{ item.description }}</div>
              <hr class="divider" />
            </div>
          </div>
        </a-collapse-panel>
        <a-collapse-panel class="custom-panel-header" header="2022 Donation History2" key="2">
          <p>Panel 2 content</p>
        </a-collapse-panel>
        <a-collapse-panel class="custom-panel-header" header="2021 Donation History" key="3">
          <p>Panel 3 content</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>
  
<script>
import { UserOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    UserOutlined,
  },
  data() {
    return {
      donorData: [
        { title: 'Group Name:', description: 'GGG' },
        { title: 'Phone Number:', description: '+1 (123) 456-7890' },
        { title: 'Email Address:', description: 'johndoe@Google.com' },
      ],
      detailData: [
        { title: 'Scope Of business', description: 'Online Shop' },
        { title: 'FaceBook:', description: '' },
        { title: 'Website:', description: 'www.baidu.com' },
        { title: 'Group Location:', description: 'Melbourne' },
        { title: 'Address:', description: '12345 Rose St, Melbourne, VIC, Australia' },
      ],
      fileData: [
        {
          group: 1,
          imageUrl: 'https://th.bing.com/th/id/R.e6ba8cd143d75f9e6db2507a56bbefc3?rik=043RPsM3en%2ft1A&riu=http%3a%2f%2fwww.viplusdairy.com%2fuploadfile%2f2018%2f0815%2f20180815055344177.jpg&ehk=CD1PhHUVerVPROMQ1kh88smfZM7c4WXen5Qqy7IcQyc%3d&risl=&pid=ImgRaw&r=0',
          items: [
            { title: 'National Identify Document Type:', description: 'Driver' },
            { title: 'Australian Business Number:', description: '233333' },
            { title: 'National Identify Document Expired Date:', description: '02/02/2030' },
          ],
        },

      ],
      HistoryData: [
        { title: 'Time', description: ' 3.2.2023' },
        { title: 'Donation', description: 'Description 11 123123 123123123123 123123123 123123123' },
        { title: 'Recipient', description: 'stella' },
        { title: 'Post', description: 'shunfen' },
        { title: 'Time', description: '2/2/2023 ' },
        { title: 'Donation', description: 'Description 11 123123 123123123123 123123123 1231231232' },
        { title: 'Recipient', description: 'alash' },
        { title: 'Post', description: 'SHunFen' },
      ],
    };
  },
  methods: {
    goToNewRecipient() {
      // Use router.push to navigate to the new page
      this.$router.push({ name: "AidRecipientsAdd" });
    },
    filteredDescriptions(title) {
      return this.HistoryData.filter(item => item.title === title);
    },
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
.donorDetails {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.donorInfo {
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

.history-wrapper {
  position: relative;
  margin-top: 40px;
  margin-left: 200px;
  width: 80%;
}

.history-header {
  margin: 0;
  padding: 0 10px;
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
}

.custom-panel-header {
  background-color: #8DBF21;
  border-radius: 4px;
}


.titles-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.listItemTitle {
  font-weight: bold;
  text-align: center;
}

.descriptions-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.listItemDescription {
  text-align: center;
  max-height: 100px; 
  overflow: auto;
}

.description-text {
  word-break: break-word;
}

.divider {
    border-top: 1px solid #f60202;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
  


