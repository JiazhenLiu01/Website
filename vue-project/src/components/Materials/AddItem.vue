<template>
  <div>
    <a-button class="createitem" type="primary" @click="showModal">Add item</a-button>
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
      <h1>Add item</h1>
      <div class="id_form">
        <a-form
          :model="formState"
          name="kit_related_controls"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
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
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const items_name = ref([]);
    const donors = ref([]);

    onMounted(async () => {
      const response = await axios.get("https://swen90016.herokuapp.com/request/item");
      items_name.value = response.data;

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
      console.log(formState);
      setTimeout(() => {
        loading.value = false;
        visible.value = false;
      }, 2000);

      axios
        .post("https://swen90016.herokuapp.com/request/item/add", formState)
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
    const formState = reactive({
      name: "",
      item: [{ id: "", number: 1 }],
    });
    const addItem = () => {
      formState.item.push({ id: "", number: 1 });
    };
    const removeItem = (index) => {
      formState.item.splice(index, 1);
    };

    const config = {
      rules: [
        {
          type: "string",
          required: true,
          message: "Please input name!",
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
      donors,
      items_name,
      loading,
      visible,
      formState,
      showModal,
      handleOk,
      handleCancel,
      onFinish,
      onFinishFailed,
      config,
      addItem,
      removeItem,
    };
  },
});
</script>

<style scoped>
  .createitem {
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
