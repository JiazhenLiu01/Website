import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import OtherPage from "../pages/OtherPage.vue";
import AidRecipientAdd from "../pages/AidRecipientAdd.vue";
import DonorForm from "../pages/DonorForm.vue";
import AidRecipientTable from "../pages/AidRecipientTable.vue";
import DonorTable from "../pages/DonorTable.vue";
import RecipientsList from "../components/RecipientsList.vue";
import SignIn from "../pages/SignIn.vue";
import DonorList from "../pages/DonorList.vue";
import SignUp from "../pages/SignUp.vue";
import DnonrAdd from "../pages/DonorAdd.vue";
import MaterialsList from "../pages/MaterialsList.vue";
import Items from "../pages/Items.vue";

import AidRecipientAdditionalForm from "../pages/AidRecipientAdditionalForm.vue";
import DonorAdditionalForm from "../pages/DonorAdditionalForm.vue";
import ItemDetail from "../pages/ItemDetail.vue";

const userID = localStorage.getItem("userID"); // 假设这是用户登录后从后端获得的 ID

const routes = [
  {
    path: "/:userID/recipients",
    name: "RecipientsList",
    component: RecipientsList,
  },
  {
    path: "/:userID/materialslist",
    name: "MaterialsList",
    component: MaterialsList,
  },
  {
    path: "/:userID/donorList",
    name: "DonorList",
    component: DonorList,
  },
  { path: "/:userID/", name: "Home", component: HomePage },
  { path: "/:userID/other", component: OtherPage },
  {
    path: "/:userID/aid-recipient-additional",
    component: AidRecipientAdditionalForm,
  },
  { path: "/:userID/donor", component: DonorForm },
  { path: "/:userID/donor-additional", component: DonorAdditionalForm },
  {
    path: "/:userID/aid-recipients",
    name: "AidRecipients",
    component: AidRecipientTable,
  },
  {
    path: "/:userID/aid-recipients-add",
    name: "AidRecipientsAdd",
    component: AidRecipientAdd,
  },
  {
    path: "/:userID/donor-add",
    name: "DonorAdd",
    component: DnonrAdd,
  },
  {
    path: "/:userID/donors",
    name: "Donors",
    component: DonorTable,
  },

  {
    path: "/:userID/donor-additional",
    name: "DonorAdditionalForm",
    component: DonorAdditionalForm,
  },
  {
    path: "/:userID/aid-recipient-additional",
    name: "AidRecipientAdditionalForm",
    component: AidRecipientAdditionalForm,
  },
  {},
  {
    path: "/SignIn",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/:userID/Items",
    name: "Items",
    component: Items,
  },
  {
    path: "/:userID/aid-recipient-additional/:recipientID",
    name: "AidRecipientAdditionalForm",
    component: AidRecipientAdditionalForm,
  },
  {
    path: "/:userID/donor-additional/:donorID",
    name: "DonorAdditionalForm",
    component: DonorAdditionalForm,
  },
  {
    path: "/:userID/item-additional/:itemID",
    name: "ItemDetail",
    component: ItemDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 从 localStorage 中获取用户的登录状态
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");

  // 如果用户已经登录，或者他们正在访问 SignIn 或 SignUp 页面
  if (isUserLoggedIn || to.name === "SignIn" || to.name === "SignUp") {
    // 允许进入页面
    next();
  } else {
    // 否则，如果用户未登录，重定向到登录页面
    next({ name: "SignIn" });
  }
});

export default router;
