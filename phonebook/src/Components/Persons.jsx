import Person from "./Person";

const Persons = ({ filteredPersons, removePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person} removePerson={() => removePerson(person)} />
      ))}
    </div>
  );
};

export default Persons;
