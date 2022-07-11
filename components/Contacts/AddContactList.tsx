import React from "react";
import Contact from "./Contact";

type Props = {
    users: []
  }

export default function contactList({ users }: Props) {
  // console.log("users: ", users)
  const contacts = users.map((user, id) => {
    return <Contact key={id} addContact={true} user={user} />;
  });
  return <div>{contacts}</div>;
}
