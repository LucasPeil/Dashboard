import axios from 'axios';

const API_URL = 'http://localhost:5101/api/users';

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const resetPassword = async (newPassword, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',

      Authorization: 'Bearer ' + token,
    },
  };

  const response = await axios.put(
    API_URL + '/resetPassword',
    newPassword,
    config
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify('user', response.data));
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
  };

  const response = await axios.post(
    API_URL + `/cadastrar`,
    JSON.stringify(data),
    config
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};
const logout = async () => {
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
