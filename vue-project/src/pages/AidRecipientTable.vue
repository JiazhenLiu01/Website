<template>
  <h1 class="title">
      Recipients
  </h1>
  <div class="button-container-add-recipient">
  <a-button type="primary" class="custom-button-add-recipient" @click="goToNewRecipient">
    + New Recipient
  </a-button>
  </div>
  <div class="tab">
      <TableRecipient />
  </div>
</template>
<script >

import TableRecipient from "../components/recipientListTable.vue"
import axios from "axios";
import { Button } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';



export default {
  components: {
    TableRecipient,
    'a-button': Button,
  },
  data() {
    return {
      aidRecipients: [],
    };
  },

  methods: {
  goToNewRecipient() {
    // Use router.push to navigate to the new page
    this.$router.push({ name: "AidRecipientsAdd" ,params: { userID: localStorage.getItem("userID") }});    },
},
  setup() {
      const value = ref('');
      const onSearch = searchValue => {
          console.log('use value', searchValue);
          console.log('or use this.value', value.value);
      };
      return {
          value,
          onSearch,
      };
      },
};


</script>
<style scoped>
.button-container-add-recipient {
  position: absolute;
  top: 70px;
  right: 400px;
}

.custom-button-add-recipient {
  background-color: #145070;
  border-color: #145070;
  color: #fff;
  font-family: "Segoe UI", sans-serif;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 20px;
  border-radius: 6px;
  width: 150px; /* Set the width */
  height: 40px; /* Set the height */
}

.custom-button-add-recipient:hover,
.custom-button-add-recipient:focus {
  background-color: #0d3a56; /* Adjust hover color */
  border-color: #0d3a56; /* Adjust hover border color */
}


body {
background-color: #F2F4F5;
}

.title{
  position: absolute;
  top: 70px;
  left: 60px;
  font-size: 30px;
}

.tab{
  position: absolute;
  top: 150px;
  left: 60px;
}


</style>

