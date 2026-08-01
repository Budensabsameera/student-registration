
import "./App.css";
import { useEffect, useState } from "react";
import API from "./api/axiosConfig";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    API.get("/students").then((response) => {
      setStudents(response.data);
    });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="container" >
      <h1>Student Registration</h1>

      <StudentForm refreshStudents={getStudents} />

      <StudentList students={students} />
    </div>
  );
}

export default App;
