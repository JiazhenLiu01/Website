<template>
  <div>
    <div>
      <a-card class="card card-3">
        <h1>Identity info</h1>

        <div class="id_form">
          <a-form
            :model="formState"
            name="time_related_controls"
            v-bind="formItemLayout"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-row>
              <a-col :span="24">
                <a-form-item
                  name="auBussinessNo"
                  label="Australia Bussiness Number"
                  v-bind="config"
                >
                  <a-input v-model:value="formState['auBussinessNo']" />
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
        <!-- Card content -->
      </a-card>
    </div>
  </div>
</template>

<!-- Rest of your code... -->

<script>
import { defineComponent, reactive, ref ,watchEffect} from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

export default defineComponent({
  components: {
    InboxOutlined,
  },
  setup(props, { emit }) {
    const formState = reactive(createFormState()); 

    const handleChange = (info) => {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        const reader = new FileReader();
        reader.onload = function (e) {
          formState.identityDocument = e.target.result;
          // console.log(e.target.result)
        };
        reader.readAsDataURL(info.file.originFileObj);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } 
      // else if (status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
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
    watchEffect(() => {
    emit("updateRegistrationInfo", {
      registrationInfo: {
        auBussinessNo: formState.auBussinessNo,
        identityDocument: formState.identityDocument,
      },
    });
  });

    return {
      onFinish,
      onFinishFailed,
      formItemLayout,
      config,
      formState,
      handleChange,
      fileList: ref([]),
      handleDrop: (e) => {
        console.log(e);
      },
    };
  },
});
function createFormState() {
  const formState = reactive({
    auBussinessNo: "",
    identityDocument: null,
  });

  return formState;
}
</script>

<style>
/* .ant-form-item-control-input-content > .ant-row > .ant-col + .ant-col {
  margin-top: px;
} */
/* card 3 */
.card {
  margin-bottom: 30px;
  width: 95%;
}

.card-3 {
  width: 95%;
  height: 718.52px; /* Adjust the height for card 3 */
}

.button {
  display: inline-block;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  padding: 16px 24px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.save-information {
  background-color: #145070;
  color: #fff;
}

.save-information:hover {
  background-color: #0b3750;
}
</style>
