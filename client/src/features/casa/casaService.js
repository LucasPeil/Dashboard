import axios from 'axios';

const API_URL =
  import.meta.env.VITE_ENV === 'development'
    ? 'http://localhost:5101/api/atividades-casa'
    : `${window.location.origin}/api/atividades-casa`;

const setNewAtividadeCasa = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
  const formData = new FormData();
  formData.append('data', data); // Adiciona seus dados ao FormData

  const response = await axios.post(
    API_URL + '/newAtividade',
    { data: JSON.stringify(data) },
    config,
  );

  return response.data;
};
const getComprasQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeCompras`, config);
  return response.data;
};
const getLimpezaQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeLimpeza`, config);
  return response.data;
};
const getRefeicoesQty = async () => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/quantidadeRefeicoes`, config);
  return response.data;
};

const getAllAtividadesCasa = async (options) => {
  const config = {
    params: { ...options },
    withCredentials: true,
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};
const getSingleAtividadeCasa = async (id) => {
  const config = { withCredentials: true };
  const response = await axios.get(API_URL + `/${id}`, config);
  return response.data;
};

const removeSingleAtividadeCasa = async ({ id, userId }) => {
  const config = {
    params: { userId },
    withCredentials: true,
  };
  const response = await axios.delete(API_URL + `/${id}`, config);
  return response.data;
};
const casaService = {
  setNewAtividadeCasa,
  getAllAtividadesCasa,
  getSingleAtividadeCasa,
  removeSingleAtividadeCasa,
  getComprasQty,
  getLimpezaQty,
  getRefeicoesQty,
};

export default casaService;
