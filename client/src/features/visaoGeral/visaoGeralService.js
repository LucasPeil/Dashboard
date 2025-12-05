import axios from "axios";

const API_URL = "http://localhost:5101/api/visao-geral/dinheiroGasto";

const getDinheiroGasto = async (ano) => {
  const config = { params: { ano: ano } };

  const response = await axios.get(API_URL, config);
  return response.data;
};
const visaoGeralService = { getDinheiroGasto };
export default visaoGeralService;
