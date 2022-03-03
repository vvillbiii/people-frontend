import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const Show = (props) => {
  //   console.log(props);
  const params = useParams();
  const id = params.id;
  const people = props.people;
  const person = people.find((p) => p._id === id);
  //use navigate to go back
  let navigate = useNavigate();

  //state for form
  const [editForm, setEditForm] = useState(person);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  // handlesubmit for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatePeople(editForm, person._id);
    // redirect people back to index
    navigate("/");
  };

  const removePerson = () => {
    props.deletePeople(person._id);
    navigate("/");
  };
  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} style={{ width: "30%" }} />
      <button id="delete" onClick={removePerson}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
      <br />
      <button
        id="previous"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default Show;
