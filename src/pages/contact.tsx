import { useState } from "react";
import ContactCard from "../components/contactCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { RxCross2 } from "react-icons/rx";
import {
  Contact as ContactType,
  deleteContact,
} from "../store/Features/contactSlice";

const Contact = () => {
  // State to manage visibility of the ContactCard and the contact to edit
  const [addContact, setAddContact] = useState<boolean>(false);
  const [contactToEdit, setContactToEdit] = useState<ContactType | undefined>(
    undefined
  );

  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Accessing contact data from the Redux store
  const { contact } = useSelector((state: RootState) => state.contact);

  // Handler to close the ContactCard component
  const handleCloseCard = () => {
    setAddContact(false);
    setContactToEdit(undefined);
  };

  // Handler to set a contact for editing and open the ContactCard
  const handleEditContact = (contact: ContactType) => {
    setContactToEdit(contact);
    setAddContact(true);
  };

  // Handler to dispatch the deleteContact action with a contact ID
  const handleDeleteContact = (id: number) => {
    dispatch(deleteContact(id));
  };

  // Component rendering
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      {/* Conditional rendering of the ContactCard or a button to add a new contact */}
      {addContact ? (
        <ContactCard
          closeCard={handleCloseCard}
          contactToEdit={contactToEdit}
        />
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setAddContact(!addContact)}
        >
          Create Contact
        </button>
      )}

      {/* Display message if no contacts are found or list all contacts */}
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
        <div className="flex flex-wrap  gap-2">
          {!addContact &&
            contact?.map((item, index) => (
              <div key={index} className="flex m-5 flex-col gap-4">
                <div className="w-[250px] bg-white shadow-lg rounded-lg p-2 border">
                  <h1>
                    <b>First Name</b>: {item.firstName}
                  </h1>
                  <h1>
                    <b>Last Name</b>: {item.lastName}
                  </h1>
                  <p className="flex items-center gap-2">
                    <b>Status</b>:{" "}
                    {item.status ? (
                      <p className="text-green-500">Active</p>
                    ) : (
                      <p className="text-red-500">Inactive</p>
                    )}
                  </p>
                </div>

                {/* Buttons to edit and delete a contact */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleEditContact(item)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
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
