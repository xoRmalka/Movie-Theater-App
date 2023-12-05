import axios from "axios";

const getAllItems = (url) => axios.get(url);

const getItem = (url, id) => axios.get(`${url}/${id}`);

const createItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => {
  return axios.put(`${url}/${id}`, obj);
};

const deleteItem = (url, id, token) => {
  return axios.delete(`${url}/${id}`, {
    headers: {
      authorization: token,
    },
  });
};

export default { getAllItems, getItem, createItem, updateItem, deleteItem };
