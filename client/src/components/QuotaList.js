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

    this.progressTextEl = document.querySelector("#progress-text");
  }

  addEventListeners() {
    this.quotaListEl.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const quotaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteQuota(quotaId);
      }
    });

    this.quotaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("complete")) {
        e.preventDefault();
        e.stopPropagation();

        const quotaId = e.target.parentElement.dataset.id;
        this.updateQuota(quotaId);
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

  async updateQuota(quotaId) {
    try {
      // Update the task as completed on the server (you'll need an API endpoint for this)
      const res = await QuotaApi.updateQuota(quotaId);

      if (res.success) {
        // Update the progress bar here (calculate progress and update UI)
        this.updateProgressBar();
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (error) {
      console.error("Error completing quota:", error);
      alert("Error completing quota. Please try again.");
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
         <button class="complete">Done!</button>
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
         <p id="progress-text">Progress: 0%</p>
       </div>
       `;
      })
      .join("");
    this.addEventListeners();
  }
  updateProgressText() {
    // Calculate the progress (e.g., completed tasks / total tasks)
    const totalTasks = this.quotas.length;
    const completedTasks = this.quotas.filter(
      (quota) => quota.completed
    ).length;
    const progress = (completedTasks / totalTasks) * 100;

    // Update the progress text (placeholder for progress bar)
    this.progressTextEl.textContent = `Progress: ${progress.toFixed(0)}%`;
  }
}

export default QuotaList;
