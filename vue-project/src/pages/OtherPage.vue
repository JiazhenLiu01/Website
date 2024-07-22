<template>
  <div>
    <a-button type="primary" @click="showModal"
      >Open Modal with customized footer</a-button
    >
    <a-modal v-model:visible="visible" width="1000px" @ok="handleOk">
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
      <h1>New Materials</h1>
      <div class="id_form">
        <a-form
          :model="formState"
          name="time_related_controls"
          v-bind="formItemLayout"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-row>
            <a-col :span="8">
              <a-form-item name="name" label="Name" v-bind="config">
                <a-input v-model:value="formState['name']" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item name="Category" label="Category" v-bind="config">
                <a-input v-model:value="formState['Category']" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item name="Number" label="Number" v-bind="config">
                <a-input v-model:value="formState['Number']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item name="Donors" label="Donors" v-bind="config">
                <a-input v-model:value="formState['Donors']" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="Brand" label="Brand" v-bind="config">
                <a-input v-model:value="formState['Brand']" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-divider />
          <div class="bot">
            <span>Identity document</span>
            <span>Upload a document for identity</span>
            <a-form-item name="identityDocument">
              <a-upload-dragger
                v-model:fileList="formState.fileList"
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="(info) => handleChange(info, formState)"
                @drop="handleDrop"
                :form-state="formState"
              >
                <p class="ant-upload-drag-icon">
                  <inbox-outlined></inbox-outlined>
                </p>
                <p class="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p class="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </a-upload-dragger>
            </a-form-item>
          </div>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    InboxOutlined,
  },
  setup(props, { emit }) {
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
    };

    const handleCancel = () => {
      visible.value = false;
    };
    const formState = reactive({
      name: "",
      Category: "",
      Number: "",
      Donors: "",
      Brand: "",
      identityDocument: null,
    });

    const handleChange = (info) => {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        const reader = new FileReader();
        reader.onload = function (e) {
          formState.identityDocument = e.target.result;
          console.log(e.target.result);
        };
        reader.readAsDataURL(info.file.originFileObj);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
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
      formItemLayout,
      config,
      handleChange,
      fileList: ref([]),
      handleDrop: (e) => {
        console.log(e);
      },
    };
  },
});
</script>
