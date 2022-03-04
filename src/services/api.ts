import axios from "axios";

const api = axios.create({
  baseURL: "https://sistemas.pmfi.pr.gov.br/RP/PORTALTRANSPARENCIAAPI/api",
});

export default api;
