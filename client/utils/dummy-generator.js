import { faker } from "@faker-js/faker";
import forumLinks from "../page-path/forum-links";

const randomGenerator = (limit) => {
  return Math.floor(Math.random() * limit) + 1;
};

const threadData = [];
const threadLimit = randomGenerator(200);
const tagsList = [];

for (let i = 0; i < threadLimit; i += 1) {
  let tags = [];
  let tagsLimit = randomGenerator(20);
  for (let i = 0; i <= tagsLimit; i += 1) {
    tags.push(faker.lorem.word());
  }
  tagsList.push(tags);
}

for (let i = 0; i <= threadLimit; i += 1) {
  let author = faker.name.fullName();
  let avatar = faker.image.abstract(60, 60, true);
  let title = faker.lorem.sentence(5);
  let content = faker.lorem.paragraph(5);
  let created = faker.date.recent(20).toLocaleDateString();
  let tags = tagsList[i];
  let category =
    forumLinks[Math.floor(Math.random() * forumLinks.length)]?.path;
  let likes = randomGenerator(100);
  let numOfComments = randomGenerator(80);

  threadData.push({
    author,
    avatar,
    title,
    content,
    created,
    tags,
    category,
    likes,
    numOfComments,
  });
}

export default threadData;
