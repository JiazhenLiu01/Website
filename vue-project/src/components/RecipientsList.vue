<template>
    <div>
      <h2>Recipients</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipient in recipients" :key="recipient.id">
            <td>{{ recipient.id }}</td>
            <td>{{ recipient.name }}</td>
            <td>{{ recipient.age }}</td>
            <td>{{ recipient.email }}</td>
            <td>{{ recipient.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        recipients: [],
      };
    },
    async created() {
      try {
        const response = await axios.get("http://localhost:8080/client");
        
        this.recipients = response.data;
        console.log(this.recipients);
      } catch (error) {
        console.error("Failed to fetch recipients:", error);
      }
    },
  };
  </script>
  