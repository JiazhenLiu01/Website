<template>
    <div>
      <div style="margin-bottom: 16px">
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{ `Selected ${selectedRowKeys.length} items` }}
          </template>
        </span>
      </div>
      <div class="table-container">
      <a-table
      class="ant-table-striped"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :columns="columns"
    :data-source=data
    @change="onChange" 
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
  >
  <template #familyMembers="{ text }">
        <ul>
          <li v-for="member in text" :key="member.name">
            {{ member.name }} / {{ member.number }}
          </li>
        </ul>
      </template>
    </a-table>
    </div>
  </div>
  </template>
  <script>
  import { computed, defineComponent, reactive, toRefs, ref } from 'vue';
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
  import axios from "axios";
  const columns = [{
    title: 'Kit name',
    dataIndex: 'name',
    key: 'name',
  },{
        title: "component/ quantity",
        dataIndex: "item",
        key: "item",
        slots: { customRender: "familyMembers" },
      }];
//   const data = [{
//       key: '1',
//       kitname: 'warm clothing kit',
//       component: [
//       { name: "woollen socks", quantity: 32 },
//       { name: " large sized woollen shirts", quantity: 8 },
//       { name: "large blanket", quantity: 6 },
//     ],
// }, {
//       key: '2',
//       kitname: 'warm clothing kit',
//       component: [
//       { name: "woollen socks", quantity: 32 },
//       { name: " large sized woollen shirts", quantity: 8 },
//       { name: "large blanket", quantity: 6 },
//     ],
//     }, {
//       key: '3',
//       kitname: 'warm clothing kit',
//       component: [
//       { name: "woollen socks", quantity: 32 },
//       { name: " large sized woollen shirts", quantity: 8 },
//       { name: "large blanket", quantity: 6 },
//     ],
//     }, {
//       key: '4',
//       kitname: 'warm clothing kit',
//       component: [
//       { name: "woollen socks", quantity: 32 },
//       { name: " large sized woollen shirts", quantity: 8 },
//       { name: "large blanket", quantity: 6 },
//     ],
//     },{
//       key: '5',
//       kitname: 'warm clothing kit',
//       component: [
//       { name: "woollen socks", quantity: 32 },
//       { name: " large sized woollen shirts", quantity: 8 },
//       { name: "large blanket", quantity: 6 },
//     ],
//     }];
  let flag_k=0;
  export default defineComponent({
    
    async created() {
    try {
      if(flag_k!=1){const response = await axios.get("https://swen90016.herokuapp.com/request/kit");
      this.data = response.data;
      console.log(this.data);
      flag_k=1;}
    
      
    } catch (error) {
      console.error(error);
    }
  },
    methods: {
     redirectToAdditionalDetail() {
       // Use router.push to navigate to the new page
       this.$router.push({ name: "GroupDonoradditionalForm" ,params: { userID: localStorage.getItem("userID") }});    },
    getStatusArray(status) {
      if (status.includes(',')) {
        // 如果状态包含逗号，则将其分割为数组
        return status.split(',').map(s => s.trim());
      } else {
        // 否则，将状态放入单元素数组中
        return [status.trim()];
      }
    },
    getTagColor(status) {
      if (status === 'Awaiting Donation') {
        return 'green';
      } else if (status === 'ERROR') {
        return 'red';
      } else if (status === 'Received') {
        return 'yellow';
      } else if (status === 'Donated') {
        return 'blue';
      } else {
        return 'purple';
      }
    },
  },
    setup() {
      const data = ref([]);
      const state = reactive({
        selectedRowKeys: [],
        // Check here to configure the default column
        loading: false,
      });
      const hasSelected = computed(() => state.selectedRowKeys.length > 0);
      const onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
      };
      const start = () => {
        state.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
          state.loading = false;
          state.selectedRowKeys = [];
        }, 1000);
      };
  
      const start_wrap = () => {
        state.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
          state.loading = false;
          state.selectedRowKeys = [];
        }, 1000);
      };
      const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        state.selectedRowKeys = selectedRowKeys;
      };
      return {
        data,
        columns,
        hasSelected,
        ...toRefs(state),
        onChange,
        // func
        start,
        onSelectChange,
      };
    },
  });
  
  
  </script>
  
  <style scoped>
  
  .ant-table-striped :deep(.table-striped) td {
   background-color: rgba(137,199,208, 0.1);
   }
  
  
  
  
  
  .button-wrap-container {
    position: absolute;
    top: 450px;
    left: 5px;
  }
  
  
  .table-container {
   width: 320%; /* Set the width to twice the original size */
  }
  </style>