import axios from "axios";

class QuotaApi {
  constructor() {
    this.apiUrl = "http://localhost:4000/api/quotas";
  }

  getQuotas() {
    return axios.get(this.apiUrl);
  }
}

export default new QuotaApi();
