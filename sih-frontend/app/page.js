"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Droplet,
  FootprintsIcon,
  UtensilsCrossed,
  Moon,
  Dumbbell,
  Award,
  Trophy,
  PlayCircle,
  ChevronRight,
} from "lucide-react";

const HomePage = () => {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };
  const navigateTosignin = () => {
    router.push("/signin");
  };
  const navigateToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
                Fitness
              </span>{" "}
              Journey Through Gamification
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Athleo turns your fitness goals into an exciting game. Track
              progress, earn points, and unlock rewards as you build healthy
              habits.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={navigateToDashboard}
                className="px-8 py-4 bg-[#16DDE3] text-black font-semibold rounded-full hover:bg-[#0B737A] hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
              >
                Start Your Journey <ChevronRight size={20} />
              </button>
              <button className="px-8 py-4 bg-black/40 text-white font-semibold rounded-full hover:bg-black/60 border border-[#16DDE3]/50 transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
                <PlayCircle size={20} /> Watch Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            {/* Abstract geometric shapes with fitness theme */}
            <div className="relative w-full h-96 rounded-3xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#16DDE3]/10 rounded-full -translate-y-1/3 translate-x-1/4 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#16DDE3]/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-xl"></div>

              {/* Activity icons arranged in a pattern */}
              <div className="absolute top-1/4 left-1/4 p-4 bg-black/30 backdrop-blur-sm rounded-2xl transform -rotate-6 shadow-lg border border-white/10">
                <FootprintsIcon size={48} className="text-green-400" />
              </div>
              <div className="absolute top-1/2 right-1/4 p-4 bg-black/30 backdrop-blur-sm rounded-2xl transform rotate-12 shadow-lg border border-white/10">
                <Droplet size={48} className="text-red-400" />
              </div>
              <div className="absolute bottom-1/4 left-1/3 p-4 bg-black/30 backdrop-blur-sm rounded-2xl transform rotate-6 shadow-lg border border-white/10">
                <UtensilsCrossed size={48} className="text-purple-400" />
              </div>
              <div className="absolute top-1/3 right-1/5 p-4 bg-black/30 backdrop-blur-sm rounded-2xl transform -rotate-12 shadow-lg border border-white/10">
                <Moon size={48} className="text-cyan-400" />
              </div>
              <div className="absolute bottom-1/5 right-1/3 p-4 bg-black/30 backdrop-blur-sm rounded-2xl transform rotate-3 shadow-lg border border-white/10">
                <Dumbbell size={48} className="text-yellow-400" />
              </div>

              {/* Trophy/Award in center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-gradient-to-br from-[#16DDE3]/30 to-black/50 backdrop-blur-sm rounded-full shadow-lg shadow-[#16DDE3]/20 border border-[#16DDE3]/30">
                <Trophy size={72} className="text-[#16DDE3]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Your Fitness, <span className="text-[#16DDE3]">Gamified</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Athleo combines health tracking with game mechanics to keep you
            motivated and engaged.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <div className="p-4 bg-[#16DDE3]/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
              <FootprintsIcon size={32} className="text-[#16DDE3]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Activity Tracking</h3>
            <p className="text-gray-300">
              Track steps, hydration, nutrition, sleep, and workouts - all in
              one place with intuitive visualizations.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <div className="p-4 bg-[#16DDE3]/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
              <Award size={32} className="text-[#16DDE3]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Points & Rewards</h3>
            <p className="text-gray-300">
              Earn points for meeting your daily goals and unlock badges,
              levels, and real rewards for your achievements.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <div className="p-4 bg-[#16DDE3]/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
              <Trophy size={32} className="text-[#16DDE3]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Leaderboards</h3>
            <p className="text-gray-300">
              Compete with friends or join the global community to stay
              motivated and celebrate your progress together.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It <span className="text-[#16DDE3]">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Athleo makes getting healthy fun and engaging with our simple
            approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#16DDE3] rounded-full flex items-center justify-center font-bold text-black text-xl">
              1
            </div>
            <h3 className="text-xl font-bold mb-3 mt-6">Set Your Goals</h3>
            <p className="text-gray-300">
              Define your fitness objectives based on your level: beginner,
              intermediate, or advanced.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#16DDE3] rounded-full flex items-center justify-center font-bold text-black text-xl">
              2
            </div>
            <h3 className="text-xl font-bold mb-3 mt-6">
              Track Daily Activities
            </h3>
            <p className="text-gray-300">
              Log your steps, water intake, meals, sleep, and workouts to earn
              points and see your progress.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#16DDE3] rounded-full flex items-center justify-center font-bold text-black text-xl">
              3
            </div>
            <h3 className="text-xl font-bold mb-3 mt-6">Earn & Compete</h3>
            <p className="text-gray-300">
              Gain points, level up, unlock badges, and compete with friends to
              stay motivated.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#16DDE3]/20 to-transparent backdrop-blur-sm rounded-3xl p-10 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to <span className="text-[#16DDE3]">Transform</span> Your
            Fitness Journey?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of users who have already gamified their way to
            better health habits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={navigateToDashboard}
              className="px-8 py-4 bg-[#16DDE3] text-black font-semibold rounded-full hover:bg-[#0B737A] hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform"
            >
              Get Started Now
            </button>
            <button
              onClick={navigateToSignup}
              className="px-8 py-4 bg-black/40 text-white font-semibold rounded-full hover:bg-black/60 border border-[#16DDE3]/50 transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold text-[#16DDE3]">ATHLEO</div>
            <p className="text-gray-400">
              Gamification du suivi d'activité physique
            </p>
          </div>
          <div className="flex gap-8">
            <Link
              href="/about-us"
              className="text-gray-300 hover:text-[#16DDE3] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-[#16DDE3] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/leaderboard"
              className="text-gray-300 hover:text-[#16DDE3] transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className="text-gray-300 hover:text-[#16DDE3] transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          © 2025 Athleo. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
