import ThreadInterface from "../interfaces/forum/thread/thread";

export default function searchFilterThread(
  data: ThreadInterface,
  filterKey: boolean,
  searchKey: string
) {
  // TODO: Filter by category
  if (filterKey) {
    return data.memorize === true;
  }

  // TODO: Improvement search key from left to right
  if (searchKey.toLocaleLowerCase() !== "") {
    let normSearchKey = searchKey.toLowerCase();
    return data.title.toLowerCase().includes(normSearchKey);
  }

  return data;
}
