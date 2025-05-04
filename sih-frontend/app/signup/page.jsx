"use client";
import Image from "next/image";
import React, { useState } from "react";
import brand from "../assets/brand-logo.png";
import Link from "next/link";
const fields = [
  { name: "username", label: "nom d'utilisateur", type: "text" },
  { name: "password", label: "mot de passe", type: "password" },
  { name: "age", label: "Âge", type: "number" },
  { name: "sexe", label: "Sexe", type: "text" },
  { name: "imc", label: "IMC", type: "number" },
  { name: "pasParJour", label: "Pas/jour", type: "number" },
  {
    name: "sportParSemaine",
    label: "combien de fois vous pratiquez du Sport par semaine ?",
    type: "number",
  },
  { name: "sommeil", label: "Sommeil (h)", type: "number" },
  { name: "tempsDispoParJour", label: "Temps dispo/jour", type: "number" },
  { name: "objectif", label: "Objectif (encodé)", type: "text" },
];

const Page = () => {
  const [formData, setFormData] = useState({
    age: "",
    sexe: "",
    imc: "",
    pasParJour: "",
    sportParSemaine: "",
    sommeil: "",
    tempsDispoParJour: "",
    objectif: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      alert("Inscription réussie !");
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
          Inscription
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="font-medium mb-1 text-white">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border border-neutral-300 rounded px-3 py-2 bg-neutral-50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-300 transition duration-200"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-cyan-500 font-semibold text-white py-2 rounded hover:bg-cyan-600 transition"
          >
            S’inscrire
          </button>
        </form>
        <p className="text-center text-white text-xs mt-4">
          Vous avez déja compte ?{" "}
          <Link href="/signin" className="text-cyan-300 hover:underline">
            Connectez-en ici
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
