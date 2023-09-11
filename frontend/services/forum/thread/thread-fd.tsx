import { IThreadBody } from "@interfaces/forum/post/post";

export default function threadFormData(data: IThreadBody) {
  let formData = new FormData();

  for (var key in data) {
    let value = data[key as keyof IThreadBody];

    if (key === "tags" && Array.isArray(value)) {
      let tags = Array.from(value);
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    }

    if (key === "images" && value instanceof FileList) {
      for (let i = 0; i < value.length; i += 1) {
        formData.append(`images[${i}]`, value[i], value[i].name);
      }
    }

    if (typeof value === "string") {
      formData.append(key, value);
    }
  }

  return formData;
}
