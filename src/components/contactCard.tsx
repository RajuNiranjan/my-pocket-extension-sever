import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Contact,
  addContact,
  editContact,
} from "../store/Features/contactSlice";

interface CardProps {
  closeCard: () => void;
  contactToEdit?: Contact; // Optional contact for editing
}

const ContactCard = ({ closeCard, contactToEdit }: CardProps) => {
  const [contact, setContact] = useState<Contact>({
    firstName: "",
    lastName: "",
    status: false,
    id: undefined,
  });

  const dispatch = useDispatch();

  // Populate form if editing
  useEffect(() => {
    if (contactToEdit) {
      setContact(contactToEdit);
    }
  }, [contactToEdit]);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onStatusChange = (status: boolean) => {
    setContact((prev) => ({ ...prev, status }));
  };

  const onSubmitContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contact.id) {
      dispatch(
        editContact({
          ...contact,
          id: contact.id,
        })
      );
    } else {
      dispatch(addContact(contact));
    }
    closeCard();
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center">
          {contact.id ? "Edit Contact" : "Create Contact"}
        </h1>
        <form
          className="w-[450px] border rounded-lg shadow-lg p-4 flex flex-col gap-4"
          onSubmit={onSubmitContact}
        >
          <div className="flex items-center gap-4">
            <label htmlFor="firstName">First Name :</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={contact.firstName}
              onChange={onChangeText}
              className="border p-3 rounded-lg"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="lastName">Last Name :</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={contact.lastName}
              onChange={onChangeText}
              className="border p-3 rounded-lg"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <h1>Status : </h1>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="status"
                  id="active"
                  value="true"
                  checked={contact.status}
                  onChange={() => onStatusChange(true)}
                />
                <label htmlFor="active">Active</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="status"
                  id="inactive"
                  value="false"
                  checked={!contact.status}
                  onChange={() => onStatusChange(false)}
                />
                <label htmlFor="inactive">Inactive</label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {contact.id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactCard;
