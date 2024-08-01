import React, { useState } from 'react'
import Logo from "../Images/logo.JPG"
import Sidebar from "./Sidebar"
import {
    FaArrowUp,
    FaRegEdit
} from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import OpenAI from 'openai';


const openai = new OpenAI({
    organization: "org-C663YHai8qJI1Q3NC1hx8iNf",
    apiKey: "sk-None-hcP6L9VlFj4eihF6CAuTT3BlbkFJ2TgwDNOd1HlJDjBvtcZI",
    dangerouslyAllowBrowser: true
})


const Body = () => {
    const [nav, setNav] = useState(false);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const chat = async (e, message) => {
        e.preventDefault();

        setIsTyping(true);

        let msgs = chats;
        msgs.push({ role: "user", content: message });
        setChats(msgs);

        chat.scrollTo(0, 1e10);
        setMessage("");

        await openai.chat.completions.create({
            model: "gpt-4o-mini-2024-07-18",
            messages: [
                {
                    role: "system",
                    content: "You are EmmyBot. You help to trobleshoot issues"
                },
                ...chats,
            ],
        }).then((result) => {
            msgs.push(result.data.choices[0].message);
            setChats(msgs);
            setIsTyping(false);
        }).catch(error => console.log(error));
    };


    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <form onSubmit={e => chat(e, message)}>
            <div className='w-[100%] absolute'>
                <header className="absolute flex mt-5 mx-[30px]">
                    <img
                        className="h-[27px] w-[27px] text-white bg-[#9b76f1] flex items-center justify-center rounded text-[35px] mt-0 mr-[10px] mb-[7px] ml-0"
                        src={Logo} alt="/" />
                    <h2 class="text-[20px] font-semibold">EMMBOT</h2>
                </header>
                <p className='absolute mt-[55px] ml-[30px] w-[25px] bg-white rounded-lg cursor-pointer'>
                    <FaRegEdit className='text-[26px] pl-[6px] pr-1' />
                </p>

                <div className='absolute top-[50%] text-[25px] cursor-pointer'>
                    <HiOutlineMenuAlt1 onClick={handleNav} />
                    {nav ? <Sidebar /> : <div className='left-[-100%]'><Sidebar /></div>}
                </div>

                <ul className="h-[535px] pt-[120px] px-[60px] overflow-y-auto">
                    <li className="justify-end flex mr-[5%]">
                        {
                            chats && chats.length ? (
                                chats.map((chat, index) => (
                                    <p key={index} className="st text-white rounded-[10px] py-[10px] px-5 bg-[#529de4]">
                                        {chat.content}
                                    </p>
                                ))
                            ) : ""
                        }
                    </li>
                    <li className={"flex md:ml-[30%] ml-[29%] lg:ml-[25%]"}>
                        <img
                            className={isTyping ? "h-[30px] w-[30px] text-white bg-[#743ef3] flex items-center justify-center rounded text-[40px] mr-[10px] self-end" : "hidden"}
                            src={Logo} alt="/" />
                        <p className={isTyping ? "text-black rounded-[10px] py-[10px] px-5 mt-[50px] bg-[#c6cacc]" : ""}>
                            {isTyping ? (<div>
                                <p>
                                    <i>Thinking...</i>
                                </p>
                            </div>) : ""}
                            {chat.result}
                        </p>
                    </li>
                </ul>
                <div className="md:ml-[34%] ml-[33%] lg:ml-[28%] flex">
                    <input
                        type='text' className="outline-none border-none w-[85%] rounded-[50px] h-[60px] pt-[19px] pr-0 pb-[16px] pl-[25px] text-[15px] resize-none shadow-md shadow-black"
                        placeholder="Enter your message"
                        value={message} onChange={(e) => setMessage(e.target.value)} required />
                    <button type='submit' className="miss self-center ml-[-54px] pr-[8px] pl-[4.7px] h-[47px] invisible w-[40px] leading-[35px] bg-[#529de4]  rounded-[19px]">
                        <FaArrowUp className='arrow text-[#fff] text-[30px]' />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Body