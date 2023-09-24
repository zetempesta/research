import axios from "axios";
import getBackendUrl from "./getBackendUrl";

class QuestionaireService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
    });
  }
  login({ username, password }) {
    return this.api.post("/login", { username, password });
  }
  answer(answer) {
    return this.api.post("/answer", {
      ...answer,
    });
  }

  city() {
    return this.api.get("/city");
  }
  research(user) {
    return this.api.get(`/research/?user=${user}`);
  }
  neighborhood() {
    return this.api.get("/neighborhood");
  }
}
export default new QuestionaireService(getBackendUrl());
