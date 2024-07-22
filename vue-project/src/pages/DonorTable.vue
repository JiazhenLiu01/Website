<template>
    <div>
      <h2>Donors</h2>
      <DataTable :value="donors" class="p-datatable-sm" dataKey="id">
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <!-- Add more columns based on the properties of your donor object -->
      </DataTable>
    </div>
  </template>
  
  <script>
  // Import axios and PrimeVue DataTable component
  import axios from "axios";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  
  export default {
    components: {
      DataTable,
      Column,
    },
    data() {
      return {
        donors: [],
      };
    },
    async mounted() {
      try {
        // Fetch donors data
        const response = await axios.get("your_api_endpoint_for_donors");
        this.donors = response.data;
      } catch (error) {
        console.error("Failed to fetch donors:", error);
      }
    },
  };
  </script>
  