import { useState, useEffect } from "react";
import axios from "axios";
import personsServices from "./services/persons";
import "./css/style.css";
import Notification from "./components/Notification";

/*Display Component */
const Display = ({ persons, deleteUser }) => {
  return persons.map((item) => (
    <div style={{ display: "flex", gap: "4px" }} key={item.id}>
      <div style={{ width: "150px" }}>{item.name}</div>
      <div style={{ width: "100px" }}>{item.number}</div>
      <button onClick={() => deleteUser(item.id, item.name)}>Delete</button>
    </div>
  ));
};



const PersonForm = ({ newName, number, handleNameOnchange, handleNaumberOnchange, addName }) => {
  return (
    <form onSubmit={addName}>
      <div className="form-container">
        <div>
          <label className="label">Name: </label>
          <input onChange={(e) => handleNameOnchange(e)} value={newName} placeholder="Enter your name" />
        </div>
        <div>
          <label className="label">Number: </label>
          <input onChange={(e) => handleNaumberOnchange(e)} value={number} placeholder="Enter your name" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </div>
    </form>
  );
};

const Filter = ({ handleSearchChange, search }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={(e) => handleSearchChange(e)} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [temp, setTemp] = useState([]);
  const [message, setMessage] = useState("");
  const [css, setCss] = useState("");

  const [typeAction, setTypeAction] = useState("");

  /* Add New Name function*/
  const addName = (event) => {
    event.preventDefault();
    let messagetemp = '';
    if (!newName || !number) {
      alert("Please enter name and number");
      return;
    }
    const isExistedUser = persons.find((item) => item.name === newName);
    if (isExistedUser) {
      let idUserExisted = isExistedUser.id;
      let isConfirmAppendUser = window.confirm(`${newName} is already added to phonebook, replace old phone with a new one?`);
      if (isConfirmAppendUser) personsServices.editPerson(idUserExisted, number);
      messagetemp = `Updated ${newName}'s number`;
    } else {
      const temp = { name: newName, number: number, id: Math.floor(Math.random() * 10).toString() };
      personsServices.addNewPerson(temp);
      messagetemp = `Added ${newName}`;
    }
    console.log('add ok final')
    personsServices.getAllData().then((response) => {
      setPersons(response.data);
    });
    setMessage(messagetemp);
    setCss("message addAction");
    setNewName("");
    setNumber("");
  };

  /* delete User function */
  const deleteUser = (id, name) => {
    let messagetemp = '';
    if (id) {
      let confirm = window.confirm(`Do you want to delete ${name} ?`);
      if (confirm) {
        personsServices.deletePerson(id)
          .then(() => {
            setPersons(persons.filter((item) => item.id !== id));
            messagetemp = `Information of ${name} is removed from the server`;
            setMessage(messagetemp);
            setCss("message deleteAction");
          })
          .catch((error) => {
            console.log("error", error);
            messagetemp = `Information of ${name} has already been removed from the server`;
            setMessage(messagetemp);
            setCss("message deleteAction");
          })

      }
    }
  };

  const handleNameOnchange = (e) => {
    return setNewName(e.target.value);
  };
  const handleNaumberOnchange = (e) => {
    return setNumber(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // const temp = persons.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    const temp = persons.filter((item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    console.log("temp", temp);
    setTemp(temp);
  };

  useEffect(() => {
    console.log("useEffect when start");
    personsServices.getAllData().then((response) => {
      setPersons(response.data);
    });
  }, [message]);

  console.log("persons", persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} css={css} />
      <Filter handleSearchChange={handleSearchChange} search={search} />
      <PersonForm addName={addName} handleNameOnchange={handleNameOnchange} handleNaumberOnchange={handleNaumberOnchange} newName={newName} number={number} />
      <h2>Numbers</h2>
      {!search.length ? <Display persons={persons} deleteUser={deleteUser} /> : <Display persons={temp} deleteUser={deleteUser} />}
    </div>
  );
};

export default App;
