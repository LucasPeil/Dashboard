import axios from 'axios';
const API_URL =
  import.meta.env.VITE_ENV === 'development'
    ? 'http://localhost:5101/api/atividades-educacao'
    : `${window.location.origin}/api/atividades-educacao`;

const setNewAtividadeEducacao = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  const response = await axios.post(API_URL + '/', formData, config);
  return response.data;
};

const getAllAtividadesEducacao = async (options) => {
  const config = {
    params: { ...options },
    withCredentials: true,
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};
const getSingleAtividadeEducacao = async (id) => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/${id}`, config);
  return response.data;
};

const removeSingleAtividadeEducacao = async ({ id, userId }) => {
  const config = {
    params: { userId },
    withCredentials: true,
  };

  const response = await axios.delete(API_URL + `/${id}`, config);
  return response.data;
};
const getCursosQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeCursos`, config);
  return response.data;
};
const getLivrosQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeLivros`, config);
  return response.data;
};
const getSeminariosQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeSeminarios`, config);
  return response.data;
};

const educacaoService = {
  setNewAtividadeEducacao,
  getAllAtividadesEducacao,
  getSingleAtividadeEducacao,
  removeSingleAtividadeEducacao,
  getCursosQty,
  getLivrosQty,
  getSeminariosQty,
};

export default educacaoService;
