import axios from "axios";

const email = axios.create({
  baseURL: "https://sistemas.pmfi.pr.gov.br/RP/SMTIAPI/ApiSite/Prefeitura",
});

export default email;
