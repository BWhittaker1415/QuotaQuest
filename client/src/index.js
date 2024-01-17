import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "./components/Modal";
import QuotaForm from "./components/QuotaForm";
import QuotaList from "./components/QuotaList";
import "./css/style.css";

const modal = new Modal();
const quotaForm = new QuotaForm();
quotaForm.render();
const quotaList = new QuotaList();
