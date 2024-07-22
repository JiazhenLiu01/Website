<template>
  <div class="top-sign-up">
    <img
      class="image3"
      src="../assets/img/sign_up.png"
      alt="Your image description"
    />
  </div>

  <div class="bottom-sign-up">
    <img
      class="image4"
      src="../assets/img/blank.png"
      alt="Your image description"
    />
  </div>
  <div class="text-sign-up">
    <p class="p3">Create your account</p>
    <p class="p1">Benefits of an account</p>
    <p class="p2">You can securely view and</p>
    <p class="p4">update personal information as well as</p>
    <p class="p5">access all the donation information at any time.</p>
    <p class="p6">Who can create an account</p>
    <p class="p7">All the employees of VR1FAMILY.</p>
    <span class="join-us"
      ><a href="">Click here to get more information and join us </a></span
    >
  </div>
  <div class="form-sign-up">
    <a-form
      ref="formRef"
      name="custom-validation"
      :model="formState"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @validate="handleValidate"
      @finishFailed="handleFinishFailed"
      ><a-form-item has-feedback label="Firstname" name="firstName">
        <a-input
          v-model:value="formState.firstName"
          placeholder="Please enter your first name"
          class="wide-input-signup-6"
        />
      </a-form-item>

      <a-form-item has-feedback label="Lastname" name="lastName">
        <a-input
          v-model:value="formState.lastName"
          placeholder="Please enter your last name"
          class="wide-input-signup-2"
        />
      </a-form-item>

      <a-form-item has-feedback label="Username" name="userName">
        <a-input
          v-model:value="formState.userName"
          placeholder="Please enter your user name"
          class="wide-input-signup-3"
        />
      </a-form-item>
      <a-form-item has-feedback label="Password" name="pass">
        <a-input
          v-model:value="formState.pass"
          type="password"
          placeholder="Please enter your password"
          autocomplete="off"
          class="wide-input-signup-4"
        />
      </a-form-item>
      <a-form-item has-feedback label="Confirm" name="checkPass">
        <a-input
          v-model:value="formState.checkPass"
          type="password"
          placeholder="Please enter your password again"
          autocomplete="off"
          class="wide-input-signup-5"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit" class="custom-button"
          >Submit</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const formRef = ref();
    const formState = reactive({
      firstName: "",
      lastName: "",
      userName: "",
      pass: "",
      checkPass: "",
    });
    let checkAge = async (_rule, value) => {
      if (!value) {
        return Promise.reject("Please input the age");
      }
      if (!Number.isInteger(value)) {
        return Promise.reject("Please input digits");
      } else {
        if (value < 18) {
          return Promise.reject("Age must be greater than 18");
        } else {
          return Promise.resolve();
        }
      }
    };
    let validatePass = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        if (formState.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }
        return Promise.resolve();
      }
    };
    let validatePass2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== formState.pass) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      firstName: [
        {
          required: true,
          message: "Please input your first name",
          trigger: "change",
        },
      ],
      lastName: [
        {
          required: true,
          message: "Please input your last name",
          trigger: "change",
        },
      ],
      userName: [
        {
          required: true,
          message: "Please input your user name",
          trigger: "change",
        },
      ],
      pass: [
        {
          required: true,
          validator: validatePass,
          trigger: "change",
        },
      ],
      checkPass: [
        {
          required: true,
          validator: validatePass2,
          trigger: "change",
        },
      ],
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const handleFinish = (values) => {
      console.log(values, formState);
      // Use axios to send a POST request
      try {
        const response = axios.post(
          "https://swen90016.herokuapp.com/employee/register",
          formState
        );
            router.push({
            name: "SignIn"
          });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const handleFinishFailed = (errors) => {
      console.log(errors);
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const handleValidate = (...args) => {
      console.log(args);
    };
    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
    };
  },
});
</script>

<style>
.top-sign-up {
  width: 100%;
  height: 277px; /* Adjust the height for card 4 */
  margin-bottom: 40px; /* Adjust the margin for card 1 */
  background-color: white; /* Set the background color of the div */
  position: relative;
}

.bottom-sign-up {
  width: 100%;
  height: 277px; /* Adjust the height for card 4 */
  margin-bottom: 0px; /* Adjust the margin for card 1 */
  background-color: white; /* Set the background color of the div */
  position: absolute;
  z-index: -1; /* 将 z-index 设置为较低的值 */
  top: 1000px; /* 调整垂直位置 */
  left: 0; /* 调整水平位置 */
}

.wide-input-signup-6 {
  width: 250px; /* 设置输入框的宽度 */
}

.wide-input-signup-2 {
  width: 250px; /* 设置输入框的宽度 */
}

.wide-input-signup-3 {
  width: 250px; /* 设置输入框的宽度 */
}

.wide-input-signup-4 {
  width: 250px; /* 设置输入框的宽度 */
}

.wide-input-signup-5 {
  width: 250px; /* 设置输入框的宽度 */
}
.image3 {
  width: 1250px; /* 设置图像的宽度 */
  height: auto; /* 设置图像的高度，使用 auto 可以根据宽度自动调整高度，保持图像比例 */
}

.image4 {
  width: 100px; /* 设置图像的宽度 */
  height: auto; /* 设置图像的高度，使用 auto 可以根据宽度自动调整高度，保持图像比例 */
}

.form-sign-up {
  position: relative;
  top: 150px;
  left: 100px;
}

.text-sign-up .p3 {
  position: absolute;
  top: 450px;
  left: 100px;
  font-size: 23px;
  font-weight: bold;
}

.text-sign-up .p1 {
  position: absolute;
  top: 500px;
  left: 780px;
  font-size: 18px;
  font-weight: bold;
}

.text-sign-up .p4 {
  position: absolute;
  top: 580px;
  left: 780px;
  font-size: 15px;
}

.text-sign-up .p5 {
  position: absolute;
  top: 610px;
  left: 780px;
  font-size: 15px;
}

.text-sign-up .p2 {
  position: absolute;
  top: 550px;
  left: 780px;
  font-size: 15px;
}

.text-sign-up .p6 {
  position: absolute;
  top: 660px;
  left: 780px;
  font-size: 18px;
  font-weight: bold;
}

.text-sign-up .p7 {
  position: absolute;
  top: 720px;
  left: 780px;
  font-size: 15px;
}

.text-sign-up .join-us {
  position: absolute;
  top: 750px;
  left: 780px;
  font-size: 15px;
  color: #0d3a56;
}

.custom-button {
  background-color: #0d3a56;
  position: absolute;
  top: 10px;
  left: 70px;
}

.register-link {
  position: absolute;
  top: 75px; /* 根据需要调整垂直位置 */
  left: 30; /* 根据需要调整水平位置 */
}
</style>
