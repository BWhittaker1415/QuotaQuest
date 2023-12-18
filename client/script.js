// ===== MODAL COMPONENT ===== //
class Modal {
  constructor() {
    this.modal = document.querySelector("#modal");
    this.modalBtn = document.querySelector("#modal-btn");
    this.addEventListeners();
  }

  addEventListeners() {
    this.modalBtn.addEventListener("click", this.open.bind(this));
    window.addEventListener("click", this.outsideClick.bind(this));
    document.addEventListener("closeModal", () => this.close());
  }

  open() {
    this.modal.style.display = "block";
  }

  close() {
    this.modal.style.display = "none";
  }

  outsideClick(e) {
    if (e.target === this.modal) {
      this.close();
    }
  }
}

const modal = new Modal();

// ===== FORM COMPONENT ===== //
class QuotaForm {
  constructor() {
    this.formModal = document.querySelector("#form-modal");
  }

  addEventListeners() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();

    const quota = {
      title: this.form.elements.title.value,
      description: this.form.elements.description.value,
      tag: this.form.elements.tag.value,
    };

    console.log(quota);

    // Clear fields
    this.form.elements.title.value = "";
    this.form.elements.description.value = "";
    this.form.elements.tag.value = "";

    document.dispatchEvent(new Event("closeModal"));
  }

  render() {
    this.formModal.innerHTML = `
    <form id="quota-form">
    <div class="form-control">
      <label for="title">Enter New Quota</label>
      <input type="text" name="title" id="title" />
    </div>

    <div class="form-control">
      <label for="description">Details</label>
      <textarea name="description" id="description"></textarea>
    </div>

    <div class="form-control">
      <label for="tag">Tag</label>
      <input type="text" name="tag" id="tag" />
    </div>

    <button class="btn" type="submit" id="submit">Submit</button>
  </form>`;
    this.form = document.querySelector("#quota-form");
    this.addEventListeners();
  }
}

const quotaForm = new QuotaForm();
quotaForm.render();

// ===== LIST COMPONENT ===== //
class QuotaList {
  constructor() {
    this.quotaListEl = document.querySelector("#quota-list");
    this.quotas = [
      {
        id: 1,
        title: "Make the bed",
        description: "this is a description.",
        tag: "Home",
        date: "12/17/2023",
      },
      {
        id: 2,
        title: "Got to bed early",
        description: "this is a description.",
        tag: "Fun",
        date: "12/17/2023",
      },
    ];
    this.validTags = new Set();
    this.validTags.add("home");
    this.validTags.add("school");
    this.validTags.add("fitness");
    this.validTags.add("fun");
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

const quotaList = new QuotaList();
quotaList.render();
