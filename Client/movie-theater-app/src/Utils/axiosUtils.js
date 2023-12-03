import axios from "axios";

const getAllItems = (url) => axios.get(url);

const getItem = (url, id) => axios.get(`${url}/${id}`); 

const createItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => {
    delete obj._id;
    return axios.put(`${url}/${id}`, obj);
  };

const deleteItem = (url, id) => axios.delete(`${url}/${id}`); 

export default { getAllItems, getItem, createItem, updateItem, deleteItem };
