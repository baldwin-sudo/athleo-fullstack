"use client";

import React, { useState } from "react";
import Image from "next/image";
import profileImg from "../../assets/fake-profile/avatar.jpg";
import slamBallImage from "../../assets/img/shop/Fitness Slam Ball.jpg";

const ProfilePage = () => {
  const [showEditMode, setShowEditMode] = useState(false);

  const userStats = {
    level: "Aventurier",
    points: 3550,
    rank: 15,
    streak: 7,
    totalWorkouts: 45,
    totalSteps: 125000,
    badges: [
      { id: 1, name: "Bronze", earned: true },
      { id: 2, name: "Silver", earned: true },
      { id: 3, name: "Gold", earned: false },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block hover:scale-105 transition-transform duration-200">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
              Profile
            </h1>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Track your progress and unleash your inner athlete
          </p>
        </div>

        {/* User Info Card */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Header */}
          <div className="lg:col-span-3 bg-gradient-to-r from-[#16DDE3]/20 to-transparent rounded-3xl p-8 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-200">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative w-40 h-40 hover:scale-110 transition-transform duration-200">
                <Image
                  src={profileImg}
                  alt="Profile"
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-[#16DDE3] shadow-lg object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">
                  TOUINSSI Nouhaila
                </h2>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  <span className="px-4 py-2 bg-[#16DDE3] text-black rounded-full font-semibold">
                    {userStats.level}
                  </span>
                  <span className="px-4 py-2 bg-white/10 rounded-full">
                    {userStats.points} PTS
                  </span>
                  <span className="px-4 py-2 bg-white/10 rounded-full">
                    Rank #{userStats.rank}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h3 className="text-2xl font-bold mb-6">Progress Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Next Level</span>
                  <span className="text-[#16DDE3]">Expert</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#16DDE3] to-[#0B737A]"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-black/30 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Streak</p>
                  <p className="text-3xl font-bold text-white">
                    {userStats.streak} days
                  </p>
                </div>
                <div className="bg-black/30 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Total Workouts</p>
                  <p className="text-3xl font-bold text-white">
                    {userStats.totalWorkouts}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h3 className="text-2xl font-bold mb-6">Badges</h3>
            <div className="grid grid-cols-3 gap-4">
              {userStats.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`relative aspect-square rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200 ${
                    badge.earned ? "bg-[#16DDE3]/20" : "bg-gray-700/50"
                  }`}
                >
                  <div
                    className={`text-4xl ${
                      badge.earned ? "text-[#16DDE3]" : "text-gray-500"
                    }`}
                  >
                    {badge.name === "Bronze" && "🥉"}
                    {badge.name === "Silver" && "🥈"}
                    {badge.name === "Gold" && "🥇"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h3 className="text-2xl font-bold mb-6">Stats</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#16DDE3]/20 rounded-xl flex items-center justify-center">
                    <span className="text-[#16DDE3] text-2xl">👣</span>
                  </div>
                  <div>
                    <p className="text-gray-400">Total Steps</p>
                    <p className="text-xl font-bold">
                      {userStats.totalSteps.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#16DDE3]/20 rounded-xl flex items-center justify-center">
                    <span className="text-[#16DDE3] text-2xl">💧</span>
                  </div>
                  <div>
                    <p className="text-gray-400">Water Goal</p>
                    <p className="text-xl font-bold">8/8 glasses</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#16DDE3]/20 rounded-xl flex items-center justify-center">
                    <span className="text-[#16DDE3] text-2xl">😴</span>
                  </div>
                  <div>
                    <p className="text-gray-400">Sleep Average</p>
                    <p className="text-xl font-bold">7h 30m</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.01] transition-transform duration-200">
            <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Completed Workout", time: "2 hours ago", icon: "💪" },
                { title: "Earned Silver Badge", time: "1 day ago", icon: "🥈" },
                {
                  title: "Reached 10,000 steps",
                  time: "2 days ago",
                  icon: "👣",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="bg-black/30 p-4 rounded-xl flex items-center gap-4 hover:scale-[1.02] transition-transform duration-200"
                >
                  <div className="w-12 h-12 bg-[#16DDE3]/20 rounded-full flex items-center justify-center text-2xl">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{activity.title}</p>
                    <p className="text-sm text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-3 flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-[#16DDE3] text-black font-semibold rounded-full hover:bg-[#0B737A] transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform">
              Edit Profile
            </button>
            <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform">
              Share Progress
            </button>
            <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform">
              Settings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
