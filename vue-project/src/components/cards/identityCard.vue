<template>
  <div>
    <button class="button save-information" @click="handleAddNewCard">
      + New identity
    </button>
    <div v-for="(formState, index) in cards" :key="index">
      <a-card class="card card-3">
        <h1>Identity info</h1>

        <div class="id_form">
          <a-form
            :model="formState"
            name="time_related_controls"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-row>
              <a-col :span="12">
                <a-form-item
                  name="cardNumber"
                  label="Card Number"
                  v-bind="config"
                >
                  <a-input v-model:value="formState['cardNumber']" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item name="idType" label="ID Type" v-bind="config">
                  <a-select v-model:value="formState['idType']">
                    <a-select-option value="passport">Passport</a-select-option>
                    <a-select-option value="driverLicense"
                      >Driver License</a-select-option
                    >
                    <a-select-option value="idCard">ID Card</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item
                  name="nationality"
                  label="Nationality"
                  v-bind="config"
                >
                  <a-select v-model:value="formState['nationality']">
                    <a-select-option value="Australia">Australia</a-select-option>

                    <a-select-option value="China">China</a-select-option>
                    <a-select-option value="United States"
                      >United States</a-select-option
                    >
                    <a-select-option value="United Kingdom"
                      >United Kingdom</a-select-option
                    >
                    <a-select-option value="France">France</a-select-option>
                    <a-select-option value="Germany">Germany</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  name="date-picker"
                  label="Expire Date"
                  v-bind="config"
                >
                  <a-date-picker
                    v-model:value="formState['date-picker']"
                    value-format="YYYY-MM-DD"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <a-divider />
            <div class="bot">
              <span>Identity document </span>
              <span> Upload a document for identity</span>
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

<script>
import { defineComponent, reactive, watchEffect, ref } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

export default defineComponent({
  components: {
    InboxOutlined,
  },
  setup(props, { emit }) {
    const cards = reactive([createFormState()]); // 初始化cards数组，每个元素都是一个新的formState
    const handleChange = (info, formState) => {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        const reader = new FileReader();
        reader.onload = function (e) {
          formState.identityDocument = e.target.result;
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

    const handleAddNewCard = () => {
      const newFormState = createFormState();
      cards.push(newFormState); // 添加新的card时，为它创建一个新的formState
      console.log("Current form state:", newFormState);

      watchEffect(() => {
        emit("updateIdentityInfo", {
          identityInfo: {
            index: cards.length - 1,
            cardNumber: newFormState.cardNumber,
            idType: newFormState.idType,
            nationality: newFormState.nationality,
            datePicker: newFormState["date-picker"],
            identityDocument: newFormState.identityDocument,
          },
        });
      });
    };

    const config = {
      // rules: [
      //   {
      //     type: "string",
      //     required: true,
      //     message: "Please select time!",
      //   },
      // ],
    };
    const rangeConfig = {
      // rules: [
      //   {
      //     type: "array",
      //     required: true,
      //     message: "Please select time!",
      //   },
      // ],
    };
    const formState = reactive({
      identityDocument: null,
    });
    const onFinish = (values) => {
      console.log("Success:", values, formState);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    cards.forEach((formState, index) => {
      watchEffect(() => {
        emit("updateIdentityInfo", {
          identityInfo: {
            index,
            cardNumber: formState.cardNumber,
            idType: formState.idType,
            nationality: formState.nationality,
            datePicker: formState["date-picker"],
            identityDocument: formState.identityDocument,
          },
        });
      });
    });
    return {
      // formState,
      onFinish,
      onFinishFailed,
      config,
      rangeConfig,
      cards,
      handleAddNewCard,
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
    cardNumber: "",
    idType: "",
    nationality: "",
    "date-picker": "",
    identityDocument: null,
    // beforeUpload(file) {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       // Use reader.result to get the base64 data
    //       console.log(reader.result); // Log the base64 string here
    //       resolve(reader.result);
    //     };
    //     reader.onerror = reject;
    //     reader.readAsDataURL(file);
    //   }).then((result) => {
    //     formState.identityDocument = result;
    //     // Prevent upload
    //     return false;
    //   });
    // },
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
