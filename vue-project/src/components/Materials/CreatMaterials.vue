<template>
  <div>
    <a-button class="creatematerials"  type="primary" @click="showModal">+ New Materials</a-button>
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
              <!-- <a-form-item name="Category" label="Category" v-bind="config">
                  <a-input v-model:value="formState['Category']" />
                </a-form-item> -->
              <a-form-item name="Category" label="Category" v-bind="config">
                <a-select v-model:value="formState['category']">
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
            <a-col :span="8">
              <a-form-item name="Number" label="Number" v-bind="config">
                <a-input v-model:value="formState['totalnumber']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <!-- <a-form-item name="Category" label="Category" v-bind="config">
                  <a-input v-model:value="formState['Category']" />
                </a-form-item> -->
              <a-form-item name="Donor" label="Donor" v-bind="config">
                <a-select v-model:value="formState['donor']">
                  <a-select-option
                    v-for="item in donors"
                    :key="item.donor_id"
                    :value="item.donor_id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item name="Brand" label="Brand" v-bind="config">
                <a-input v-model:value="formState['brand']" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item
                  name="size"
                  label="Size"
                  v-bind="config"
                >
                  <a-select v-model:value="formState['size']">
                    <a-select-option value="XS">XS</a-select-option>
                    <a-select-option value="S"
                      >S</a-select-option
                    >
                    <a-select-option value="M"
                      >M</a-select-option
                    >
                    <a-select-option value="L">L</a-select-option>
                    <a-select-option value="XL">XL</a-select-option>
                    <a-select-option value="XXL">XXL</a-select-option>

                  </a-select>
                </a-form-item>
              </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item name="allergen" label="Allergen" v-bind="config">
                <a-input v-model:value="formState['allergen']" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="ingredients"
                label="Ingredients"
                v-bind="config"
              >
                <a-input v-model:value="formState['ingredients']" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="expirydate"
                label="Expiry Date"
                v-bind="config"
              >
                <a-date-picker
                  v-model:value="formState['expirydate']"
                  value-format="YYYY-MM-DD"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-modal>
  </div>

  <!-- Card content -->
</template>
<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import axios from "axios";
import { Select } from "ant-design-vue";

export default defineComponent({
  components: {
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
  },
  setup() {
    const categories = ref([]);
    const donors = ref([]);

    onMounted(async () => {
      const response = await axios.get(
        "https://swen90016.herokuapp.com/request/category"
      );
      categories.value = response.data;

      const dnonrresponse = await axios.get(
        "https://swen90016.herokuapp.com/donor" 
      );
      donors.value = dnonrresponse.data;
    });

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

      axios.post('https://swen90016.herokuapp.com/request/item', formState)
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
      donor:"",
      totalnumber: "",
      category: "",
      size: "",
      expirydate: "",
      ingredients: "",
      allergen: "",
      brand: "",
    });

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
      donors,
      categories,
      loading,
      visible,
      formState,
      showModal,
      handleOk,
      handleCancel,
      onFinish,
      onFinishFailed,
      config,
      fileList: ref([]),
      handleDrop: (e) => {
        console.log(e);
      },
    };
  },
});
</script>

<style scoped>
  .creatematerials {
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
