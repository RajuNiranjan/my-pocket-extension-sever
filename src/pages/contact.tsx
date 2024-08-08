import React, { useState } from "react";
import ContactCard from "../components/contactCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { RxCross2 } from "react-icons/rx";
import { deleteContact } from "../store/Features/contactSlice";

interface ContactFormProp {
  firstName: string;
  lastName: string;
  status: boolean;
}

const Contact = () => {
  const [addContact, setAddContact] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { contact } = useSelector((state: RootState) => state.contact);

  const handleCloseCard = () => {
    setAddContact(false);
  };

  const handleDeleteContact = (id: number) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      {addContact ? (
        <ContactCard closeCard={handleCloseCard} />
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setAddContact(!addContact)}
        >
          Create Contact
        </button>
      )}

      {contact.length === 0 && !addContact ? (
        <div className="flex items-center justify-center gap-2 border p-2 rounded-lg shadow-lg">
          <div className="h-7 w-7 bg-black text-white p-1 flex justify-center items-center rounded-full">
            <RxCross2 />
          </div>
          <p className="w-[250px]">
            No Contact Found Please add Contact from create contact button
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 gap-2
        "
        >
          {!addContact &&
            contact?.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="w-[250px] bg-white shadow-lg rounded-lg p-2 border">
                  <h1>First Name: {item.firstName}</h1>
                  <h1>Last Name: {item.lastName}</h1>
                  <p className="flex items-center gap-2">
                    Status :{" "}
                    {item.status === true ? (
                      <p className="text-green-500">Active</p>
                    ) : (
                      <p className="text-red-500">Inactive</p>
                    )}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteContact(item.id!)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Contact;
