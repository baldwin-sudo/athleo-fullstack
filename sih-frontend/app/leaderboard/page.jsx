import { NextPage } from "next";

const users = [
  { username: "AlphaWolf", points: 1200 },
  { username: "CodeNinja", points: 1150 },
  { username: "PixelPusher", points: 990 },
  { username: "DebugDiva", points: 870 },
  { username: "StackSurfer", points: 820 },
  { username: "MesosBaldr", points: 800 },
];

const Page = () => {
  return (
    <div className=" h-fit lg:max-w-1/2 mx-auto bg-neutral-600 rounded-xl text-white flex flex-col items-center p-10 px-10">
      <h1 className="text-4xl font-bold mb-10">🏆 Leaderboard</h1>
      <div className="w-full max-w-md space-y-4">
        {users.map((user, index) => (
          <div
            key={user.username}
            className="bg-neutral-800 rounded-xl p-4 box-border flex justify-between items-center shadow-lg hover:scale-[1.05] duration-200 transition-transform"
          >
            <span className="font-semibold text-lg">
              #{index + 1} {user.username}
            </span>
            <span className="text-cyan-400 font-bold text-lg">
              {user.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
