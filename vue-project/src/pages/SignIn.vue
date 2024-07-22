<template>
  <div class="top-sign-in">
    <img
      class="image1"
      src="../assets/img/sign_in.png"
      alt="Your image description"
    />
  </div>

  <div class="bottom-sign-in">
    <img
      class="image2"
      src="../assets/img/blank.png"
      alt="Your image description"
    />
  </div>
  <div class="text-sign-in">
    <p class="p3">Log into your account</p>
    <p class="p1">Benefits of an account</p>
    <p class="p2">You can securely view and</p>
    <p class="p4">update personal information as well as</p>
    <p class="p5">access all the donation information at any time.</p>
    <p class="p6">How to join us</p>
    <span class="join-us"
      ><a href="">Click here to get more information and join us </a></span
    >
  </div>
  <div class="form-sign-in">
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input
          v-model:value="formState.username"
          placeholder="Please enter your username"
          class="wide-input4"
        >
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password
          v-model:value="formState.password"
          placeholder="Please enter your password"
          class="wide-input3"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-form-item name="remember" class="remember-me">
          <a-checkbox v-model:checked="formState.remember"
            >Remember me</a-checkbox
          >
        </a-form-item>
      </a-form-item>

      <a-form-item>
        <a-button
          :disabled="disabled"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          Log in
        </a-button>
        <span class="register-link"
          >Don't have an account? <a href="/SignUp">register now!</a></span
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import axios from "axios";
import { useRouter } from "vue-router";

import { defineComponent, reactive, computed } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter();

    const formState = reactive({
      username: "",
      password: "",
      remember: true,
    });
    const onFinish = async (values) => {
      try {
        const response = await axios.post("https://swen90016.herokuapp.com/employee", {
          email: values.username,
          password: values.password,
        });
        console.log(response);

        if (response.data.userId) {
          console.log("Login success:", response.data.userId);
          localStorage.setItem("userID", response.data.userId);

          localStorage.setItem("isUserLoggedIn", true);
          router.push({
            name: "Home",
            params: { userID: localStorage.getItem("userID") },
          });
        } else {
          console.log("Login failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
});
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

.top-sign-in {
  width: 100%;
  height: 277px; /* Adjust the height for card 4 */
  margin-bottom: 40px; /* Adjust the margin for card 1 */
  background-color: white; /* Set the background color of the div */
  position: relative;
}

.bottom-sign-in {
  width: 100%;
  height: 277px; /* Adjust the height for card 4 */
  margin-bottom: 0px; /* Adjust the margin for card 1 */
  background-color: white; /* Set the background color of the div */
  position: absolute;
  z-index: -1; /* 将 z-index 设置为较低的值 */
  top: 1000px; /* 调整垂直位置 */
  left: 0; /* 调整水平位置 */
}

.image1 {
  width: 1250px; /* 设置图像的宽度 */
  height: auto; /* 设置图像的高度，使用 auto 可以根据宽度自动调整高度，保持图像比例 */
}

.image2 {
  width: 100px; /* 设置图像的宽度 */
  height: auto; /* 设置图像的高度，使用 auto 可以根据宽度自动调整高度，保持图像比例 */
}

.form-sign-in {
  position: absolute;
  top: 550px;
  left: 300px;
}

.wide-input4 {
  width: 250px; /* 设置输入框的宽度 */
}

.wide-input3 {
  width: 250px; /* 设置输入框的宽度 */
}

.form-sign-in .remember-me {
  position: absolute;
  top: 0px; /* 调整复选框的垂直位置 */
  right: 0px;
}

.text-sign-in .p3 {
  position: absolute;
  top: 450px;
  left: 100px;
  font-size: 23px;
  font-weight: bold;
}

.text-sign-in .p1 {
  position: absolute;
  top: 500px;
  left: 780px;
  font-size: 18px;
  font-weight: bold;
}

.text-sign-in .p4 {
  position: absolute;
  top: 580px;
  left: 780px;
  font-size: 15px;
}

.text-sign-in .p5 {
  position: absolute;
  top: 610px;
  left: 780px;
  font-size: 15px;
}

.text-sign-in .p2 {
  position: absolute;
  top: 550px;
  left: 780px;
  font-size: 15px;
}

.text-sign-in .p6 {
  position: absolute;
  top: 660px;
  left: 780px;
  font-size: 18px;
  font-weight: bold;
}

.text-sign-in .join-us {
  position: absolute;
  top: 720px;
  left: 780px;
  font-size: 15px;
  color: #0d3a56;
}

.login-form-button {
  position: relative;
  top: 0px; /* 调整垂直位置 */
  left: 150px; /* 调整水平位置 */
}

.login-form-button a {
  margin-left: -5px; /* 调整文本与链接之间的水平间距 */
}

.register-link {
  position: absolute;
  top: 75px; /* 根据需要调整垂直位置 */
  left: 30; /* 根据需要调整水平位置 */
}
</style>
