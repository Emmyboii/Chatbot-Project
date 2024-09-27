import React, { useState, useEffect } from 'react'
import Logo from "../Images/logo.JPG"
import {
    FaArrowUp,
    FaRegEdit,
    FaUserCircle
} from "react-icons/fa";


const Body = () => {
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const refreshPage = () => {
        window.location.reload();
    }

    useEffect(() => {
        const keyEnter = event => {
            event.preventDefault()
        }

        document.addEventListener('submit', keyEnter)
    }, [])

    const chat = async (e, message) => {
        e.preventDefault();

        if (!message) return;
        setIsTyping(true);
        window.scrollTo(0, 1e10);

        setChats(chats => [...chats, {
            role: "user",
            parts: message,
        }
        ])
        setMessage("");
        try {
            const response = await fetch("http://localhost:8080/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    history: chats,
                    message: message
                })
            })
            const data = await response.text()
            console.log(data)

            setChats(chats => [...chats, {
                role: "model",
                parts: data,
            }
            ])
            setIsTyping(false)
            window.scrollTo(0, 1e10);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='h-screen'>
            <header className="md:absolute flex mt-5 mb-[12px] mx-[55px] z-30">
                <button onClick={refreshPage} className='w-[25px] mr-4 bg-white rounded-lg '>
                    <FaRegEdit className='text-[31px] pr-[6px]' />
                </button>
                <img
                    className="h-[27px] w-[27px] mt-1 mr-[10px] ml-0"
                    src={Logo} alt="/" />
                <h2 className="text-[20px] font-semibold">EMMBOT</h2>
            </header>
            <form onSubmit={e => chat(e, message)} className='h-screen'>
                <section className='md:h-[85%] h-[81%] md:pt-[50px] pl-[3%] sm:pl-[15%] lg:pl-[20%] pr-[8%] overflow-y-auto'>
                    {chats && chats.length
                        ? chats.map((chat, index) => (
                            <div key={index} className={chat.role === "user" ? "flex flex-row-reverse gap-[px] ml-[20%] md:ml-[50%] text-white my-5" : "text-black flex py-[10px]"}>
                                <p>{chat.role === "user" ? <FaUserCircle className='text-black text-[30px] mt-[12px]' /> : <img className="h-[30px] w-[30px] mr-[50px]" src={Logo} alt="/" />}</p>
                                <p className={chat.role === "user" ? 'm-1 bg-[#529de4] rounded-[20px] py-[10px] px-[10px] md:py-[15px] md:px-5' : ""}>{chat.parts}</p>
                            </div>
                        ))
                        :
                        <div className='flex flex-col items-center justify-center'>
                            <img className="h-[50px] w-[50px] mt-[190px]" src={Logo} alt="/" />
                            <p className='mt-3 font-semibold text-[24px] text-center'>EMMBOT IS HERE FOR YOU</p>
                            <p></p>
                        </div>
                    }
                    <div className={isTyping ? "text-black rounded-[50px] py-[20px] px-5 mt-[30px] w-[20%] " : "hidden"}>
                        <p>
                            <i> {isTyping ? "Typing..." : ""}</i>
                        </p>
                    </div>
                </section>


                <div className="flex ml-[15%] lg:ml-[20%] pt-[20px]">
                    <input
                        type='text' className="outline-none border-none w-[90%] rounded-[50px] h-[60px] pt-[19px] pr-0 pb-[16px] pl-[25px] text-[15px] shadow-sm bg-slate-100 shadow-black"
                        placeholder="Enter your message"
                        value={message} onChange={(e) => setMessage(e.target.value)} required />
                    <button type='submit' className="miss self-center ml-[-54px] pr-[8px] pl-[4.7px] h-[47px] invisible w-[40px] leading-[35px] bg-[#529de4] rounded-[50px]">
                        <FaArrowUp className='arrow text-[#fff] text-[30px]' />
                    </button>
                </div>
            </form >
        </div>
    )
}

export default Body