import Image from "next/image";
import profileImg from "../assets/fake-profile/avatar.jpg";
import gymIcon from "../assets/gymIcon.png";
import shoesIcon from "../assets/shoesIcon.png";
import pointsIcon from "../assets/pointsIcon.png";
export default function Page() {
  const profile = {
    name: "Christina",
    email: "christina@gmail.com",
    totalPoints: 2560,
    totalSteps: 10503,
    totalGymSessions: 50,
    weightNow: 80,
    weightStart: 86,
    weightLost: 6,
  };
  return (
    <div className=" flex flex-col lg:flex-row px-5 gap-5">
      {/* card 1 */}
      <div className="flex flex-col gap-5">
        <div className=" w-full mx-auto max-w-96 box-border  rounded-xl bg-neutral-600">
          <div className=" flex flex-col items-center justify-center px-10 py-10">
            <Image
              src={profileImg}
              className="size-20 rounded-full"
              alt="profile Image"
            />
            <h1 className="font-bold text-white text-3xl">{profile.name}</h1>
            <h1 className="font-regular text-neutral-300 text-lg">
              {profile.email}
            </h1>
          </div>
        </div>
        {/* card 2 */}{" "}
        <div className=" grow flex flex-col gap-10 bg-neutral-600 rounded-xl py-5 ">
          <h1 className="font-semibold text-cyan-300 text-xl lg:text-2xl text-center py-2">
            Weight Evolution
          </h1>
          <div className="flex  justify-center space-x-10">
            <div className="flex flex-col items-center">
              {" "}
              <p className="font-bold text-lg text-red-500">Started</p>
              <p className="text-white  font-semibold text-center text-lg">
                {" "}
                {profile.weightStart}{" "}
                <span className="font-medium text-neutral-300"> kg</span>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg text-green-400">Now</p>
              <p className="text-white  font-semibold text-center text-lg">
                {" "}
                {profile.weightNow}{" "}
                <span className="font-medium text-neutral-300"> kg</span>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg text-orange-400 ">Lost</p>
              <p className="text-white  font-semibold text-center text-lg">
                {" "}
                {profile.weightLost}{" "}
                <span className="font-medium text-neutral-300"> kg</span>
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* card 3 */}
      <div className=" grow flex flex-col gap-10 bg-neutral-600 rounded-xl px-3 py-5 justify-center h-50">
        <h1 className="font-semibold text-cyan-300 text-lg lg:text-xl text-center py-2">
          Insights About your Journey
        </h1>
        <div className="flex  justify-center space-x-10">
          <div className="flex flex-col items-center">
            {" "}
            <Image src={pointsIcon} className="size-12" />
            <p className="text-white  font-semibold text-center text-lg">
              {" "}
              {profile.totalPoints}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={gymIcon} className="size-12" />
            <p className="text-white  font-semibold text-center text-lg">
              {" "}
              {profile.totalGymSessions}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={shoesIcon} className="size-12" />
            <p className="text-white  font-semibold text-center text-lg">
              {" "}
              {profile.totalSteps}
            </p>
          </div>
        </div>
      </div>
      {/* card 4  */}
      <div className=" grow flex flex-col gap-10 bg-neutral-600 rounded-xl py-5 justify-center h-50">
        <h1 className="font-semibold text-cyan-300 text-xl lg:text-2xl text-center py-2">
          Other Informations
        </h1>
        <div className="flex  justify-center space-x-10">
          <div className="flex flex-col items-center">
            {" "}
            <Image src={pointsIcon} className="size-12" />
            <p className="text-white  font-semibold text-center text-lg">
              {" "}
              {profile.totalPoints}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={gymIcon} className="size-12" />
            <p className="text-white  font-semibold text-center text-lg">
              {" "}
              {profile.totalGymSessions}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={shoesIcon} className="size-12" />
            <p className="text-white  font-semibold text-center text-lg">
              {" "}
              {profile.totalSteps}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
