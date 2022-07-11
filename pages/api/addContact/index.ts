// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose, {AnyObject} from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

import {WithId} from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Add contact post route hit ...");
    try {
      console.log(req.body)
    } catch (error) {
      console.error(error)
    }
    let { loggedUser, contact }: {
      loggedUser: {
        name: string,
        email: string,
        image: string
      },
      contact: {
        id: string,
        name: string,
        email: string,
        image: string
      }
    } = req.body;

    const { id, name, email, image } = contact;
    contact = { id, name, email, image };
    // console.log("The current user is: ", loggedUser)
    // console.log("The contact is: ", contact)

    try {
      if (process.env.MONGO_URL) {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("onnected to database...")
      }
    } catch (error) {
      console.log("Error connecting to database")
      console.error(error)
    }
    const db = mongoose.connection;

    const userCollection = db.collection("users");

    
    //* Add the contacts to both parties.
    //* No acknowledment required just yet.

    //* Get logged user id
    const loggedUserId: WithId<AnyObject> | null = await userCollection.findOne({ email: loggedUser.email }, { projection: { id: 1, _id: 0 } });

    console.log("loggedUserID: ", loggedUserId);
    console.log("loggedUser: ", loggedUser);
    console.log("contact: ", contact);

    // Check if contacts exist already
    const isLoggedUserAContactOfContact = await userCollection.findOne({ id: contact.id, contacts: { $elemMatch: {id: loggedUserId?.id} } }, {projection: {email: 1}});
    const isUserAContactOfLoggedUser = await userCollection.findOne({ id: loggedUserId?.id, contacts: { $elemMatch: {id: contact.id} } }, {projection: {email: 1}});
    console.log("isLoggedUserAContactOfContact: ", isLoggedUserAContactOfContact);
    console.log("isUserAContactOfLoggedUser: ", isUserAContactOfLoggedUser);

    if (isLoggedUserAContactOfContact === null && isUserAContactOfLoggedUser === null) {
      const loggedUserUpdateStatus = await userCollection.updateOne({email: loggedUser.email}, { $push: { contacts: contact } });
      const contactUpdateStatus = await userCollection.updateOne(contact, { $push: { contacts: { ...loggedUser, id: loggedUserId?.id } } });

      console.log("loggedUserUpdateStatus: ", loggedUserUpdateStatus);
      console.log("contactUpdateStatus: ", contactUpdateStatus);
    } else {
      console.log("Contact already exists on user")
    }
    // console.log("The current user is: ", currentUser)


    res.status(200).json({ message: "success" })
  }
}
