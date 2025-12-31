import axios from 'axios';
const API_URL =
  import.meta.env.VITE_ENV === 'development'
    ? 'http://localhost:5101/api/atividades-lazer'
    : `${window.location.origin}/api/atividades-lazer`;

const setNewAtividadeLazer = async (data, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  const response = await axios.post(API_URL + '/', formData, config);
  return response.data;
};

const getAllAtividadesLazer = async (options, token) => {
  const config = {
    params: { ...options },
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};
const getSingleAtividadeLazer = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL + `/${id}`, config);
  return response.data;
};

const removeSingleAtividadeLazer = async ({ id, userId }, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { userId },
  };
  const response = await axios.delete(API_URL + `/${id}`, config);
  return response.data;
};
const getCulturaQty = async (token) => {
  const response = await axios.get(API_URL + `/quantidadeCultura`);
  return response.data;
};
const getEmGrupoQty = async () => {
  const response = await axios.get(API_URL + `/quantidadeEmGrupo`);
  return response.data;
};
const getJogosQty = async () => {
  const response = await axios.get(API_URL + `/quantidadeJogos`);
  return response.data;
};
const getOutrosQty = async () => {
  const response = await axios.get(API_URL + `/quantidadeOutros`);
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
