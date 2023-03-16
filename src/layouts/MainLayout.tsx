import { FC, ReactNode } from "react"
import Header from "./components/Header"
import SideBar from "./components/SideBar"

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout:FC<MainLayoutProps> = ({children}) => {
  console.log('layout');
  
  return (
    <div className="h-full flex flex-col">
      <Header/>
      <div className="flex h-full min-h-0 overflow-hidden w-full">
        <SideBar/>  
        {children}
      </div>
    </div>
  )
}

export default MainLayout