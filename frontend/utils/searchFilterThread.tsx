import { IThread } from "../interfaces/forum/post/post";

export default function searchFilterThread(
  data: IThread,
  filterKey: boolean,
  searchKey: string
) {
  if (filterKey) {
    return data.isMarked === true;
  }

  // TODO: Improvement search key from left to right
  if (searchKey.toLocaleLowerCase() !== "") {
    let normSearchKey = searchKey.toLowerCase();
    return data.title.toLowerCase().includes(normSearchKey);
  }

  return data;
}
