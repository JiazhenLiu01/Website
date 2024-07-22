<template>
  <h1>Basic info</h1>
  <!-- update photo -->

  <div class="base_input">
    <a-row class="name-age-row">
      <a-col :span="12">
        <!-- :labelCol="{ span: 4, style: { fontSize: '30px' } }" -->

        <a-form-item
          label="Name"
          :rules="[
        // {
        //   required: true,
        //   message: 'Please enter the address',
        // },
      ]"
        >
          <a-input
            class="custom-input"
            :value="name"
            placeholder="Please enter the name"
            @change="updateName"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Age"
        >
          <a-input
            class="custom-input"
            :value="age"
            placeholder="Please enter the age"
            @change="updateAge"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
  <div class="contact_input">
    <a-form-item label="Address" >
      <a-input
        class="address-input"
        :value="address"
        placeholder="Please enter the address"
        @change="updateAddress"
      />
    </a-form-item>
  </div>

  <!-- Card content -->
</template>
<script>
export default {
  data() {
    return {
      name: "",
      age: "",
      address: "",
    };
  },
  watch: {
    name: {
      handler(val) {
        this.updateInfo();
      },
    },
    age: {
      handler(val) {
        this.updateInfo();
      },
    },
    address: {
      handler(val) {
        this.updateInfo();
      },
    },
  },
  methods: {
    updateName(event) {
      this.name = event.target.value;
      this.updateInfo();
    },
    updateAge(event) {
      this.age = event.target.value;
      this.updateInfo();
    },
    updateAddress(event) {
      this.address = event.target.value;
      this.updateInfo();
    },
    updateInfo() {
      this.$nextTick(() => {
        this.$emit("updateInfo", {
          basicInfo: {
            name: this.name,
            age: this.age,
          },
          contactInfo: {
            address: this.address,
          },
        });
      });
    },
  },
};
</script>


