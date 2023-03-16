import { FC, ReactNode } from "react";

type SideBarTabProps = {
  title: string;
  icon: ReactNode;
};

const SideBarTab: FC<SideBarTabProps> = ({ title, icon }) => {
  return (
    <div className="flex items-center cursor-pointer px-6 py-1 hover:bg-zinc-700">
      {icon}
      <div className="ml-2 text-white text-base font-sans">{title}</div>
    </div>
  );
};

export default SideBarTab;
