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

  addEventListeners() {
    this.quotaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const quotaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteQuota(quotaId);
      }
    });
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

  async deleteQuota(quotaId) {
    try {
      // Deletes from server
      const res = await QuotaApi.deleteQuota(quotaId);
      // Filters out the deleted quota
      if (res.success) {
        this.quotas = this.quotas.filter((quota) => quota._id !== quotaId);
        this.render();
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (error) {
      console.error("Error deleting quota:", error);
      alert("Error deleting quota. Please try again.");
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
         <div class="card" data-id="${quota._id}">
         <button class="delete"><i class="fas fa-times"></i></button>
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
    this.addEventListeners();
  }
}

export default QuotaList;
