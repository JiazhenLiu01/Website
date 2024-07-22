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
    <a-form :model="formState">
      <a-form-item>
        <a-radio-group v-model:value="formState.view">
          <a-radio-button value="people">People</a-radio-button>
          <a-radio-button value="organization">Organization</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <div v-if="formState.view == 'people'">
          <ContactCard @updateInfo="updateInfo" />

          <IdentityInfoCard @updateIdentityInfo="updateIdentityInfo" />
        </div>
        <div v-if="formState.view == 'organization'">
          <!-- a-card 4-5 components -->
          <a-card>
            <obasicCard @updateOInfo="updateOInfo" />

            <!-- <obasicCard /> -->
          </a-card>
          <RegistrationInfoCard
            @updateRegistrationInfo="updateRegistrationInfo"
          />
        </div>
      </a-form-item>
      <button class="button save-information" @click="handleSubmit">
        Submit
      </button>
      <button class="button clear-all" @click="backfunc">Back</button>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { toRaw } from "vue";
import { UploadDragger } from "ant-design-vue";

import IdentityInfoCard from "../components/cards/identityCard.vue";
import ContactCard from "../components/cards/contactCard.vue";

import RegistrationInfoCard from "../components/cards/registrationInfoCard.vue";
import obasicCard from "../components/cards/obasicCard.vue";
import axios from "axios";

export default defineComponent({
  components: {
    ContactCard,
    IdentityInfoCard,
    RegistrationInfoCard,
    obasicCard,
  },
  data() {
    return {
      basicInfo: reactive({}),
      contactInfo: reactive({}),
      identityInfo: reactive({}),
      organization: reactive({}),
      registrationInfo: reactive({}),
    };
  },
  setup() {
    const formState = reactive({
      view: "people",
    });
    return {
      formState,
    };
  },
  methods: {
    updateIdentityInfo(info) {
      // Here you might want to handle the received info according to your needs
      // For instance, if you want to overwrite the info with the newest data, you could do:
      this.identityInfo[info.identityInfo.index] = info.identityInfo;
    },
    updateRegistrationInfo(info) {
      // Here you might want to handle the received info according to your needs
      // For instance, if you want to overwrite the info with the newest data, you could do:
      console.log(info);
      this.registrationInfo = info.registrationInfo;
    },

    handleSubmit() {
      const data = {
        basicInfo: this.basicInfo,
        contactInfo: this.contactInfo,
        identityInfo: this.identityInfo,
        organization: this.organization,
        registrationInfo: this.registrationInfo,
      };
      if (this.formState.view == "people") {
        console.log(toRaw(this.basicInfo));
        console.log(toRaw(this.contactInfo));
        console.log(toRaw(this.identityInfo));

        const peopleData = {
          isOrganization: false,
          name: this.basicInfo.name,
          age: this.basicInfo.age,
          email: this.contactInfo.email,
          mailingAddress: this.contactInfo.address,
          phoneNumber: this.contactInfo.phone,
          preferredCommunication: this.contactInfo.pc,
          identityInfo: Object.values(this.identityInfo),
        };
        console.log(peopleData);

        axios({
          method: "post",
          url: "https://swen90016.herokuapp.com/donor",
          data: peopleData,
        })
          .then((response) => {
            // handle success
            this.$router.push({
              name: "DonorList",
              params: { userID: localStorage.getItem("userID") },
            });

            console.log(response);
          })
          .catch((error) => {
            // handle error
            this.$message.error("Failed to submit form");

            console.log(error);
          });
      } else if (this.formState.view == "organization") {
        console.log(toRaw(this.organization));
        console.log(toRaw(this.registrationInfo));

        const OData = {
          isOrganization: true,
          organizationName: this.organization.basicInfo.name,
          organizationContactPerson: this.organization.basicInfo.contactPerson,
          headquartersAddress: this.organization.contactInfo.address,
          auBussinessNo: this.registrationInfo.auBussinessNo,
          identityDocument: this.registrationInfo.identityDocument,
        };
        console.log(OData);

        axios({
          method: "post",
          url: "https://swen90016.herokuapp.com/donor",
          data: OData,
        })
          .then((response) => {
            // handle success
            this.$router.push({
              name: "DonorList",
              params: { userID: localStorage.getItem("userID") },
            });

            console.log(response);
          })
          .catch((error) => {
            // handle error
            this.$message.error("Failed to submit form");

            console.log(error);
          });
      }
    },
    backfunc() {
      this.$router.push({
        name: "DonorList",
        params: { userID: localStorage.getItem("userID") },
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    updateInfo(info) {
      Object.assign(this.basicInfo, info.basicInfo);
      Object.assign(this.contactInfo, info.contactInfo);
    },
    updateOInfo(info) {
      Object.assign(this.organization, info);
    },

    // ... other methods ...
  },
});
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
