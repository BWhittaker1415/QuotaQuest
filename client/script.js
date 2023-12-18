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
      task: this.form.elements.task.value,
      tag: this.form.elements.tag.value,
      quotaText: this.form.elements.quotaText.value,
    };

    console.log(quota);

    // Clear fields
    this.form.elements.task.value = "";
    this.form.elements.tag.value = "";
    this.form.elements.quotaText.value = "";

    document.dispatchEvent(new Event("closeModal"));
  }

  render() {
    this.formModal.innerHTML = `
    <form id="quota-form">
    <div class="form-control">
      <label for="task">Enter New Quota</label>
      <input type="text" name="task" id="task" />
    </div>

    <div class="form-control">
      <label for="quota-text">Details</label>
      <textarea name="quotaText" id="quota-text"></textarea>
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
    this.quotaList = document.querySelector("#");
  }
}
