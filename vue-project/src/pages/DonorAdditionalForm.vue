<template>
  <div>
    <h2>Additional Donor Details</h2>
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
              <span class="listItemTitle">{{ item.title }}</span>
              <span class="listItemDescription">{{ item.description }}</span>
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
    <div v-if="identityDocuments.length === 0" class="blank">
      <div class="file-list">
        <!-- You can add placeholder text or image here -->
        <p>No identity documents available.</p>
      </div>

    </div>
    
    <div v-else v-for="group in identityDocuments" :key="'group-' + group.group" class="identify-file">
      
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
        <a-collapse-panel header="2023 Donation History" key="1">
          <a-list size="medium">
            <a-list-item v-for="(item, index) in historyData" :key="index">
              <div class="listItemContent">
                <div class="row">
                  <span class="listItemTitle">Name:</span>
                  <span class="listItemDescription">{{ item.name }}</span>
                </div>
                <div class="row">
                  <span class="listItemTitle">Number:</span>
                  <span class="listItemDescription">{{ item.number }}</span>
                </div>
              </div>
            </a-list-item>
          </a-list>
        </a-collapse-panel>
        <a-collapse-panel header="2022 Donation History2" key="2">
          <p>Panel 2 content</p>
        </a-collapse-panel>
        <a-collapse-panel header="2021 Donation History" key="3">
          <p>Panel 3 content</p>
        </a-collapse-panel>
      </a-collapse>
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
      donorData: [

      ],
      detailData: [

      ],
      fileData: [

      ],
      historyData: [

      ],
      identityDocuments: [],
    };
  },
  async created() {
    try {
      const donorID = this.$route.params.donorID;


      const backendData = await axios.get(`https://swen90016.herokuapp.com/donor/ID/${donorID}`);

      console.log(backendData)
      this.formatDataFromBackend(backendData);
      this.donationItems = backendData.data;
      console.log(this.donationItems)
    } catch (error) {
      console.error(error);
    }
  },
  methods: {

    formatDataFromBackend(backendData) {
      const data = backendData.data;  
      const isOrganization = data.isOrganization;

      if (!isOrganization) {
        
        const donorData = [
          { title: 'Donor Name:', description: data.name },

        ];

        
        const detailData = [
          { title: 'Age:', description: data.age },
          { title: 'Contact Number:', description: data.phoneNumber },
          { title: 'Email Address:', description: data.email },
          { title: 'Address:', description: data.mailingAddress },
        ];


        const mainfileData = data.identityInfo && data.identityInfo.length > 0
          ? data.identityInfo.map((doc, index) => ({
            group: index + 1,
            imageUrl: doc.image, 
            items: [
              { title: 'Nationality:', description: doc.nationality },
              { title: 'Identity Document Type:', description: doc.type },
              { title: 'Identity Document Number:', description: doc.number },
              { title: 'Identity Document Expiry Date:', description: doc.expiryDate },
            ],
          }))
          : [];


        const historyData = data.items && data.items.length > 0
          ? data.items.map((doc, index) => ({
            group: index + 1,
            name: doc.name,
            number: doc.number,
          }))
          : [];


        this.donorData = donorData;
        this.detailData = detailData;
        this.identityDocuments = mainfileData;
        this.historyData = historyData;
      } else {
        const donorData = [
          { title: 'Organization Name:', description: data.organizationName },
        ];
        const detailData = [
          { title: 'Australian Business Number:', description: data.auBussinessNo },
          { title: 'Principal Contact Person:', description: data.organizationContactPerson },
          { title: 'Address(head quarter):', description: data.headquartersAddress },
        ];
        const mainfileData = data.identityInfo && data.identityInfo.length > 0
          ? data.identityInfo.map((doc, index) => ({
            group: index + 1,
            imageUrl: doc.identityDocument, 
            items: [
              { title: 'Identity Document Type:', description: doc.type },
              { title: 'Identity Document Number:', description: doc.number },
              { title: 'Identity Document Expiry Date:', description: doc.expiryDate },
            ],
          }))
          : [];
        const historyData = data.item && data.item.length > 0
          ? data.item.map((doc, index) => ({
            group: index + 1,

            items: [
              { title: 'Name:', description: data.name },
              { title: 'Number:', description: data.number },
            ],
          }))
          : [];


        this.donorData = donorData;
        this.detailData = detailData;
        this.identityDocuments = mainfileData;
        this.historyData = historyData;

      }



    }
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
.blank {
  /* Inherits styles from .donorIdentify */
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
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
  height: 50px;
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
</style>

