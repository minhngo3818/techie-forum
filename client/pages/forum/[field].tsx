import { Router, useRouter } from "next/router";
import { NextRouter } from "next/router";

const Field = () => {
  const router: NextRouter = useRouter();
  return <h1>This is Forum Page : {router.asPath}</h1>;
};

export default Field;
