import { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import Search from "./Components/Search";
import Form from "./Components/Form";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (
      persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ).length > 0
    ) {
      alert(`${newName} already exists`);
    } else if (!newName || !newNumber) {
      alert("name or number is missing");
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      };

      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const removePerson = (id) => {
    if (window.confirm("Do you really want to remove this user?")) {
      personService
        .remove(id)
        .then((response) => {
          console.log("this user has been removed!");
          const updatedPersons = persons.filter(person => person.id !== response.id);
          setPersons(updatedPersons);
        });
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // filter based on search result
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearch={handleSearch} />
      <h3>Add a new person</h3>
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
