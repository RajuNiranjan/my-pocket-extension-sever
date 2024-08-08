import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Contact,
  addContact,
  editContact,
} from "../store/Features/contactSlice";

// Define the type for the props expected by the ContactCard component
interface CardProps {
  closeCard: () => void; // Function to close the contact card
  contactToEdit?: Contact; // Optional contact object for editing
}

// The ContactCard component, taking the closeCard function and an optional contactToEdit object
const ContactCard = ({ closeCard, contactToEdit }: CardProps) => {
  // State management for the contact, initialized based on whether there is a contact to edit
  const [contact, setContact] = useState<Contact>({
    firstName: "",
    lastName: "",
    status: false,
    id: undefined,
  });

  // Using useDispatch hook from react-redux to dispatch actions
  const dispatch = useDispatch();

  // Effect to populate the contact form if there's an existing contact to edit
  useEffect(() => {
    if (contactToEdit) {
      setContact(contactToEdit);
    }
  }, [contactToEdit]); // Dependency on contactToEdit to run only when it changes

  // Handler for text input changes, updating state with computed property names
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handler for status change (Active/Inactive)
  const onStatusChange = (status: boolean) => {
    setContact((prev) => ({ ...prev, status }));
  };

  // Handler for form submission, dispatching add or edit actions based on contact id presence
  const onSubmitContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (contact.id) {
      dispatch(editContact({ ...contact, id: contact.id }));
    } else {
      dispatch(addContact(contact));
    }
    closeCard(); // Close the contact card upon submission
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center">
          {contact.id ? "Edit Contact" : "Create Contact"}
        </h1>
        <form
          className="md:w-[450px] border rounded-lg shadow-lg p-4 flex flex-col gap-4"
          onSubmit={onSubmitContact}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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
            <h1>Status :</h1>
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

// Exporting the ContactCard component
export default ContactCard;
