import Vue from "vue";
import GAuth from "vue-google-oauth2";

const gauthOption = {
  clientId:
    "1016340779938-66k7ck6a6143dhtv05nqjaic3mri9let.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account"
};
Vue.use(GAuth, gauthOption);
