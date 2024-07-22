<template>
    <CreatMaterials />
    <AidDistribution />
    <CreateCategory />
    <CreateKit />
    <addItem />


  </template>
  <script>
  import { defineComponent} from "vue";

  
  import CreatMaterials from "../components/Materials/CreatMaterials.vue";
  import AidDistribution from "../components/Materials/AidDistribution.vue";
  import CreateCategory from "../components/Materials/CreateCategory.vue";
  import CreateKit from "../components/Materials/CreateKit.vue";
  import addItem from "../components/Materials/AddItem.vue";


  export default defineComponent({
    components: {
      CreatMaterials,
      AidDistribution,
      CreateCategory,
      CreateKit,
      addItem
    },
  });
  </script>
  