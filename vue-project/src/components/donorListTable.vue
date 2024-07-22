
<template>
 <div class="table-container">
  <a-table class="ant-table-striped" :data-source=data :columns="columns" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
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
// const data = [{
//   key: '1',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// }, {
//   key: '2',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// }, {
//   key: '3',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// }, {
//   key: '4',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// },{
//   key: '5',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// },{
//   key: '6',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// },{
//   key: '7',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// },{
//   key: '8',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// },{
//   key: '9',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// },{
//   key: '10',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// },{
//   key: '11',
//   name: 'John Brown',
//   age: 32,
//   phone_number: '0459563380',
//   email_address: 'JohnBrown@gmail.com',
//   address: 'New York No. 1 Lake Park',
// }];
let flag_o=0;


export default defineComponent({
  components: {
    SearchOutlined,
  },

  async created() {
    try {
      if(flag_o!=1){const response_o = await axios.get("https://swen90016.herokuapp.com/donor/individual");
      this.data = response_o.data;
      console.log(this.data);
      flag_o=1;}
    
     
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    redirectToAdditionalDetail(record) {
      // Use router.push to navigate to the new page
      this.$router.push({ name: "DonorAdditionalForm", params: {  userID: localStorage.getItem("userID"), donorID: record.donor_id } });    },
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
      dataIndex: 'name',
      key: 'name',
      customFilterDropdown: true,
      onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
  title: 'Phone number',
  dataIndex: 'phoneNumber',
  key:'phoneNumber',
},{
  title: 'Email address',
  dataIndex: 'email',
  key:'email',
},{
      title: 'Address',
      dataIndex: 'mailingAddress',
      key: 'mailingAddress',
      customFilterDropdown: true,
      onFilter: (value, record) => record.address.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
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
  width: 195%; /* Set the width to twice the original size */
}
</style>