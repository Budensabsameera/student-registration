function StudentList({ students }) {
  return (
    <div className="student-card" >
      <h2>Students</h2>

      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>

          <p>{student.email}</p>

          <p>{student.course}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default StudentList;
