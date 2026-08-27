import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center flex-col gap-4 text-white items-center h-[44vh]  px-5 md:px-0 text-xs md:text-base">
      <div className="md:text-5xl flex gap-2 md:gap-5 font-bold justify-center items-center text-3xl">Creatify<span><img className="invertImg" src="/chai.gif" width="88" alt="" /></span></div>
      <p className="text-center md:text-left">
         A crowdfunding platform where you can discover and support your favorite creators and projects.
      </p>
      <div className="gap-4 flex">
        <Link href={"/login"}>
        <button type="button" className="text-white bg-gradient-to-br rounded-lg from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Start Here</button>
         </Link>
         <Link href={"/about"}>
        <button type="button" className="text-white bg-gradient-to-br rounded-lg from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Read More</button>
       </Link>
      </div>
    </div>
      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto py-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">Support Your Favorite Creators</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
            <p className="font-bold text-center">Discover Creators</p>
            <p className=" text-center"> Find creators and projects that inspire you.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
            <p className="font-bold text-center">Support Their Ideas</p>
            <p className=" text-center"> Fund the projects you believe in.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
            <p className="font-bold text-center">Be Part of the Journey</p>
            <p className=" text-center"> Help creators turn their ideas into reality.</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto py-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us </h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%]">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/InuaxrN_6mk?si=jZjq7ON7m-qSlAMG&amp"
    title="YouTube video player" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  />
      </div>
      </div>


      
      </>
  );
}
