import axios from 'axios';
const API_URL =
  import.meta.env.VITE_ENV === 'development'
    ? 'http://localhost:5101/api/atividades-lazer'
    : `${window.location.origin}/api/atividades-lazer`;

const setNewAtividadeLazer = async (data) => {
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

const getAllAtividadesLazer = async (options) => {
  const config = {
    params: { ...options },
    withCredentials: true,
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};
const getSingleAtividadeLazer = async (id) => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/${id}`, config);
  return response.data;
};

const removeSingleAtividadeLazer = async ({ id, userId }) => {
  const config = {
    params: { userId },
    withCredentials: true,
  };
  const response = await axios.delete(API_URL + `/${id}`, config);
  return response.data;
};
const getCulturaQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeCultura`, config);
  return response.data;
};
const getEmGrupoQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeEmGrupo`, config);
  return response.data;
};
const getJogosQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeJogos`, config);
  return response.data;
};
const getOutrosQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeOutros`, config);
  return response.data;
};
const lazerService = {
  setNewAtividadeLazer,
  getAllAtividadesLazer,
  getSingleAtividadeLazer,
  removeSingleAtividadeLazer,
  getCulturaQty,
  getEmGrupoQty,
  getJogosQty,
  getOutrosQty,
};

export default lazerService;
