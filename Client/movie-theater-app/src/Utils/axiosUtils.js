import axios from "axios";

const getAllItems = (url) => axios.get(url);

const getItem = (url, id) => axios.get(`${url}/${id}`);

const createItem = (url, obj, token) => {
  return axios.post(url, obj, {
    headers: {
      authorization: token,
    },
  });
};

const updateItem = (url, id, obj, token) => {
  return axios.put(`${url}/${id}`, obj, {
    headers: {
      authorization: token,
    },
  });
};

const deleteItem = (url, id, token) => {
  return axios.delete(`${url}/${id}`, {
    headers: {
      authorization: token,
    },
  });
};

export default { getAllItems, getItem, createItem, updateItem, deleteItem };
