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


    return <div class="flex flex-col m-20">

        <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="overflow-hidden">

                    <h2 class=" pb-8 text-base font-bold container mx-auto px-4 border-solid border-2 flex flex-col 1 items-center ">Contacts</h2>
                    
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead>
                            <tr>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-bold text-black-500 uppercase">First Name</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-bold text-black-500 uppercase">Last Name</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-bold text-black-500 uppercase">Email</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-bold text-black-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800">{contact.firstName}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800">{contact.lastName}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800">{contact.email}</td>
                                    <td>
                                        <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" onClick={() => updateContact(contact)}>Update</button>
                                        <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" onClick={() => onDelete(contact.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </div>

}

export default ContactList