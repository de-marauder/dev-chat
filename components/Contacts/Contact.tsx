import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';


type User = {
  image: string;
  name: string;
  email: string;
  id: Number;
}

type Props = {
  user: User;
  addContact: Boolean
}

export default function Contact({user, addContact}: Props) {

  const {data: session} = useSession()

  const router = useRouter()

  const doNothing = () => {};

  const openChatHandler = () => {
    console.log("opening chat...")
    router.push(`chats/${user.id}`)
  }
  const addContactHandler = async () => {
    console.log("adding contact...")

    console.log("The current user is: ", session?.user)
    console.log("The contact is: ", user)

    const content = {
      loggedUser: session?.user,
      contact: user
    }

    const response = await axios.post(`/api/addContact/`, content)

    console.log(response)
  }

  return (
    <>
    <section onClick={!addContact ? openChatHandler : doNothing}>
        <img width='50px' height='50px' src={user.image} alt="" />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        {addContact ? <button onClick={addContactHandler}>Add contact</button> : null}
    </section>
    </>
  )
}
