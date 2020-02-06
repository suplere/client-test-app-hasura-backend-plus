import Vue from 'vue'
import axios from 'axios'

// we add it to Vue prototype
// so we can reference it in Vue files
// without the need to import axios
Vue.prototype.$axios = axios
