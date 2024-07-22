<template>
  <div class="app">
    <div class="navbar">
      <div class="navbar-logo">
        <img src="./assets/img/logo.png" alt="Logo" />
      </div>
      <Menubar :model="items" />
    </div>
    <router-view />
  </div>
</template>

<script>
import Menubar from "primevue/menubar";

export default {
  components: {
    Menubar,
  },
  data() {
    return {
      userID: null,
      items: []
    };
  },
  created() {
    this.userID = localStorage.getItem('userID'); 
    this.items = [
      {
        label: "Home",
        icon: "pi pi-home",
        to: `/${this.userID}/`,
      },
      {
        label: "Aid Recipients",
        icon: "pi pi-users",
        to: `/${this.userID}/aid-recipients`,
      },
      {
        label: "Donors",
        icon: "pi pi-users",
        to: `/${this.userID}/donorlist`,
      },
      {
        label: "Items",
        icon: "pi pi-users",
        to: `/${this.userID}/Items`,
      },
      

      {
        label: "Logout",
        command: this.logout,
        icon: "pi pi-sign-out",
        class: "quit-button",

      },
    ];
  },
  methods: {
    logout() {
      localStorage.removeItem('isUserLoggedIn')
      this.$router.push({ name: "SignIn" });  
    }
  }
};
</script>

<!-- ... your styles here ... -->

<style>
body {
  margin: 0;
  font-family: "Arial", sans-serif;
}

:where(.css-dev-only-do-not-override-1tm6q75).ant-form-item .ant-form-item-label > label {
    font-size: 30px;
  }

  .navbar-logo {
  margin-right: 10px; /* 调整图像与导航栏之间的水平间距 */
}

.navbar-logo img {
  width: 50px; /* 调整图像的宽度 */
  height: 50px; /* 调整图像的高度 */
}
  
.p-menubar .p-menuitem-link:hover {
  background-color: #89C7D0; /* 把颜色改成你想要的颜色 */
  border-radius: 5px; /* 设置圆角为 5px */
}
.p-menubar .p-menuitem-link:active {
  
  border-radius: 5px; /* 设置圆角为 5px */
}
.p-menubar .p-menuitem-link:focus {
  border-radius: 5px; /* 设置圆角为 5px */
}
.p-menubar .quit-button .p-menuitem-link:hover {
  background-color: #FF0000; /* 你选择的颜色 */
}
</style>
