import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineHome } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import {sidebarSlice} from "../../store/sharedSlices/sidebarSlice";
import SideBarTab from "./SideBarTab";

const SideBar = () => {
  const dispatch = useAppDispatch()
  const {isShown} = useAppSelector(state => state.sidebarReducer)
  const {width} = useWindowDimensions()
  useEffect(() => {
    if (width < 1100) {
      dispatch(sidebarSlice.actions.setIsShown(false))
    }
    if (width > 1100 && !isShown) {
      dispatch(sidebarSlice.actions.setIsShown(true))
    }
  }, [width])
  const tabs = [
    {
      title: "главная",
      icon: <AiOutlineHome className="text-xl text-gray-400" />,
    },
    {
      title: "мои задачи",
      icon: <AiOutlineCheckCircle className="text-xl text-gray-400" />,
    },
  ];
  return (
    <div className={`bg-zinc-800 w-0 grow-0 shrink-0 basis-60 transition-all ease-out duration-500 ${!isShown && "basis-0"}`}>
      <div className="my-2">
        {tabs.map((tab) => (
          <SideBarTab key={tab.title} title={tab.title} icon={tab.icon} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
