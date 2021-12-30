import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "reactstrap";
import Checkbox from "./components/Checkbox";
import Schedule from "./components/Schedule";
import { getName, getHigherHierarchy } from "./utils";
import "./App.css";

function App() {

  const [ subjects, setSubjects ] = useState([ {id: 1, name:"Potions Master", standby_teacher_id:3},
          {id: 1, name:"Defense Against the Dark Arts", standby_teacher_id:4}]);
  
  const [ students, setStudents ] = useState([
    {id: 1, name:"Harry Potter"},
    {id: 2, name:"Hermione Granger"},
    {id: 3, name:"Ron Weasley"},
    {id: 4, name:"Draco Malfoy"},
    {id: 5, name:"Padma Patil"},
    {id: 6, name:"Luna Lovegood"}
  ]);
  
  const [ teachers, setTeachers ] = useState([
    {id: 1, name: "Professor Dumbledore", position:"Headmaster" },
    {id: 2, name: "Minerva McGonagall", position:"Headmistress" },
    {id: 3, name: "Rubeus Hagrid", position:"Standby Professor" },
    {id: 4, name: "Alastor Moody", position:"Standby Professor" },
    {id: 5, name: "Horace Slughorn", position:"Teacher" },
    {id: 6, name: "Severus Snape", position:"Teacher" },
    {id: 7, name: "Remus Lupin", position:"Teacher" },
    {id: 8, name: "Gilderoy Lockhart", position:"Teacher" },
  ]);

const [ teacherAssign, setTeacherAssign ] = useState([
{teacher_id: 5, subject_id: 1},
{teacher_id: 6, subject_id: 1},
{teacher_id: 7, subject_id: 2},
{teacher_id: 8, subject_id: 2}
]);

const [ attendance, setAttendance ] = useState({});

const [ studentAssign, setStudentAssign ] = useState([
{teacher_id: 5, student_id:1, subject_id: 1},
{teacher_id: null, student_id:2, subject_id: 1},
{teacher_id: 6, student_id:3, subject_id: 1},
{teacher_id: 5, student_id:4, subject_id: 1},
{teacher_id: null, student_id:5, subject_id: 1},
{teacher_id: 6, student_id:6, subject_id: 1}
]);

const displayAttendance = (teacherId) => {
   return attendance[teacherId] ? "Presence" : "Absence";
}

const handleChange = (teacherId, presence) => {
  const updatedAttendance = {
    ...attendance
  };
  updatedAttendance[teacherId] = presence;
  setAttendance(updatedAttendance);
  console.log("updatedAttendance", updatedAttendance);
}

const getStudentName = (student_id) => {
  return getName(students, student_id);
}
const getsubjectName = (subject_id)=> {
  return getName(subjects, subject_id);
}
const getTeacherSchedule = (teacher_id, subject_id) => {
  return (attendance[teacher_id]) ?  getName(teachers, teacher_id) : getHigherHierarchy(attendance, teachers, subjects, subject_id);
}


  return (
    <>
      <Container>
          <Row>
            <Col className="schedule-text">
              <h2>Schedule Today</h2> 
            </Col>
          </Row>

          <Row>
            <Col xs="6">
                <Row>
                  <Col xs="6" style={{textAlign: 'left'}}>
                  
                      <h3>Teacher</h3> 
                      <ul style={{paddingTop:'30px'}}>
                      {teachers.map(teacher => {
                        return(
                          <li key={teacher.id}>
                             <Checkbox description={teacher.name} commitChecked={handleChange} teacherId={teacher.id} />
                          </li>
                        )
                      })}
                    </ul>
                  </Col>

                  <Col xs="6">
                  <h3>Attendance</h3>
                    
                  <ul style={{paddingTop:'30px'}}>
                      {teachers.map(teacher => {
                        return(
                          <li key={teacher.id}>
                            {displayAttendance(teacher.id)}
                          </li>
                        )
                      })}
                    </ul>
                  </Col>
                </Row>
              
            </Col>
            
            <Col xs="6">
                <h3>Current Schedule</h3> 
                
                <Schedule studentAssign={studentAssign}
                 getStudentName={getStudentName} getsubjectName={getsubjectName}
                 getTeacherSchedule={getTeacherSchedule}/>
            </Col>
          </Row>
        </Container>
    </>
  )
}



export default App