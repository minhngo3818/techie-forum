import { Box, Container } from "@mui/material";
import { Router, useRouter } from "next/router";
import { NextRouter } from "next/router";
import PageHeader from "../../components/pageHeader";
import Thread from "../../components/threads";

const Field = () => {
  const router: NextRouter = useRouter();
  const name: any = router.query.name;

  // TODO:
  // Find the reason Threads does not render
  // Fix bug content disappear after refreshing
  return (
    <>
      <PageHeader pageName={name} />
      <Thread username="Tony" thread="lorem ipsum aiudiqhicbasjdbcabsjdc" />
    </>
  );
};

export default Field;
