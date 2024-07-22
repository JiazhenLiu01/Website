0
<template>
  <div>
    <a-button type="primary" @click="showModal">Aid Distribution</a-button>
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
      <h1>Aid Distribution</h1>
      <div class="id_form">
        <a-form
          :model="formState"
          name="time_related_controls"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-row>
            <a-col :span="24">
              <a-form-item name="Category" label="Category" v-bind="config">
                <a-select v-model:value="formState['Category']">
                  <a-select-option
                    v-for="item in categories"
                    :key="item._id"
                    :value="item._id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item label="Items">
            <div v-for="(i, index) in formState.item" :key="index">
              <!-- <a-input
                v-model:value="item.id"
                placeholder="Item Id"
                style="width: 60%; margin-right: 8px;"
              /> -->

              <a-select v-model:value="i.id">
                <a-select-option
                  v-for="it in items_name"
                  :key="it._id"
                  :value="it._id"
                >
                  {{ it.name }}
                </a-select-option>
              </a-select>

              <a-input-number
                v-model:value="i.number"
                min="1"
                style="width: 30%; margin-right: 8px"
              />
              <a-button type="danger" @click="removeItem(index)"
                >Remove</a-button
              >
            </div>
            <a-button @click="addItem">Add Item</a-button>
          </a-form-item>

          <a-row>
            <a-col :span="24">
              <a-form-item name="Kit" label="Kit" v-bind="config">
                <a-select v-model:value="formState['kit']">
                  <a-select-option
                    v-for="item in kits"
                    :key="item._id"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item name="comment" label="Comment" v-bind="config">
            <a-input v-model:value="formState['comment']" />
          </a-form-item>
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

  <!-- Card content -->
</template>
<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import { Select } from "ant-design-vue";
import { watch } from "vue";

export default defineComponent({
  props: ["rowKey"],
  components: {
    InboxOutlined,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
  },
  setup(props, { emit }) {
    // 在setup函数内部
    const categories = ref([]);
    const kits = ref([]);
    const items_name = ref([]);

    // Initialize formState here
    const formState = reactive({
      Category: "",
      item: [{ id: "", number: 1 }],
      kit: "",
      comment: "",
      identityDocument: null,
    });

    // Setup watcher after formState is defined
    watch(
      () => formState.Category,
      (newVal, oldVal) => {
        // check newVal before sending request
        console.log(111);
        console.log(newVal);
        if (newVal) {
          axios
            .post("https://swen90016.herokuapp.com/request/itemlist", {
              category: newVal,
            })
            .then((response) => {
              console.log(response.data); // handle the data from the server
              items_name.value = response.data; // set the response data to items_name
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    );

    onMounted(async () => {
      // const response = await axios.get("https://swen90016.herokuapp.com/request/item");
      // items_name.value = response.data;
      const responseCategories = await axios.get(
        "https://swen90016.herokuapp.com/request/category"
      );
      categories.value = responseCategories.data;

      const responseKits = await axios.get("https://swen90016.herokuapp.com/request/kit");
      // const responseKits = await axios.get('https://swen90016.herokuapp.com/request/category');

      kits.value = responseKits.data;
    });

    const loading = ref(false);
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
      // console.log(props.rowKey);
      // get id
    };
    const handleOk = () => {
      loading.value = true;
      console.log(formState); // 在这里打印formState对象，该对象包含所有的input信息
      setTimeout(() => {
        loading.value = false;
        visible.value = false;
      }, 2000);
      const sendData = {
        item: formState.item,
        kit: formState.kit,
        comment: formState.comment,
      };
      console.log(111);
      console.log(sendData);
      axios
        .post("https://swen90016.herokuapp.com/request", sendData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
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

    const handleChange = (info) => {
      console.log("handleChange info");
      console.log(info);

      const status = info.file.status;
      console.log("Status", status);
      if (status === "done") {
        console.log(info.file, info.fileList);

        let formData = new FormData();
        formData.append("image", info.file.originFileObj); // 'image' is the field name
        formData.append("url", window.location.href);
        console.log(formData);
        axios
          .post("https://swen90016.herokuapp.com/ocr/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data); // handle the data from the server
            items_name.value = response.data; // set the response data to items_name

            formState.Category = response.data.ocrText.Category;
            formState.comment = response.data.ocrText.comment;
            formState.item = response.data.ocrText.items.map((i) => ({
              id: i.Item,
              number: i.quan,
            }));
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    const addItem = () => {
      formState.item.push({ id: "", number: 1 });
    };
    const removeItem = (index) => {
      formState.item.splice(index, 1);
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

    const onFinish = (values) => {
      console.log("Success:", values, formState);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      items_name,
      addItem,
      removeItem,
      categories,
      kits,
      loading,
      visible,
      formState,
      showModal,
      handleOk,
      handleCancel,
      onFinish,
      onFinishFailed,
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
