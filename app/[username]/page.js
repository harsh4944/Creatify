import { Prata } from "next/font/google";
import React from "react";
import PaymentPage from "@/Components/PaymentPage";
import { notFound } from "next/navigation";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
const Username = async ({ params }) => {
  const { username } = await params;
  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({ username: username });
    if (!u) {
      return notFound();
    }
  }
  await checkUser()


  return (
    <>
      <PaymentPage username={username} />
    </>
  );
};
export default Username;


export async function generateMetadata({ params }) { 
  const { username } = await params; 
  return { title: `Support ${username} - Get Me A Chai`, }; }