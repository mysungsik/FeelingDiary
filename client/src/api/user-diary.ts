import { TypeUserDiary } from "../store/user-diary-slice";
import { client } from "../util/axios";

export const getUserDairy = async (userEmail: string) => {
  const response = await client.get(`/${userEmail}`);
  return response.data.data;
};

export const insertUserDiary = async (userInput: TypeUserDiary) => {
  const response = await client.post("/insert", userInput);
  return response.data;
};

export const deleteUserDiary = async (id: string) => {
  const response = await client.delete(`/delete/${id}`);
  return response.data;
};
