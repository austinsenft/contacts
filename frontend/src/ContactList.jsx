import React from "react"

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }


    return <div class=" container flex flex-col items-center m-20 ">
        
        <div >
            <h2 class=" pb-8 text-base font-bold container mx-auto px-4 border-solid border-2 border-sky-500 flex flex-col 1 items-center ">Contacts</h2>
            <table class="table-auto ">
                <thead class="border-solid border-2 border-sky-500" >
                    <tr class="">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="">
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick={() => updateContact(contact)}>Update</button>
                                <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick={() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>

}

export default ContactList