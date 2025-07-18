import React from "react";
// import Container from "@/components/Container";
import Hero from "@/components/Hero";
import FindScheme from "@/components/FindScheme";
import FAQ from "@/components/FAQ";
import ProcessSteps from "@/components/ProcessSteps";
import About from "@/components/About";
import BentoGrid from "@/components/BentoGrid";

const page = () => {
  return (
    <>
      <Hero />
      {/* <Container> */}
      <About />
      <FindScheme />
      <BentoGrid />
      <ProcessSteps />
      <FAQ limit={3} />
      {/* </Container> */}
    </>
  );
};

export default page;
