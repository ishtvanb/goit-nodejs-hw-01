const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contactId = String(id);
  const contacts = await getListContacts();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

const addContact = async (data) => {
  const contacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    ...data, 
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const removeContact = async (id) => {
  const contactId = String(id);
  const contacts = await getListContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
}