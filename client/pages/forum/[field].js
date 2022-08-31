import { Router, useRouter } from "next/router";
import PageHeader from "../../components/PageHeader";
import Thread from "../../components/Thread";

const Field = () => {
  const router = useRouter();
  const pageName = router.query.name;

  // Dummy content
  const author = "Tony";
  const content = "lorem ipsum aiudiqhicbasjdbcabsjdc";
  const created = "07/17/2077";
  const likes = 200;
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
