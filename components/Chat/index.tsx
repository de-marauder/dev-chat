import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState, useRef, useEffect } from "react";

import classes from "../../styles/Chats/index.module.scss";
import { render } from "react-dom";
import ChatItem from "./chat";

// let socket: Socket;
type Chat = { from: string, to: string, message: string, created_at: string };

export default function Chat({ contact, chats }: { contact: { image: string, name: string, email: string }, chats: [senderChats: [], receiverChats: []] }) {
  // const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<{ from: string, to: string, message: string, created_at: string }[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect((): any => {
    // connect to socket server
    const socket = io("http://localhost:3000", {
      path: '/api/socket'
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      // setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: { from: string, to: string, message: string, created_at: string }) => {
      console.log(message);
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const { data: session } = useSession();

  const [message, setMessage] = useState('');

  const chatAreaRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    // Send message to socket.io

    if (message) {
      const data = {
        from: session?.user?.email,
        to: contact.email,
        message: message,
        created_at: new Date(),
      }
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (resp?.ok) setMessage('');
    }

    inputRef.current?.focus();


    // Append message to chat
    // socket.on('chat-message', (socketId, message) => {
    //   console.log("socketId: ", socketId)

    //   // create chat element
    //   const chat: JSX.Element = (
    //     <div className="chat" style={{ justifyContent: message.from === session?.user?.email ? 'end' : undefined, display: 'flex' }}>
    //       <li style={{ textAlign: message.from === session?.user?.email ? 'right' : undefined, listStyle: 'none', width: 'fit-content', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem', background: '#888' }}>
    //         <h4 style={{ fontSize: '.8rem', textAlign: 'left' }}>{message.from.split('@')[0]}</h4>
    //         <p style={{ margin: '.5rem 0' }}>
    //           {message.message}
    //         </p>

    //         <span style={{ fontSize: '.8rem' }}>{message.created_at.split('.')[0].split('T').join(' ')}</span>

    //       </li>
    //     </div>
    //   );

    //   //* Append chat element to chat area and scroll to bottom
    //   // convert chat area to a type of HTMLElement
    //   const chatAreaRefCurrent = chatAreaRef.current as HTMLDivElement;
    //   // create a temoporary div
    //   const temp: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    //   // set id to temp-div
    //   temp.setAttribute('id', 'temp-div');
    //   // Append temp div to chat area
    //   chatAreaRefCurrent.appendChild(temp);
    //   // render chat into temp
    //   render(chat, temp);
    //   // Get rendered chat
    //   const newChat: HTMLElement = temp.querySelector('.chat') as HTMLElement;
    //   // replace temp div with newChat
    //   // const parent: HTMLElement = temp.parentNode as HTMLElement;
    //   chatAreaRefCurrent.replaceChild(newChat, temp)
    //   // scroll to view
    //   newChat.scrollIntoView({ behavior: 'smooth' });
    //   // remove id attribute on rendered chat to prevent future conflicts
    //   newChat.removeAttribute('id');
    // })
  }

  //* useEffect to scroll last chat into view
  useEffect(() => {
    const chatArea: HTMLElement = document.getElementById('chat_area') as HTMLElement;
    const lastChild: HTMLElement = chatArea.children[chatArea.children.length - 1] as HTMLElement;
    console.log(lastChild);
    lastChild?.scrollIntoView();
  }, [])

  //* Create array of all chats
  const prevChatsArr: [] = [];
  if (chats[0].length > 0 && chats[1].length > 0) {
    const maxArrLength = Math.max(chats[0].length, chats[1].length);
    for (let i = 0; i < maxArrLength; ++i) {
      // Add chats to prevChats if they exist
      chats[0][i] && prevChatsArr.push(chats[0][i]);
      chats[1][i] && prevChatsArr.push(chats[1][i]);
    }
  } else if (chats[0].length > 0 && chats[1].length === 0) {
    chats[0].forEach((chat, id) => {
      prevChatsArr.push(chat);
    })
  } else if (chats[1].length > 0 && chats[0].length === 0) {
    chats[1].forEach((chat, id) => {
      prevChatsArr.push(chat);
    })
  }
  //* Sort chats byt date using the getTime method to return time in milliseconds since the ECMAScript Epoch: 00:00:00 January 1st, 1970
  const sortedPrevChatsArr = prevChatsArr.sort((a: { created_at: string }, b: { created_at: string }) => {
    const result = -(new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return result;
  })

  const prevChats = sortedPrevChatsArr.map((chat: { from: string, to: string, message: string, created_at: string }, id: number) => {
    return (<ChatItem key={id} {...chat} loggedUser={session?.user} />)
  })

  return (
    <section className={classes.chat}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={contact.image} alt="" />
        <h1 style={{ marginLeft: "2rem" }}>{contact.name}</h1>
      </div>

      <div id="chat_area" ref={chatAreaRef} className={classes.chat__area}>
        {prevChats}
        {chat.length ? chat.map((chat: { from: string, to: string, message: string, created_at: string }, id: number) => {
          return (<ChatItem key={id} {...chat} loggedUser={session?.user} />)
        }) : null}
      </div>

      <div className={classes.create_chat}>
        <form onSubmit={(e) => sendMessage(e)} className={classes.create_chat__image}>
          {(session?.user?.image !== null) && <img src={session?.user?.image} alt="your image" />}
          <input id='message' ref={inputRef} className={classes.create_chat__input} type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className="btn btn-primary" type="submit">Send</button>
        </form>
      </div>
    </section>
  );
}
