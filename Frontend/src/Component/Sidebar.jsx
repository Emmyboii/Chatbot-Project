import React, { useState } from 'react'
import Logo from "../Images/logo.JPG"
import {
  FaTimes,
  FaRegEdit
} from "react-icons/fa";

const Sidebar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className={nav ? "fixed left-[-100%]" : "fixed w-[240px] bg-white h-[100vh] shadow-md shadow-black left-0 top-0"}>
      <header className="absolute flex my-5 mx-[30px]">
        <img className="h-[27px] w-[27px] text-white bg-[#9b76f1] flex items-center justify-center rounded text-[35px]mt-0 mr-[10px] mb-[7px] ml-0"
          src={Logo} alt="/" />
        <h2 className="text-[20px] font-semibold">EMMBOT</h2>
      </header>
      <div className="miss absolute left-[200px] mt-5 cursor-pointer bg-[#c6cacc] rounded-[7px] w-[30px] h-[30px]">
        <FaTimes onClick={handleNav} className='text-[26px] text-white pt-[3px] pr-0 pb-0 pl-[3px] cursor-pointer' />
      </div>
      <p className="absolute flex top-[50px] mt-5 ml-8 text-[16px] cursor-pointer">
        <FaRegEdit className='mt-[3px] mr-[10px] text-[18px]' /> New Conversation
      </p>
    </div>

  )
}

export default Sidebar