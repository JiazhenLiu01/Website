
<template>
  <div class="table-container">
    <a-table class="ant-table-striped" :data-source=data :columns="columns" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" >
     <template #headerCell="{ column }">
       <template v-if="column.key === 'organizationName'">
        <span style="color: #000000">Name</span>
       </template>
     </template>
     <template
       #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
     >
       <div style="padding: 8px">
         <a-input
           ref="searchInput"
           :placeholder="`Search ${column.dataIndex}`"
           :value="selectedKeys[0]"
           style="width: 188px; margin-bottom: 8px; display: block; "
           @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
           @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
         />
         <a-button
           type="primary"
           size="small"
           style="width: 90px; margin-right: 8px;    background-color: #145070;border-color: #145070;color: #fff;"
           @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
         >
           <template #icon><SearchOutlined /></template>
           Search
         </a-button>
         <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
           Reset
         </a-button>
       </div>
     </template>
     <template #customFilterIcon="{ filtered }">
       <search-outlined :style="{ color: filtered ? '#1890ff' : undefined }" />
     </template>
     <template #bodyCell="{ text, column,record }">
       <span v-if="searchText && searchedColumn === column.dataIndex">
         <template
           v-for="(fragment, i) in text
             .toString()
             .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
         >
           <mark
             v-if="fragment.toLowerCase() === searchText.toLowerCase()"
             :key="i"
             class="highlight"
           >
             {{ fragment }}
           </mark>
           <template v-else>{{ fragment }}</template>
         </template>
       </span>
       <a-button v-if="column.key === 'detail'" @click="redirectToAdditionalDetail(record)">
       Detail
       </a-button>
     </template>
   </a-table>
 </div>
 </template>
 <script>
 import { SearchOutlined } from '@ant-design/icons-vue';
 import { defineComponent, reactive, ref, toRefs } from 'vue';
 import axios from "axios";
//  const data = [{
//       key: '1',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     }, {
//       key: '2',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     }, {
//       key: '3',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     }, {
//       key: '4',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     },{
//       key: '5',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     },{
//       key: '6',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     },{
//       key: '7',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     },{
//       key: '8',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     },{
//       key: '9',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     },{
//       key: '10',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     },{
//       key: '11',
//       name: 'Mcdonald',
//       address: 'New York No. 1 Lake Park',
//       contact_person: 'Chris Kempczinski',
//     }];
let flag_a=0;
 export default defineComponent({
   components: {
     SearchOutlined,
   },
   async created() {
    try {
      if(flag_a!=1){const response = await axios.get("https://swen90016.herokuapp.com/donor/org");
      this.data = response.data;
      console.log(this.data);
      flag_a=1;}
    
     
    } catch (error) {
      console.error(error);
    }
  },
   methods: {
     redirectToAdditionalDetail(record) {
      console.log(111)
       // Use router.push to navigate to the new page
       this.$router.push({ name: "DonorAdditionalForm", params: {  userID: localStorage.getItem("userID"), donorID: record.donor_id } });    },
      //  this.$router.push({ name: "GroupDonoradditionalForm", params: { id: record.organization_id,userID: localStorage.getItem("userID") } });    
   },
   setup() {
     const state = reactive({
       searchText: '',
       searchedColumn: '',
     });
     const data = ref([]);
     const searchInput = ref();
     const columns = [{
       title: 'Name',
       dataIndex: 'organizationName',
       key: 'organizationName',
       customFilterDropdown: true,
       onFilter: (value, record) => record.organizationName.toString().toLowerCase().includes(value.toLowerCase()),
       onFilterDropdownVisibleChange: visible => {
         if (visible) {
           setTimeout(() => {
             searchInput.value.focus();
           }, 100);
         }
       },
     },{
       title: 'Address',
       dataIndex: 'headquartersAddress',
       key: 'headquartersAddress',
       customFilterDropdown: true,
       onFilter: (value, record) => record.headquartersAddress.toString().toLowerCase().includes(value.toLowerCase()),
       onFilterDropdownVisibleChange: visible => {
         if (visible) {
           setTimeout(() => {
             searchInput.value.focus();
           }, 100);
         }
       },
     },{
   title: 'Contact person',
   dataIndex: 'organizationContactPerson',
   key: 'organizationContactPerson',
 },{
   title: 'Detail',
   dataIndex: 'detail',
   key: 'detail',
 },
 ];
     const handleSearch = (selectedKeys, confirm, dataIndex) => {
       confirm();
       state.searchText = selectedKeys[0];
       state.searchedColumn = dataIndex;
     };
     const handleReset = clearFilters => {
       clearFilters({
         confirm: true,
       });
       state.searchText = '';
     };
     return {
       data,
       columns,
       handleSearch,
       handleReset,
       searchInput,
       ...toRefs(state),
     };
   },
 });
 </script>
 <style scoped>
 .highlight {
   background-color: #c7e1e0;
   padding: 0px;
 }

 .ant-table-striped :deep(.table-striped) td {
    background-color: rgba(137,199,208, 0.1);
    }

 
 .table-container {
   width: 280%; /* Set the width to twice the original size */
 }

 </style>