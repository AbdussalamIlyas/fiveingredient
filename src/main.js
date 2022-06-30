import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import authHeader from '@/services/auth-header'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.headers.common = authHeader()

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
