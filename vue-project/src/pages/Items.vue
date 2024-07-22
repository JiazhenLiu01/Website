<template>
  <h1 class="title">
     Items
  </h1>
  <div class= "categorybutton">
          <CreateCategory />
        </div>
        <div class= "kitbutton">
          <CreateKit />
        </div>
        <div class= "materialbutton">
          <CreatMaterials />
        </div>
        <div class= "itembutton">
          <addItem />
        </div>
  <div class="tab">
      <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="Items"><ItemTable /></a-tab-pane>
    <a-tab-pane key="2" tab="Kits"><KitTable /></a-tab-pane>
  </a-tabs>
  </div>
</template>
<script >

import ItemTable from "../components/ItemList.vue"
import KitTable from "../components/KitList.vue"
import axios from "axios";
import { Button } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import CreatMaterials from "../components/Materials/CreatMaterials.vue";
  import CreateCategory from "../components/Materials/CreateCategory.vue";
  import CreateKit from "../components/Materials/CreateKit.vue";
  import addItem from "../components/Materials/AddItem.vue";



export default {
  components: {
    ItemTable,
    KitTable,
    CreatMaterials,
    CreateCategory,
    CreateKit,
    addItem,
    'a-button': Button,
  },
  data() {
    return {
      aidRecipients: [],
    };
  },

  methods: {
  goToNewDonor() {
    // Use router.push to navigate to the new page
    this.$router.push({ name: "DonorAdd" ,params: { userID: localStorage.getItem("userID") }});    },
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
.button-container-add-donor {
  position: absolute;
  top: 70px;
  right: 60px;
}

.custom-button-add-donor {
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

.custom-button-add-donor:hover,
.custom-button-add-donor:focus {
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

.categorybutton {
  position: absolute;
  top: 70px;
  left: 350px;
}

.kitbutton {
  position: absolute;
  top: 70px;
  left: 550px;
}

.materialbutton {
  position: absolute;
  top: 70px;
  left: 750px;
}

.itembutton {
  position: absolute;
  top: 70px;
  left: 950px;
}



</style>

