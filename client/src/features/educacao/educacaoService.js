import axios from "axios";
const API_URL = import.meta.env.VITE_ENV === 'development' ? 'http://localhost:5101/api/atividades-educacao' : `${window.location.origin}/api/atividades-educacao` ;

const setNewAtividadeEducacao = async (data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const response = await axios.post(API_URL + "/", formData, config);
  return response.data;
};

const getAllAtividadesEducacao = async (options, token) => {
  const config = { params: { ...options }, headers: { Authorization: `Bearer ${token}` } };

  const response = await axios.get(API_URL, config);

  return response.data;
};
const getSingleAtividadeEducacao = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL + `/${id}`, config);
  return response.data;
};

const removeSingleAtividadeEducacao = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(API_URL + `/${id}`, config);
  return response.data;
};
const getCursosQty = async () => {
  const config = {};
  const response = await axios.get(API_URL + `/quantidadeCursos`);
  return response.data;
};
const getLivrosQty = async () => {
  const config = {};
  const response = await axios.get(API_URL + `/quantidadeLivros`);
  return response.data;
};

const educacaoService = {
  setNewAtividadeEducacao,
  getAllAtividadesEducacao,
  getSingleAtividadeEducacao,
  removeSingleAtividadeEducacao,
  getCursosQty,
  getLivrosQty,
};

export default educacaoService;
