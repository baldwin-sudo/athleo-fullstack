"use client";

import React, { useState, useEffect } from "react";
import {
  Dumbbell,
  Timer,
  Award,
  TrendingUp,
  Crown,
  Calendar,
  Target,
  Flame,
  ChevronUp,
  BarChart3,
  Trophy,
  Square,
} from "lucide-react";

const WorkoutPage = () => {
  const [userLevel, setUserLevel] = useState("Débutant");
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [streakDays, setStreakDays] = useState(5);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);

  const handleStartPose = async () => {
    try {
      console.log("Starting pose detection for Bicep Curls...");
      const response = await fetch("http://127.0.0.1:5000/start");
      const data = await response.json();
      console.log(data.message); // Log the response
      setIsWorkoutActive(true);
      setActiveExercise("Bicep Curls");
    } catch (error) {
      console.error("Error starting pose detection:", error);
    }
  };

  const handleStopPose = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/stop");
      const data = await response.json();
      console.log(data.message); // Log the response
      setIsWorkoutActive(false);
      setActiveExercise(null);
    } catch (error) {
      console.error("Error stopping pose detection:", error);
    }
  };

  // Handle exercise click
  const handleExerciseClick = (exercise) => {
    console.log(`Clicked on: ${exercise.name}`);

    if (exercise.name === "Bicep Curls") {
      console.log("Bicep Curls clicked - starting pose detection");
      handleStartPose();
    } else {
      console.log(`${exercise.name} clicked - no specific action defined`);
    }
  };

  // Workout history - tracking completed exercises per day
  const [workoutHistory, setWorkoutHistory] = useState([
    {
      date: "2025-05-23",
      exercises: [
        { name: "Push-ups", reps: 15, target: 15, completed: true },
        { name: "Squats", reps: 20, target: 20, completed: true },
        { name: "Plank", reps: 1, target: 1, completed: true, duration: 60 },
      ],
      totalTime: 1200, // 20 minutes
      points: 45,
    },
    {
      date: "2025-05-22",
      exercises: [
        { name: "Push-ups", reps: 12, target: 15, completed: false },
        { name: "Lunges", reps: 18, target: 18, completed: true },
      ],
      totalTime: 900, // 15 minutes
      points: 30,
    },
    {
      date: "2025-05-21",
      exercises: [
        { name: "Squats", reps: 25, target: 20, completed: true },
        { name: "Mountain Climbers", reps: 15, target: 15, completed: true },
        { name: "Burpees", reps: 10, target: 12, completed: false },
      ],
      totalTime: 1800, // 30 minutes
      points: 40,
    },
    {
      date: "2025-05-20",
      exercises: [
        { name: "Push-ups", reps: 10, target: 15, completed: false },
        { name: "Plank", reps: 1, target: 1, completed: true, duration: 45 },
      ],
      totalTime: 600, // 10 minutes
      points: 20,
    },
    {
      date: "2025-05-19",
      exercises: [
        { name: "Jumping Jacks", reps: 30, target: 25, completed: true },
        { name: "Squats", reps: 20, target: 20, completed: true },
        { name: "Push-ups", reps: 15, target: 15, completed: true },
      ],
      totalTime: 1500, // 25 minutes
      points: 50,
    },
  ]);

  // Exercise data with black and white images
  const exercises = [
    {
      id: 1,
      name: "Bicep Curls",
      image:
        "https://s.yimg.com/ny/api/res/1.2/WS_eHKrKI2rG1U2iR2PiRA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/the_manual_309/1c1f0863129aa66020541bcc9d91d9af",
      difficulty: "Débutant",
      targetMuscles: ["Biceps", "Arms"],
    },
    {
      id: 2,
      name: "Squats",
      image:
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=200&fit=crop&crop=center&sat=-100",
      difficulty: "Débutant",
      targetMuscles: ["Legs", "Glutes"],
    },
    {
      id: 3,
      name: "Plank",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/701/how-to-do-perfect-plank-1-1506734605.jpeg",
      difficulty: "Débutant",
      targetMuscles: ["Core", "Arms"],
    },
    {
      id: 4,
      name: "Lunges",
      image:
        "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=200&h=200&fit=crop&crop=center&sat=-100",
      difficulty: "Intermédiaire",
      targetMuscles: ["Legs", "Glutes"],
    },
    {
      id: 5,
      name: "Burpees",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&crop=center&sat=-100",
      difficulty: "Avancé",
      targetMuscles: ["Full Body"],
    },
    {
      id: 6,
      name: "Mountain Climbers",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=center&sat=-100",
      difficulty: "Intermédiaire",
      targetMuscles: ["Core", "Legs"],
    },
    {
      id: 7,
      name: "Pull-ups",
      image:
        "https://img.freepik.com/premium-photo/bodybuilder-doing-pull-ups-best-back-exercises_600776-36878.jpg?w=360",
      difficulty: "Avancé",
      targetMuscles: ["Back", "Arms"],
    },
    {
      id: 8,
      name: "Deadlifts",
      image:
        "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=200&h=200&fit=crop&crop=center&sat=-100",
      difficulty: "Avancé",
      targetMuscles: ["Back", "Legs"],
    },
    {
      id: 9,
      name: "Jumping Jacks",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center&sat=-100",
      difficulty: "Débutant",
      targetMuscles: ["Full Body"],
    },
  ];

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate today's points
  const calculateTodayPoints = () => {
    const pointsPerRep = 2;
    const bonusForCompletion = 10;

    let totalPoints = 0;
    completedExercises.forEach((exercise) => {
      totalPoints += exercise.reps * pointsPerRep;
      if (exercise.completed) {
        totalPoints += bonusForCompletion;
      }
    });

    return totalPoints;
  };

  // Calculate weekly stats
  const getWeeklyStats = () => {
    const totalWorkouts = workoutHistory.length;
    const totalTime = workoutHistory.reduce(
      (sum, day) => sum + day.totalTime,
      0
    );
    const totalPoints = workoutHistory.reduce(
      (sum, day) => sum + day.points,
      0
    );
    const avgWorkoutTime = totalTime / totalWorkouts;

    return {
      totalWorkouts,
      totalTime: Math.floor(totalTime / 60), // in minutes
      totalPoints,
      avgWorkoutTime: Math.floor(avgWorkoutTime / 60), // in minutes
    };
  };

  // Calculate progression data
  const getProgressionData = () => {
    const last7Days = workoutHistory.slice(0, 7);
    const thisWeekAvg =
      last7Days.reduce((sum, day) => sum + day.points, 0) / last7Days.length;
    const lastWeekAvg = 25; // Simulated data
    const improvement = ((thisWeekAvg - lastWeekAvg) / lastWeekAvg) * 100;

    // Personal bests
    const personalBests = {
      pushUps: 18,
      squats: 25,
      plank: 75, // seconds
      burpees: 12,
    };

    return {
      weeklyImprovement: improvement,
      personalBests,
      nextGoals: {
        pushUps: personalBests.pushUps + 3,
        squats: personalBests.squats + 5,
        plank: personalBests.plank + 15,
        burpees: personalBests.burpees + 3,
      },
    };
  };

  const weeklyStats = getWeeklyStats();
  const progressionData = getProgressionData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block hover:scale-105 transition-transform duration-200">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
              Workout
            </h1>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Track your exercises and monitor your fitness progression
          </p>

          {/* Level Indicator */}
          <div className="mt-4 flex justify-center">
            <div className="bg-black/30 px-4 py-2 rounded-full flex items-center">
              <span className="text-[#16DDE3] mr-2">
                <Crown size={16} />
              </span>
              <span className="text-sm text-gray-300 mr-1">Level:</span>
              <span className="text-[#16DDE3] font-medium">{userLevel}</span>
            </div>
          </div>
        </div>

        {/* Active Workout Banner */}
        {isWorkoutActive && (
          <div className="mb-12 bg-gradient-to-r from-[#16DDE3]/20 to-[#0B737A]/20 border border-[#16DDE3]/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="animate-pulse bg-[#16DDE3] rounded-full w-3 h-3 mr-3"></div>
                <div>
                  <h3 className="text-lg font-bold text-[#16DDE3]">
                    Workout Active
                  </h3>
                  <p className="text-gray-300">
                    Currently tracking: {activeExercise}
                  </p>
                </div>
              </div>
              <button
                onClick={handleStopPose}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center"
              >
                <Square size={18} className="mr-2 fill-current" />
                Stop Workout
              </button>
            </div>
          </div>
        )}

        {/* Weekly Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-2">
              <Flame size={20} className="text-[#16DDE3]" />
            </div>
            <div className="text-2xl font-bold text-[#16DDE3]">
              {streakDays}
            </div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-2">
              <Calendar size={20} className="text-[#16DDE3]" />
            </div>
            <div className="text-2xl font-bold text-[#16DDE3]">
              {weeklyStats.totalWorkouts}
            </div>
            <div className="text-sm text-gray-400">Workouts</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-2">
              <Timer size={20} className="text-[#16DDE3]" />
            </div>
            <div className="text-2xl font-bold text-[#16DDE3]">
              {weeklyStats.totalTime}m
            </div>
            <div className="text-sm text-gray-400">Total Time</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-2">
              <Award size={20} className="text-[#16DDE3]" />
            </div>
            <div className="text-2xl font-bold text-[#16DDE3]">
              {weeklyStats.totalPoints}
            </div>
            <div className="text-sm text-gray-400">Points</div>
          </div>
        </div>

        {/* Exercise Selection Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
            <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
              <Dumbbell size={24} className="text-[#16DDE3]" />
            </span>
            Exercise Library
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isWorkoutActive && activeExercise === exercise.name
                    ? "ring-2 ring-[#16DDE3] ring-offset-2 ring-offset-gray-900"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isWorkoutActive) {
                    handleExerciseClick(exercise);
                  }
                }}
              >
                <div className="relative w-48 h-48 mx-auto">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className={`w-full h-full object-cover rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:shadow-[#16DDE3]/20 transition-all duration-300 grayscale pointer-events-none ${
                      isWorkoutActive && activeExercise !== exercise.name
                        ? "opacity-50"
                        : ""
                    }`}
                    draggable={false}
                  />

                  {/* Active indicator */}
                  {isWorkoutActive && activeExercise === exercise.name && (
                    <div className="absolute top-2 right-2 bg-[#16DDE3] text-black px-2 py-1 rounded-full text-xs font-bold">
                      ACTIVE
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
                    <span className="text-white text-sm font-bold">
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>

                <div className="text-center mt-4 pointer-events-none">
                  <h3 className="font-semibold text-white mb-1 text-lg">
                    {exercise.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {exercise.targetMuscles.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Now 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workout Progress */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <Target size={20} className="text-[#16DDE3]" />
              </span>
              Today's Progress
            </h2>

            {/* Timer */}
            <div className="bg-black/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Timer size={24} className="text-[#16DDE3] mr-3" />
                  <span className="text-gray-300">Workout Time</span>
                </div>
                <span className="text-3xl font-bold text-[#16DDE3]">
                  {formatTime(workoutTimer)}
                </span>
              </div>
            </div>

            {/* Points */}
            <div className="bg-black/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award size={24} className="text-[#16DDE3] mr-3" />
                  <span className="text-gray-300">Points Earned</span>
                </div>
                <span className="text-3xl font-bold text-[#16DDE3]">
                  +{calculateTodayPoints()}
                </span>
              </div>
            </div>

            {/* Completed Exercises Today */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-[#16DDE3]">
                Completed Today
              </h3>
              {completedExercises.length > 0 ? (
                <div className="space-y-3">
                  {completedExercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="bg-black/30 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-white">
                          {exercise.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {exercise.reps} reps completed
                        </p>
                      </div>
                      <div className="text-[#16DDE3]">
                        <Award size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  No exercises completed yet today.
                </p>
              )}
            </div>

            {/* Exercise Tips */}
            <div className="bg-gradient-to-br from-[#16DDE3]/10 to-transparent rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 text-[#16DDE3]">
                Exercise Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Keep your form consistent throughout the movement</li>
                <li>• Focus on controlled movements rather than speed</li>
                <li>• Breathe properly during each repetition</li>
                <li>• Take breaks if you feel any discomfort</li>
              </ul>
            </div>
          </div>

          {/* Progression Tracking Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <BarChart3 size={20} className="text-[#16DDE3]" />
              </span>
              Progression
            </h2>

            {/* Weekly Improvement */}
            <div className="bg-black/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Weekly Progress</span>
                <div className="flex items-center">
                  <ChevronUp size={16} className="text-[#16DDE3] mr-1" />
                  <span className="text-[#16DDE3] font-bold">
                    +{Math.abs(progressionData.weeklyImprovement).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#16DDE3] to-[#0B737A] h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      Math.abs(progressionData.weeklyImprovement),
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Personal Bests */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-[#16DDE3] flex items-center">
                <Trophy size={16} className="mr-2" />
                Personal Bests
              </h3>
              <div className="space-y-3">
                <div className="bg-black/30 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-gray-300">Push-ups</span>
                  <span className="text-[#16DDE3] font-bold">
                    {progressionData.personalBests.pushUps}
                  </span>
                </div>
                <div className="bg-black/30 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-gray-300">Squats</span>
                  <span className="text-[#16DDE3] font-bold">
                    {progressionData.personalBests.squats}
                  </span>
                </div>
                <div className="bg-black/30 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-gray-300">Plank</span>
                  <span className="text-[#16DDE3] font-bold">
                    {progressionData.personalBests.plank}s
                  </span>
                </div>
                <div className="bg-black/30 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-gray-300">Burpees</span>
                  <span className="text-[#16DDE3] font-bold">
                    {progressionData.personalBests.burpees}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Goals */}
            <div className="bg-gradient-to-br from-[#16DDE3]/10 to-transparent rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 text-[#16DDE3]">
                Next Goals
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Push-ups Goal</span>
                  <span className="text-white font-bold">
                    {progressionData.nextGoals.pushUps}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Squats Goal</span>
                  <span className="text-white font-bold">
                    {progressionData.nextGoals.squats}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Plank Goal</span>
                  <span className="text-white font-bold">
                    {progressionData.nextGoals.plank}s
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Burpees Goal</span>
                  <span className="text-white font-bold">
                    {progressionData.nextGoals.burpees}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Workout History */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <TrendingUp size={20} className="text-[#16DDE3]" />
              </span>
              Workout History
            </h2>

            <div className="space-y-5">
              {workoutHistory.map((day, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-400">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-gray-500">
                        {formatTime(day.totalTime)}
                      </span>
                      <span className="text-sm font-medium text-[#16DDE3]">
                        +{day.points}
                      </span>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 group-hover:bg-black/40 transition-colors">
                    <div className="space-y-2">
                      {day.exercises.map((exercise, exerciseIndex) => (
                        <div
                          key={exerciseIndex}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-300">{exercise.name}</span>
                          <div className="flex items-center space-x-2">
                            <span
                              className={
                                exercise.completed
                                  ? "text-[#16DDE3]"
                                  : "text-gray-500"
                              }
                            >
                              {exercise.reps}/{exercise.target}
                            </span>
                            {exercise.completed && (
                              <Award size={12} className="text-[#16DDE3]" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Streak Info */}
            <div className="mt-8 bg-[#16DDE3]/10 p-4 rounded-xl">
              <div className="flex items-center">
                <div className="p-3 bg-[#16DDE3]/20 rounded-full mr-4">
                  <Flame className="text-[#16DDE3]" size={24} />
                </div>
                <div>
                  <p className="text-gray-300">Current Streak</p>
                  <p className="text-2xl font-bold text-[#16DDE3]">
                    {streakDays} days
                  </p>
                </div>
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="mt-6 bg-gradient-to-br from-[#16DDE3]/10 to-transparent rounded-xl p-4">
              <h3 className="font-bold text-[#16DDE3] mb-2">This Week</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Avg Duration</p>
                  <p className="text-white font-semibold">
                    {Math.floor(
                      weeklyStats.totalTime / weeklyStats.totalWorkouts
                    )}
                    m
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Total Points</p>
                  <p className="text-white font-semibold">
                    {weeklyStats.totalPoints}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkoutPage;
