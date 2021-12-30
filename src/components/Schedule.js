import React from "react";
import PropTypes from 'prop-types'

function Schedule({studentAssign, getStudentName, getsubjectName, getTeacherSchedule}) {


  return (
    <div className="table-responsive" data-testid="schedule-table">
                    <table className="table" >
                    <thead>
                        <tr>
                          <th scope="col">Student</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Teacher</th>
                        </tr>
                      </thead>
                      <tbody>
                      {studentAssign.map((stud, index)=> {
                        console.log(getTeacherSchedule(stud.teacher_id, stud.subject_id));
                        return(
                          <tr key={index}>
                              <td scope="row">{getStudentName(stud.student_id)}</td>
                              <td>{getsubjectName(stud.subject_id)}</td>
                              <td>{getTeacherSchedule(stud.teacher_id, stud.subject_id)}</td>
                        </tr>
                        );
                      })}
                        
                      </tbody>
                    </table>
                  </div>
  );
}

Schedule.propTypes = { 
    studentAssign: PropTypes.array.isRequired,
    getStudentName: PropTypes.func.isRequired,
    getsubjectName: PropTypes.func.isRequired,
    getTeacherSchedule: PropTypes.func.isRequired
};
export default Schedule;


