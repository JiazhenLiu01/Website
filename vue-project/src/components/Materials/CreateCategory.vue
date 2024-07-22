<template>
  <div>
    <a-button class="createcategory" type="primary" @click="showModal">Create Category</a-button>
    <a-modal v-model:visible="visible" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          >Submit</a-button
        >
      </template>
      <h1>Create Category</h1>
      <div class="id_form">
        <a-form
          :model="formState"
          name="time_related_controls"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item name="name" label="Name" v-bind="config">
            <a-input v-model:value="formState['name']" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>

  <!-- Card content -->
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import axios from 'axios'; // Import axios


export default defineComponent({
  components: {
    InboxOutlined,
  },
  setup() {
    const loading = ref(false);
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = () => {
      loading.value = true;
      console.log(formState); // 在这里打印formState对象，该对象包含所有的input信息
      setTimeout(() => {
        loading.value = false;
        visible.value = false;
      }, 2000);
      axios.post('https://swen90016.herokuapp.com/request/category', formState)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          loading.value = false;
          visible.value = false;
        });
    };

    const handleCancel = () => {
      visible.value = false;
    };
    const formState = reactive({
      name: "",
    });



    const config = {
      rules: [
        {
          type: "string",
          required: true,
          message: "Please select time!",
        },
      ],
    };

    const onFinish = (values) => {
      console.log("Success:", values, formState);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      loading,
      visible,
      formState,
      showModal,
      handleOk,
      handleCancel,
      onFinish,
      onFinishFailed,
      config,
    };
  },
});
</script>

<style scoped>
  .createcategory {
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
</style>
