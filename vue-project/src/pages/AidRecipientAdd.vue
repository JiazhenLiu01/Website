<template>
  <div class="top">
    <h1 class="new-heading">Add a recipient</h1>
    <p class="p1">Add personal info to manage it. You can</p>
    <p class="p2">edit contact details, upload id files and photos.</p>
    <p class="p3">
      You can also see a summary of the profiles after adding it..
    </p>
    <img class="image" src="../assets/img/1.png" alt="Your image description" />
  </div>

  <div class="container">
    <a-form>
      <a-card class="card card-1">
        <BasicInfoCard @updateInfo="updateInfo" />
      </a-card>

      <IdentityInfoCard @updateIdentityInfo="updateIdentityInfo" />
      <FamilyCard @updateFamilyInfo="updateFamilyInfo" />
      <button class="button save-information" @click="handleSubmit">
        Submit
      </button>
      <button class="button clear-all" @click="backfunc">
        Back
      </button>
    </a-form>
  </div>
</template>

<script>
import { Card } from "ant-design-vue";
import { UploadDragger } from "ant-design-vue";
import { toRaw } from "vue";

import BasicInfoCard from "../components/cards/basicCard.vue";
import IdentityInfoCard from "../components/cards/identityCard.vue";
import FamilyCard from "../components/cards/familyCard.vue";
import { reactive } from "vue";
import axios from "axios";

export default {
  components: {
    "a-card": Card,
    "a-upload-dragger": UploadDragger,

    BasicInfoCard,
    IdentityInfoCard,
    FamilyCard,
  },
  data() {
    return {
      name: "",
      age: "",
      address: "",
      fileList: [],
      uploadedFiles: [],
      avatarFileList: [],
      avatarUrl: "",
      previewVisible: false,
      previewImage: "",
      basicInfo: reactive({}),
      contactInfo: reactive({}),
      identityInfo: reactive({}),
      familyInfo: reactive({}),
    };
  },

  methods: {
    updateIdentityInfo(info) {
      // Here you might want to handle the received info according to your needs
      // For instance, if you want to overwrite the info with the newest data, you could do:
      this.identityInfo[info.identityInfo.index] = info.identityInfo;
      // console.log(11111);

      // console.log(info);
    },
    updateFamilyInfo(info) {
      // Here you might want to handle the received info according to your needs
      // For instance, if you want to overwrite the info with the newest data, you could do:
      this.familyInfo[info.familyInfo.index] = info.familyInfo;
      // console.log(11111);

      // console.log(info);
    },
    backfunc(){
      this.$router.push({ name: "AidRecipients", params: { userID: localStorage.getItem("userID") }});
    },
    handleSubmit() {
      const data = {
        name: this.basicInfo.name,
        age: this.basicInfo.age,
        address: this.contactInfo.address,
        identityInfo: Object.values(this.identityInfo),
        familyInfo: Object.values(this.familyInfo),
      };
      axios
        .post("https://swen90016.herokuapp.com/recipient/register", data)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "AidRecipients", params: { userID: localStorage.getItem("userID") }});

        })
        .catch((error) => {
          this.$message.error('Failed to submit form');
          console.error(error);
        });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    updateInfo(info) {
      Object.assign(this.basicInfo, info.basicInfo);
      Object.assign(this.contactInfo, info.contactInfo);
    },

    // ... other methods ...
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 30px;
}

/* .container{
  transform: scale(1.5);
} */

/* form的div */
.container span {
  font-size: 30px;
  margin-right: 600px; /* 调整此值以更改span之间的距离 */
}

.container {
  display: flex;
  flex-direction: column;
  gap: 16px; /* Adjust the gap between cards */
  justify-content: center; /* 将卡片水平居中对齐 */
  align-items: center; /* 将卡片垂直居中对齐 */
}

body {
  background-color: #f2f4f5;
}

/* top */
.top {
  width: 100%;
  height: 277px; /* Adjust the height for card 4 */
  margin-bottom: 40px; /* Adjust the margin for card 1 */
  background-color: white; /* Set the background color of the div */
  position: relative;
}

.top h1 {
  position: absolute;
}

.top .image {
  position: absolute;
}

.top h1 {
  position: absolute;
  top: 30px;
  left: 90px;
  font-size: 50px;
}

.top .p1 {
  position: absolute;
  top: 90px;
  left: 90px;
  font-size: 30px;
}
.top .p2 {
  position: absolute;
  top: 130px;
  left: 90px;
  font-size: 30px;
}
.top .p3 {
  position: absolute;
  top: 170px;
  left: 90px;
  font-size: 30px;
}

.top .image {
  position: absolute;
  bottom: 10px;
  right: 100px;
}

/* 按钮 */
.button {
  display: inline-block;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  padding: 16px 24px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.save-information {
  background-color: #145070;
  color: #fff;
}

.save-information:hover {
  background-color: #0b3750;
}

.clear-all {
  background-color: #fff;
  border: 2px solid #145070;
  color: #145070;
}

.clear-all:hover {
  background-color: #145070;
  color: #fff;
}

.container .span {
  font-size: 30px;
}
</style>
