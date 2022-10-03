import { faker } from "@faker-js/faker";
import forumLinks from "../page-path/forum-links";

const threadData = [];

const tagsList = [];
const tagsLimit = Mathh.floor(Math.random() * 10);
for (let i = 0; i < tagsLimit; i += 1) {
  tags.push(faker.lorem.word());
}

for (let i = 0; i <= 50; i += 1) {
  let author = faker.name.fullName();
  let avatar = faker.image.abstract();
  let title = faker.lorem.sentence(5);
  let content = faker.lorem.paragraph(5);
  let created = faker.date.recent();
  let tags = tagsList;
  let category =
    forumLinks[Math.floor(Math.random() * forumLinks.length)]?.path;
  let likes = Math.floor(Math.random() * 100);

  threadData.push({
    author,
    avatar,
    title,
    content,
    created,
    tags,
    category,
    likes,
  });
}

export default threadData;
