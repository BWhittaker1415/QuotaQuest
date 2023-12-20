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

export default QuotaForm;
