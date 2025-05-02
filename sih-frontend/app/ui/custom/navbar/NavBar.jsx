"use client";
import React, { useState } from "react";
import Image from "next/image";
import brandLogo from "../../../assets/brand-logo.png";
import menuIco from "../../../assets/menu-ico.png";
import "./navbar.css";
import Link from "next/link";
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    { name: "DashBoard", link: "/dashboard" },
    { name: "LeaderBoard", link: "/leaderboard" },
    { name: "Objectifs", link: "/objectifs" },
    { name: "Profile", link: "/profile" },
    { name: "Store", link: "/store" },
  ];
  const onClickMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 h-auto bg-neutral-600/70 backdrop-blur-xl shadow-2xl w-11/12 box-border flex items-center justify-between gap-10 rounded-full px-8 py-2 z-50">
        <Link href="/">
          <Image src={brandLogo} alt="brand logo" className="w-30 h-10" />
        </Link>
        <ul className="navbar-list hidden lg:flex items-center gap-10 text-white font-semibold">
          {menuItems.map((item) => {
            return (
              <li className="nav-item">
                <Link href={item.link}>{item.name}</Link>
              </li>
            );
          })}

          <li>
            <button className="bg-cyan-300 text-neutral-950 transition-all duration-100 hover:bg-cyan-100 px-3 py-1.5 rounded-lg ">
              Sign out
            </button>
          </li>
        </ul>
        <button
          onClick={onClickMenu}
          className="cursor-pointer hover:opacity-70 hover:scale-110 transition-all duration-300 lg:hidden"
        >
          <Image src={menuIco} alt="menu icon" className="w-8 h-8" />
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-30"
          onClick={onClickMenu}
        ></div>
      )}

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 max-w-96 w-9/12 bg-neutral-600 p-5 rounded-lg z-40">
          <ul className="text-white font-semibold space-y-4 w-full flex flex-col gap-2-è items-center">
            {menuItems.map((item) => {
              return (
                <li
                  className="border-b-1 border-cyan-400 w-full"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  <Link prefetch href={item.link}>
                    {item.name}
                  </Link>
                </li>
              );
            })}

            <li>
              <button className="bg-cyan-300 text-neutral-950 transition-all duration-100 hover:bg-cyan-100 px-3 py-1.5 rounded-lg">
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
