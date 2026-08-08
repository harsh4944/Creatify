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

      <div className="text-white container mx-auto py-32 pt-14">
        <h2 className="text-3xl font-bold text-center mb-14">Your Fans can buy you a Chai </h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className=" text-center"> Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className=" text-center"> Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className=" text-center"> Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto py-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us </h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/QtaorVNAwbI?si=uhmCHZjzCA21FaOc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

      
      </>
  );
}
