<template>
  <div class="table-container">
    <a-table
      class="ant-table-striped"
      :data-source=data
      :columns="columns"
      :row-class-name="
        (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
      "
    >
      <template v-slot:headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span style="color: #000000">Name</span>
        </template>
      </template>
      <template
        #customFilterDropdown="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
      >
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="
              (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="
              width: 90px;
              margin-right: 8px;
              background-color: #145070;
              border-color: #145070;
              color: #fff;"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="handleReset(clearFilters)"
          >
            Reset
          </a-button>
        </div>
      </template>
      <template #customFilterIcon="{ filtered }">
        <search-outlined :style="{ color: filtered ? '#1890ff' : undefined }" />
      </template>
      <template v-slot:bodyCell="{ record, text, column }">
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
        <a-button
          v-if="column.key === 'detail'"
          @click="redirectToAdditionalDetail(record)"
        >
          Detail
        </a-button>

        <!--  -->
        <!-- <a-button
          v-if="column.key === 'aid_distribution'"
          @click="redirectToAidDistribution(record.key)"
        >
          Aid Distribution
        </a-button> -->
        <div v-if="column.key === 'aid_distribution'">
          <AidDistribution :rowKey="record.key" />
          <p>{{ record.key }}</p>
        </div>
      </template>
      <template #familyMembers="{ text }">
        <ul>
          <li v-for="member in text" :key="member.name">
            {{ member.name }} / {{ member.age }}
          </li>
        </ul>
      </template>
    </a-table>
  </div>
</template>
<script>
import { SearchOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
import AidDistribution from "./Materials/AidDistribution.vue";
import axios from "axios";

// const data = [
  // {
  //   key: "1",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "2",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "3",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "4",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "5",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "6",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "7",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "8",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "9",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "10",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  // {
  //   key: "11",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
// ];
let flag_r=0;
export default defineComponent({
  components: {
    SearchOutlined,
    AidDistribution,
  },
  
  async created() {
    try {
      if(flag_r!=1){const response = await axios.get("https://swen90016.herokuapp.com/recipient");
      this.data = response.data;
      console.log(this.data);
      flag_r=1;}
    
      
    } catch (error) {
      console.error(error);
    }
  },

  //   key: "11",
  //   name: "John Brown",
  //   age: 32,
  //   total_family_member: 3,
  //   address: "New York No. 1 Lake Park",
  //   familyMembers: [
  //     { name: "Jane Smith", age: 32 },
  //     { name: "Emily Smith", age: 8 },
  //     { name: "Michael Smith", age: 6 },
  //   ],
  // },
  methods: {
    redirectToAdditionalDetail(record) {
      // Use router.push to navigate to the new page
      
      this.$router.push({ name: "AidRecipientAdditionalForm", params: { userID: localStorage.getItem("userID"),recipientID: record.recepients_id } });
    },
    redirectToAidDistribution(id) {
      // Use router.push to navigate to the new page
      // this.$router.push({ name: "AidRecipientAdditionalForm" });
      console.log(id);
    },
  },
  setup() {
    const state = reactive({
      searchText: "",
      searchedColumn: "",
    });
    const searchInput = ref();
    const data = ref([]);
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        customFilterDropdown: true,
        onFilter: (value, record) =>
          record.name.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Total family member",
        dataIndex: "totalFamilyMembers",
        key: "totalFamilyMembers",
      },
      {
        title: "Address",
        dataIndex: "mailingAddress",
        key: "mailingAddress",
        customFilterDropdown: true,
        onFilter: (value, record) =>
          record.mailingAddress
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "Family member name/ age",
        dataIndex: "familyMembers",
        key: "familyMembers",
        slots: { customRender: "familyMembers" },
        customFilterDropdown: true,
        onFilter: (value, record) => {
          const names = record.familyMembers.map((member) =>
            member.name.toLowerCase()
          );
          return names.includes(value.toLowerCase());
        },
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "Detail",
        dataIndex: "detail",
        key: "detail",
      },
      {
        title: "Aid",
        dataIndex: "aid_distribution",
        key: "aid_distribution",
      },
    ];
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };
    const handleReset = (clearFilters) => {
      clearFilters({
        confirm: true,
      });
      state.searchText = "";
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
  background-color: rgba(137, 199, 208, 0.1);
}
.table-container {
  width: 130%; /* Set the width to twice the original size */

}
</style>