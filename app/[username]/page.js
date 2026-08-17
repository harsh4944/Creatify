import { Prata } from "next/font/google";
import React from "react";
import PaymentPage from "@/Components/PaymentPage";
const Username = async ({ params }) => {

  const { username } = await params;
  return (
    <>
      
      <PaymentPage username={username}/>
    </>
  );
};
export default Username;
