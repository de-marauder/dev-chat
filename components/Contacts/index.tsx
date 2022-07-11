import React, { Key, useState } from "react";

import Modal from "../utils/Modal";
import Contact from "./Contact";
import AddContactList from "./AddContactList";

type Props = {
  users: [];
  contacts: [];
};

type User = {
  image: string;
  name: string;
  email: string;
  id: Number;
}


export default function Contacts({ users, contacts }: Props) {

  const [showModal, toggler] = useState(false);

  const addContactHandler = () => {
    toggler(!showModal);
  };

  const contactList = contacts?.map(
    (user: User, id: Key) => {
      return <Contact key={id} addContact={false} user={user} />;
    }
  );

  const addContactModal = (
    <Modal toggle={toggler}>
      <AddContactList users={users} />
    </Modal>
  );

  return (
    <>
      {showModal && addContactModal}
      <section>
        <div>
          <h1>Contacts</h1>
          <button onClick={addContactHandler}>Add new contact</button>
        </div>
        {contactList}
      </section>
    </>
  );
}
