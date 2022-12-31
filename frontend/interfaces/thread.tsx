export default interface ThreadInterface {
  title: string;
  content: string;
  images?: string[];
  tags: Set<string>;
}
