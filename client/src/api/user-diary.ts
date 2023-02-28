import { TypeUserDiary } from "../store/user-diary-slice";

export const getUserDiary = async (userEmail: string) => {
  const response = await fetch(`http://localhost:5000/api/diary/${userEmail}`);
  const responseData = await response.json();

  return responseData.data;
};

export const insertUserDiary = async (userInput: TypeUserDiary) => {
  const response = await fetch(`http://localhost:5000/api/diary/insert`, {
    method: "POST",
    body: JSON.stringify(userInput),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  return responseData;
};

export const deleteUserDiary = async (id: string) => {
  const response = await fetch(`http://localhost:5000/api/diary/delete/${id}`, {
    method: "DELETE",
  });

  const responseData = await response.json();

  return responseData;
};
