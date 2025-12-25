"use client";
import { ChevronRightIcon } from "lucide-react";
import { usePopupStore } from "@/store/popup-store";

export default function JoinBtn() {
  const { openJoin } = usePopupStore();
  const handleJoinTeam = () => {
    openJoin();
  };

  return (
    <>
      <button
        onClick={handleJoinTeam}
        className="bg-[#3E5EC0] hover:bg-[#2d4aa7] !mt-0 mx-auto md:mx-0 text-white px-4 py-2.5 rounded-md font-semibold text-sm transition-all duration-300 transform cursor-pointer flex items-center gap-3 group"
        suppressHydrationWarning={true}
      >
        <span>Join To Our Team</span>
        <ChevronRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </>
  );
}
