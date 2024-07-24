import Link from "next/link";
import React from "react";
interface MobileNavProps {
  activeNav: boolean;
}
const MobileNav = ({ activeNav }: MobileNavProps) => {
  return (
    <nav
      className={`absolute ${
        activeNav ? "top-20" : "-top-96"
      } transition-all flex right-36 md:hidden flex-col bg-slate-800 items-center gap-6 rounded-lg list-none text-white py-3 px-5`}
    >
      <li>
        <Link className="transition hover:opacity-80" href={"/orders"}>
          Commandes Prêtes
        </Link>
      </li>
      <li>
        <Link className="transition hover:opacity-80" href={"/in-progress"}>
          Commandes en cours
        </Link>
      </li>
      <li>
        <Link className="transition hover:opacity-80" href={"/add"}>
          Ajouter une commande
        </Link>
      </li>
    </nav>
  );
};

export default MobileNav;
