import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex justify-center flex-col gap-4 text-white items-center h-[44vh]  ">
      <div className="text-5xl flex gap-2 font-bold justify-center items-center">Buy Me a Chai <span><img src="/chai.gif" width="88" alt="" /></span></div>
      <p>
        A crowdfunding platform for creators. Fund your projects with a cup of
        chai.
      </p>
      <div className="gap-4 flex">
        <button type="button" className="text-white bg-gradient-to-br rounded-lg from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Start Here</button>
        <button type="button" className="text-white bg-gradient-to-br rounded-lg from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Read More</button>
      </div>
    </div>
      <div className="bg-white h-1 opacity-10">
      </div>

      <div>
        <h1>Your Fans can buy you a Chai </h1>
        <div className="flex gap-5">
          <div
        </div>
      </div>
      </>
  );
}
