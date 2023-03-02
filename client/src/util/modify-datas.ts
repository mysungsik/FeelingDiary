import { TypeUserDiary } from "../store/user-diary-slice";

export const modifyToCalendar = (input: TypeUserDiary[]) => {
  const modified = [];

  for (const key in input) {
    modified.push({
      id: input[key]._id,
      title: input[key].diaryTitle,
      start: new Date(input[key].date).toISOString().replace(/T.*$/, ""),
    });
  }

  return modified;
};
