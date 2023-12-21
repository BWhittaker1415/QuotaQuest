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

  updateQuota(id, data) {
    return axios.put(`${this.apiUrl}/${id}`, data);
  }

  deleteQuota(id) {
    return axios.delete(`${this.apiUrl}/${id}`);
  }
}

export default new QuotaApi();
