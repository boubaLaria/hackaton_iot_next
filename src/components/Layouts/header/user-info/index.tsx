"use client";

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/session");

        const data = await res.json();
        setUser({
          name: `${data.first_name} ${data.last_name}`,
          email: data.email,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      // Appel à l'API de déconnexion
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (res.ok) {
        // Réinitialiser l'état utilisateur après déconnexion
        setUser(null);
        window.location.href = "/auth/sign-in"; // Rediriger vers la page de connexion
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">Mon compte</span>

        <figure className="flex items-center gap-3">
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <span>{loading ? "Chargement..." : user ? user.name : "Non connecté"}</span>
            <ChevronUpIcon
              aria-hidden
              className={cn("rotate-180 transition-transform", isOpen && "rotate-0")}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">Informations utilisateur</h2>

        {loading ? (
          <div className="p-4 text-center text-gray-600 dark:text-gray-400">Chargement...</div>
        ) : user ? (
          <>
            <figure className="flex items-center gap-2.5 px-5 py-3.5">
              <figcaption className="space-y-1 text-base font-medium">
                <div className="mb-2 leading-none text-dark dark:text-white">{user.name}</div>
                <div className="leading-none text-gray-6">{user.email}</div>
              </figcaption>
            </figure>

            <hr className="border-[#E8E8E8] dark:border-dark-3" />

            <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
              <button
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
                onClick={handleLogout}
              >
                <LogOutIcon />
                <span className="text-base font-medium">Déconnexion</span>
              </button>
            </div>
          </>
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">Vous n'êtes pas connecté</p>
            <div className="mt-4 space-y-2">
              <Link
                href="/auth/sign-in"
                className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Se connecter
              </Link>
              <Link
                href="/auth/sign-up"
                className="inline-block rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        )}
      </DropdownContent>
    </Dropdown>
  );
}
