"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import brand from "../assets/brand-logo.png"; // ajuste le chemin si besoin

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/utilisateur/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      alert("Connexion réussie !");
      // redirection possible ici
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm bg-neutral-800 rounded-xl p-6 shadow-lg text-sm space-y-4">
        <div className="flex justify-center">
          <Image src={brand} alt="Brand Logo" className="w-36" />
        </div>
        <h1 className="text-xl font-bold text-center text-cyan-300 mb-2">
          Connexion
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-white">
              Nom d’utilisateur
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border rounded px-3 py-2 bg-neutral-50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-300 transition"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-white">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded px-3 py-2 bg-neutral-50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-300 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-500 font-semibold text-white py-2 rounded hover:bg-cyan-600 transition"
          >
            Se connecter
          </button>
        </form>
        <p className="text-center text-white text-xs mt-4">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-cyan-300 hover:underline">
            Créez-en un ici
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
