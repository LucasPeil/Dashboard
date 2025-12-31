import axios from 'axios';

const API_URL =
  import.meta.env.VITE_ENV === 'development'
    ? 'http://localhost:5101/api/visao-geral/dinheiroGasto'
    : `${window.location.origin}/api/visao-geral/dinheiroGasto`;
const getDinheiroGasto = async ({ ano, userId }, token) => {
  const config = {
    params: { ano: ano, userId: userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};
const visaoGeralService = { getDinheiroGasto };
export default visaoGeralService;
