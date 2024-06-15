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
    <div class="container mx-auto px-4 border-double border-4 border-black-500  flex flex-col 1 items-center">
    
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
    <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" onClick={openCreateModal}>Create New Contact</button>
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
