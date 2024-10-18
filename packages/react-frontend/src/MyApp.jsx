// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";




function MyApp() {
    const [characters, setCharacters] = useState([]);

    function deleteUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    function removeOneCharacter(index) {
      console.log(characters[index]);
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        deleteUser(characters[index])
        .then(setCharacters(updated));
        
      }
      
      function updateList(person) { 
        postUser(person).then((res) => res.json())
          .then((json) => setCharacters([...characters, json]))
          .catch((error) => {
            console.log(error);
          })
        }

      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json))
        .catch((error) => { console.log(error); });
    }, [] );

  return (
  <div className="container">
    <Table characterData={characters} 
    removeCharacter={removeOneCharacter}/>
    <Form handleSubmit={updateList} />
</div>
  );
  
}


export default MyApp;