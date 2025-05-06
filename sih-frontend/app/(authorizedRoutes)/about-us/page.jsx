"use client";

import React from "react";
import Link from "next/link";

// Import des images - utilisez les chemins relatifs depuis votre composant
import hommeImage from "../../assets/img/shop/homme.png";
import firstImage from "../../assets/img/shop/first.png";

export default function AboutUs() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* About Area */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="text-cyan-400 font-bold mb-2">
              WELCOME TO ATHLEO
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              THE <span className="text-cyan-400">FUTURE </span>
              OF PHYSICAL ACTIVITY
              <br />
              THROUGH <span className="text-cyan-400">GAMIFICATION </span>&{" "}
              <span className="text-cyan-400">FUN </span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-7/12 order-2 lg:order-1">
              <div className="relative">
                {/* Image avec bordure stylisée */}
                <div className="relative">
                  <img
                    src={hommeImage.src}
                    alt="Athleo Fitness Gamification"
                    className="rounded-lg w-full shadow-lg"
                    width={hommeImage.width}
                    height={hommeImage.height}
                  />
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 border-r-4 border-b-4 border-cyan-400 rounded-br-lg"></div>
                  <div className="absolute -top-2 -left-2 w-24 h-24 border-l-4 border-t-4 border-cyan-400 rounded-tl-lg"></div>
                </div>
              </div>
            </div>

            <div className="lg:w-5/12 order-1 lg:order-2">
              <div className="about-content">
                <div className="mb-6">
                  <p className="text-gray-300">
                    At Athleo, we transform your workouts into exciting
                    challenges. Using game mechanics, rewards, and real-time
                    tracking, we turn physical activity into a motivating and
                    playful experience for everyone!
                  </p>
                </div>

                <div className="mb-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
                    <li className="flex items-center bg-gray-900 p-3 rounded-lg border border-gray-800">
                      <span className="inline-block w-3 h-3 rounded-full bg-cyan-400 mr-3"></span>
                      Earn points & badges for each workout
                    </li>
                    <li className="flex items-center bg-gray-900 p-3 rounded-lg border border-gray-800">
                      <span className="inline-block w-3 h-3 rounded-full bg-cyan-400 mr-3"></span>
                      Challenge your friends in real time
                    </li>
                    <li className="flex items-center bg-gray-900 p-3 rounded-lg border border-gray-800">
                      <span className="inline-block w-3 h-3 rounded-full bg-cyan-400 mr-3"></span>
                      Track your progress through levels
                    </li>
                    <li className="flex items-center bg-gray-900 p-3 rounded-lg border border-gray-800">
                      <span className="inline-block w-3 h-3 rounded-full bg-cyan-400 mr-3"></span>
                      Unlock rewards as you get fitter
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Link
                    href="/objectifs"
                    className="bg-cyan-400 text-black font-bold py-3 px-6 rounded-md hover:bg-cyan-500 transition duration-300"
                  >
                    JOIN THE GAME
                  </Link>

                  <button
                    className="flex items-center gap-2 group text-white"
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/watch?v=nASzDWwvcww",
                        "_blank"
                      )
                    }
                  >
                    <div className="bg-gray-900 border border-cyan-400 rounded-full p-2 group-hover:bg-cyan-400/10 transition duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-medium">INTRO VIDEO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Area avec image d'arrière-plan importée */}
      <section className="relative py-16">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${firstImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-8/12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature Card 1 */}
                <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800 hover:border-cyan-400 transition-all">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-cyan-400 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">
                      Gamified Workouts
                    </h4>
                    <p className="text-gray-400">
                      Turn exercises into games with points, levels, and
                      achievements that make fitness addictive and fun
                    </p>
                  </div>
                </div>

                {/* Feature Card 2 */}
                <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800 hover:border-cyan-400 transition-all">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-cyan-400 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">
                      Social Challenges
                    </h4>
                    <p className="text-gray-400">
                      Compete with friends, join teams, and participate in
                      community events to stay motivated together
                    </p>
                  </div>
                </div>

                {/* Feature Card 3 */}
                <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800 hover:border-cyan-400 transition-all">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-cyan-400 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">
                      Progress Tracking
                    </h4>
                    <p className="text-gray-400">
                      Visualize your fitness journey with intuitive analytics,
                      milestones, and personalized insights
                    </p>
                  </div>
                </div>

                {/* Feature Card 4 */}
                <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800 hover:border-cyan-400 transition-all">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-cyan-400 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">Real Rewards</h4>
                    <p className="text-gray-400">
                      Earn exclusive discounts, digital collectibles, and
                      special perks as you reach fitness goals
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-4/12">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden h-full border border-gray-800 shadow-lg flex items-center justify-center relative">
                <div className="absolute top-0 left-0 w-full h-full bg-opacity-10 bg-cyan-400 clip-path-diagonal"></div>
                <div className="p-8 text-center relative z-10">
                  <div className="inline-block bg-cyan-400 text-black font-bold px-4 py-1 rounded-full mb-4">
                    LIMITED TIME OFFER
                  </div>
                  <h2 className="text-6xl font-bold text-white mb-2">
                    30<span className="text-cyan-400">%</span>
                  </h2>
                  <h3 className="text-3xl font-bold text-white mb-4">OFF</h3>
                  <p className="mt-4 font-medium text-gray-300">
                    Your first month subscription
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-6 inline-block bg-cyan-400 text-black py-3 px-6 rounded-md font-bold hover:bg-cyan-500 transition duration-300"
                  >
                    GET STARTED
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-t from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to{" "}
            <span className="text-cyan-400">
              transform your fitness journey?
            </span>
          </h3>
          <p className="text-gray-400 mb-8 max-w-3xl mx-auto">
            Join thousands of users who have revolutionized their approach to
            health and fitness through our gamified platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/objectifs"
              className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded-md transition-colors"
            >
              EXPLORE OBJECTIVES
            </Link>
            <Link
              href="/shop"
              className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold py-3 px-8 rounded-md transition-colors"
            >
              VIEW REWARDS
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
