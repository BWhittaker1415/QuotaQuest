import QuotaApi from "../services/quotasApi";

class QuotaList {
  constructor() {
    this.quotaListEl = document.querySelector("#quota-list");
    this.quotas = [];
    this.getQuotas();

    this.validTags = new Set();
    this.validTags.add("home");
    this.validTags.add("school");
    this.validTags.add("fitness");
    this.validTags.add("fun");
  }

  async getQuotas() {
    try {
      const res = await QuotaApi.getQuotas();
      this.quotas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addQuotaToList(quota) {
    this.quotas.push(quota);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this.validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

  render() {
    this.quotaListEl.innerHTML = this.quotas
      .map((quota) => {
        const tagClass = this.getTagClass(quota.tag);
        return `
         <div class="card">
         <h3>
           ${quota.title}
         </h3>
         <h5>
           ${quota.description}
         </h5>
         <p class="tag ${tagClass}">${quota.tag.toUpperCase()}</p>
         <p>
           Posted on <span class="date">${quota.date}</span>
         </p>
       </div>
       `;
      })
      .join("");
  }
}

export default QuotaList;
