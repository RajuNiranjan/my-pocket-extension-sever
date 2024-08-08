import React, { ChangeEvent, FormEvent, useState } from "react";

interface ContactFormProp {
  firstName: string;
  lastName: string;
  status: boolean;
}

const Contact = () => {
  const [contact, setContact] = useState<ContactFormProp>({
    firstName: "",
    lastName: "",
    status: false,
  });

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmitContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(contact);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center">Craete Contact</h1>
        <form
          className="w-[450px] border rounded-lg shadow-lg  p-4 flex flex-col gap-4"
          onSubmit={onSubmitContact}
        >
          <div className="flex items-center  gap-4">
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

          <div className="flex items-center  gap-4">
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
            <div className="flex  gap-4">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="status"
                  id="active"
                  value="true"
                  checked={contact.status}
                  onChange={() =>
                    setContact((prev) => ({ ...prev, status: true }))
                  }
                />{" "}
                <label htmlFor="active">Active</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="status"
                  id="inactive"
                  value="false"
                  checked={!contact.status}
                  onChange={() =>
                    setContact((prev) => ({ ...prev, status: false }))
                  }
                />{" "}
                <label htmlFor="inactive">Inactive</label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
