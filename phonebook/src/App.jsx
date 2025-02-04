import { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import Search from "./Components/Search";
import Form from "./Components/Form";
import Notification from "./Components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const result = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (result) {
      if (window.confirm(`${newName} is already added to the phonebook, 
        replace the old number with a new one?`)) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: result.id,
        };

        personService
          .update(result.id, personObject)
          .then((response) => {
            console.log(response);
            const updatedPersons = persons.map((person) => {
              return person.id !== response.id ? person : response;
            });
            setPersons(updatedPersons);
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`${response.name}'s number was successfully changed!`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(`${newName} was already removed from the server`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else if (!newName || !newNumber) {
      setErrorMessage("name or number is missing in your submission");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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
          setSuccessMessage(`${response.name} was successfully added!`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        });
    }
  };

  const removePerson = (person) => {
    if (window.confirm("Do you really want to remove this user?")) {
      personService
        .remove(person.id)
        .then(() => {
          console.log("this user has been removed!");
          const updatedPersons = persons.filter(p => p.id !== person.id);
          console.log("this is the updated person", updatedPersons);
          setPersons(updatedPersons);
          setSuccessMessage(`${person.name}'s number was successfully removed!`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`user was already removed from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
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
