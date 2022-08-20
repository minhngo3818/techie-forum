import { Box, Container } from "@mui/material";
import { Router, useRouter } from "next/router";
import { NextRouter } from "next/router";
import PageHeader from "../../components/pageHeader";
import Thread from "../../components/threads";

const Field = () => {
  const router: NextRouter = useRouter();
  const pageName: any = router.query.name;

  // TODO:
  // Find the reason Threads does not render
  // Fix bug content disappear after refreshing

  // Dummy content
  const author: string = "Tony";
  const content: string = "lorem ipsum aiudiqhicbasjdbcabsjdc";
  const created: string = "07/17/2077";
  const likes: number = 200;
  return (
    <>
      <PageHeader pageName={pageName} />
      <Thread
        author={author}
        created={created}
        content={content}
        likes={likes}
        category={pageName}
      ></Thread>
    </>
  );
};

export default Field;
