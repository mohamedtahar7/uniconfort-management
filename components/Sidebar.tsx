import Link from "next/link";
import React from "react";
import { FaClipboardList } from "react-icons/fa";
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
          All Orders
        </Link>
        <Link
          href="/in-progress"
          className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer"
        >
          <RiProgress3Fill size={25} className="text-white" />
          Orders in progress
        </Link>
        <Link
          href={"/add"}
          className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer"
        >
          <MdAddCircle size={25} className="text-white" />
          Add Order
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
