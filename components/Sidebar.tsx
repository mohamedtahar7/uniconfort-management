import Link from "next/link";
import React from "react";
import { FaClipboardList, FaShippingFast } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { RiProgress3Fill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="md:flex hidden h-screen flex-col gap-20 w-64 bg-slate-800 text-white">
      <div className="p-4 font-bold text-lg">Uniconfort Management</div>
      <ul>
        <Link
          href={"/orders"}
          className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer"
        >
          <FaClipboardList size={25} className="text-white" />
          Commandes Prêtes
        </Link>
        <Link
          href="/in-progress"
          className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer"
        >
          <RiProgress3Fill size={25} className="text-white" />
          Commandes en cours
        </Link>
        <Link
          href="/shipped-orders"
          className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer"
        >
          <FaShippingFast size={25} className="text-white" />
          Commandes livrées
        </Link>
        <Link
          href={"/add"}
          className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer"
        >
          <MdAddCircle size={25} className="text-white" />
          Ajouter une Commande
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
