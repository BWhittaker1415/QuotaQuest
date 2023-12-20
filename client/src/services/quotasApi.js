import axios from "axios";

class QuotaApi {
  constructor() {
    this.apiUrl = "http://localhost:4000/api/quotas";
  }

  getQuotas() {
    return axios.get(this.apiUrl);
  }

  createQuota(data) {
    return axios.post(this.apiUrl, data);
  }
}

export default new QuotaApi();
