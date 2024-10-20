import { useDispatch, useSelector } from "react-redux";
import { selectContacts, deleteContact } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  // Фільтрування контактів з перевіркою на тип рядка для name
  const filteredContacts = contacts.filter((contact) => {
    if (typeof contact.name === "string") {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    }
    return false; // Якщо `name` не є рядком, пропускаємо контакт
  });

  // Функція для видалення контакту
  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={styles.contactList}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          number={contact.number}
          onDelete={() => handleDelete(contact.id)} 
        />
      ))}
    </ul>
  );
};

export default ContactList;
