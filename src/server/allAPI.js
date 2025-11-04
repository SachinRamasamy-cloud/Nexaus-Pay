import axios from "axios";
import BASEURL from "./serverAPI";

export const getAllUsers = async () => {
  const res = await axios.get(`${BASEURL}/users`);
  return res.data;
};

export const getUserByNumber = async (number) => {
  const res = await axios.get(`${BASEURL}/users?number=${encodeURIComponent(number)}`);
  return res.data[0];
};

export const registerUser = async (user) => {
  return axios.post(`${BASEURL}/users`, user);
};

export const updateUser = async (id, updatedUser) => {
  return axios.put(`${BASEURL}/users/${id}`, updatedUser);
};
