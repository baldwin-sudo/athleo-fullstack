import Link from 'next/link';

export default function Objectifs() {
  return (
    <main className="bg-[#525252] text-white min-h-screen">
      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="my-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              <span className="text-cyan-400">7 GAMIFIED </span>HEALTH OBJECTIVES
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "NUTRITION TRACKER",
                  subtitle: "Balance Your Diet",
                  description: "Track your eating habits, earn badges for balanced meals, and complete weekly nutrition challenges.",
                  points: "Up to 150 points/day",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                },
                {
                  title: "STEP COUNTER",
                  subtitle: "Walk Your Way to Rewards",
                  description: "Track daily steps, compete in step challenges, and unlock achievements at milestone levels.",
                  points: "1 point per 100 steps",
                  link: "/tracking-pas", // Ajout du lien
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )
                },
                {
                  title: "TRAINING CYCLES",
                  subtitle: "Level Up Your Fitness",
                  description: "Follow structured workout programs, earn XP for each completed session, and level up your fitness profile.",
                  points: "100-300 points per workout",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )
                },
                {
                  title: "WEIGHT JOURNEY",
                  subtitle: "Milestone Achievements",
                  description: "Log your weight daily, visualize progress with interactive charts, and celebrate reaching target milestones.",
                  points: "50 points for daily logging",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  )
                },
                {
                  title: "HYDRATION QUEST",
                  subtitle: "Water Intake Challenges",
                  description: "Track water consumption, complete hydration streaks, and earn special badges for consistent daily intake.",
                  points: "20 points per glass",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )
                },
                {
                  title: "POSTURE MASTER",
                  subtitle: "Perfect Your Form",
                  description: "Get personalized stretching routines with real-time form feedback through Openpose technology.",
                  points: "75 points per stretching session",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  title: "SLEEP GUARDIAN",
                  subtitle: "Rest Recovery Points",
                  description: "Monitor sleep patterns, improve sleep quality, and collect dream points for achieving optimal sleep duration.",
                  points: "Up to 200 points per night",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )
                },
              ].map((item, index) => {
                // Wrapping the card with Link if there's a link
                const CardContent = (
                  <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 hover:border-cyan-400 transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <div>{item.icon}</div>
                      <div className="bg-cyan-400/20 text-cyan-400 text-xs font-bold px-2 py-1 rounded-full">
                        {item.points}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-cyan-400 mb-3">{item.subtitle}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">COMPLETION</span>
                        <span className="text-xs text-gray-500">LEVEL {index + 1}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" 
                          style={{width: `${Math.floor(Math.random() * 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                );

                // Return Link-wrapped content if item has link, otherwise return content directly
                return item.link ? (
                  <Link href={item.link} key={index}>
                    {CardContent}
                  </Link>
                ) : CardContent;
              })}
            </div>
          </div>
          
          {/* Rewards Section */}
          <div className="my-16 p-6 bg-gradient-to-r from-gray-900 to-black rounded-lg shadow-lg border border-gray-800">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
              <span className="text-cyan-400">REWARDS </span>& ACHIEVEMENTS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Fitness Rookie", "Hydration Hero", "Sleep Master", "Step Champion"].map((badge, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center border-4 border-cyan-400/30">
                    <span className="text-2xl text-cyan-400/70">
                      {index + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{badge}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-400">Complete daily objectives to unlock badges and earn points!</p>
              <button className="mt-4 bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold py-2 px-6 rounded-md">
                VIEW ALL REWARDS
              </button>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 mb-8 text-center bg-gradient-to-b from-gray-900 to-black p-8 rounded-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Ready to <span className="text-cyan-400">gamify your health journey?</span>
            </h3>
            <p className="text-gray-400 mb-6">Join thousands of users who have transformed their health habits through our gamified approach</p>
            <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded-md mx-2">
              START YOUR JOURNEY
            </button>
            <button className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold py-3 px-8 rounded-md mx-2">
              SEE LEADERBOARD
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}