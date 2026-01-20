import axios from 'axios';

const API_URL =
  import.meta.env.VITE_ENV === 'development'
    ? 'http://localhost:5101/api/users'
    : `${window.location.origin}/api/users`;

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const resetPassword = async (newPassword) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const response = await axios.put(
    API_URL + '/resetPassword',
    newPassword,
    config
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

/* const getById = async (id, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios.get(API_URL + `/${id}`, config);
  return response.data;
}; */
/* const verify = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get("/verify", config);
  return response.data;
}; */
/* const updateUser = async (id, data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
 
  const response = await axios.patch(API_URL + `/${id}`, JSON.stringify(data), config);
  return response.data;
}; */
/* const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.delete(API_URL + `/${id}`, config);
  return response.data;
}; */
const cadastrarUser = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const response = await axios.post(
    API_URL + `/cadastrar`,
    JSON.stringify(data),
    config
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};
const logout = async () => {
  await axios.post(API_URL + '/logout', {}, { withCredentials: true });
  localStorage.removeItem('user');
};

const authService = {
  login,
  resetPassword,
  logout,
  /*  getById,
  verify,
  updateUser,
  deleteUser, */
  cadastrarUser,
};

export default authService;
