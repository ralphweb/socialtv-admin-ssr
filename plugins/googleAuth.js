import Vue from "vue";
import GAuth from "vue-google-oauth2";

const gauthOption = {
  clientId:
    "1016340779938-fccotens1rit6j4mm72l5qbu6mjqu902.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account"
};
Vue.use(GAuth, gauthOption);
