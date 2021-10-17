import Vue from "vue";
import GAuth from "vue-google-oauth2";

const gauthOption = {
  clientId:
    "1016340779938-9suc50462ba1f9o8ab07sbgfhkoe3nef.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account"
};
Vue.use(GAuth, gauthOption);
