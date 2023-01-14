export default interface ThreadBodyInterface {
  title: string;
  content: string;
  images?: string[];
  tags: Set<string>;
}
