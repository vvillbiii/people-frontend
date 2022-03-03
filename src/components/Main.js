import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import People from "../pages/People";
import Show from "../pages/Show";

const Main = (props) => {
  const [people, setPeople] = useState(null);

  const URL = "https://people-mern-backend.herokuapp.com/people/";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  const updatePeople = async (person, id) => {
    // make put request ot create people
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    getPeople();
  };

  const deletePeople = async (id) => {
    //make delete request to create people
    await fetch(URL + id, {
      method: "delete",
    });
    // update list of people
    getPeople();
  };

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<People people={people} createPeople={createPeople} />}
        />
        <Route
          path="/people/:id"
          element={
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
