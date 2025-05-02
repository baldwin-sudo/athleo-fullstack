import Image from "next/image";
import coins from "../assets/coins.png";
const Page = ({}) => {
  return (
    <div className="flex flex-col  w-full">
      <div className=" self-end flex  items-center justify-center font-bold text-xl  rounded-2xl bg-neutral-50 w-fit px-2 py-1">
        1205 <Image className="size-[1.5rem]" src={coins} />{" "}
        <span className="flex  items-center p-2 justify-center bg-green-500 rounded-full text-xl font-bold text-white h-6 w-6 ">
          +
        </span>
      </div>
      <h1 className="text-center  text-xl text-cyan-300 font-semibold">
        Store
      </h1>{" "}
      <div className=" mt-3 w-full h-screen rounded-lg bg-neutral-300"></div>
    </div>
  );
};

export default Page;
