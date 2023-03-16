import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { USER_ROUTE } from "../../data/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { sidebarSlice } from "../../store/sharedSlices/sidebarSlice"

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {isShown} = useAppSelector(state => state.sidebarReducer)
  console.log(isShown);
  
  const { setIsShown } = sidebarSlice.actions;
  return (
    <header className="bg-zinc-800 flex justify-between items-center p-2 border-b border-zinc-700">
      <div onClick={() => dispatch(setIsShown(!isShown))} className="flex justify-center items-center p-1 w-7 h-7 hover:bg-zinc-700 rounded-sm cursor-pointer">
        <AiOutlineMenu className="w-full h-full" color="white" />
      </div>
      <img
        onClick={() => navigate(USER_ROUTE)}
        className="cursor-pointer rounded-full w-8 h-8 object-cover"
        src="https://picsum.photos/id/237/300/200"
      />
    </header>
  );
};

export default Header;
