import { useState } from "react";
import API from "../api/axiosConfig";

function StudentForm({ refreshStudents }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const saveStudent = () => {
    const student = {
      name,
      email,
      course,
    };

    API.post("/students", student)
      .then(() => {
        alert("Student Saved Successfully");

        setName("");
        setEmail("");
        setCourse("");

        refreshStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-card">
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button onClick={saveStudent}>Save Student</button>
    </div>
  );
}

export default StudentForm;
