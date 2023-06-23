const argv = require("yargs").argv;

const contacts = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getListContacts":
      const allContacts = await contacts.getListContacts();
      return console.table(allContacts);
    
    case "getContactById":
      const oneContact = await contacts.getContactById(id);
      return console.table(oneContact);
    
    case "addContact":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);
    
    case "removeContact":
      const removeContact = await contacts.removeContact(id);
      return console.table(removeContact);
    
    default:
      return console.log("Unknown action");
  }
}

invokeAction(argv);