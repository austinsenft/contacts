import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import './App.css';
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact ({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return 
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return ( 
    <div class="container mx-auto px-4 border-solid border-2 border-sky-500 flex flex-col 1 items-center">
    
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
    <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick={openCreateModal}>Create New Contact</button>
    { isModalOpen && <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
      </div>
      </div>
      }
      
    
    </div>
  )
}

export default App
