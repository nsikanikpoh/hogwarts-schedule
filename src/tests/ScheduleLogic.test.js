import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getName, getHigherHierarchy } from "../utils";

import '@testing-library/jest-dom/extend-expect'


describe('Schedule Logic Test', () => {
    
    describe('Schedule logics works', () => {

        const subjects = [ {id: 1, name:"Potions Master", standby_teacher_id:3},
          {id: 1, name:"Defense Against the Dark Arts", standby_teacher_id:4}];
  
        const students = [
            {id: 1, name:"Harry Potter"},
            {id: 2, name:"Hermione Granger"},
            {id: 3, name:"Ron Weasley"},
            {id: 4, name:"Draco Malfoy"},
            {id: 5, name:"Padma Patil"},
            {id: 6, name:"Luna Lovegood"}
        ];
        
        const teachers =[
            {id: 1, name: "Professor Dumbledore", position:"Headmaster" },
            {id: 2, name: "Minerva McGonagall", position:"Headmistress" },
            {id: 3, name: "Rubeus Hagrid", position:"Standby Professor" },
            {id: 4, name: "Alastor Moody", position:"Standby Professor" },
            {id: 5, name: "Horace Slughorn", position:"Teacher" },
            {id: 6, name: "Severus Snape", position:"Teacher" },
            {id: 7, name: "Remus Lupin", position:"Teacher" },
            {id: 8, name: "Gilderoy Lockhart", position:"Teacher" },
        ];

        let attendance = {
            1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true
        };
        const getTeacherSchedule = (teacher_id, subject_id) => {
            return (attendance[teacher_id]) ?  getName(teachers, teacher_id) : getHigherHierarchy(attendance, teachers, subjects, subject_id);
          }

        const expectedSchedule = ["Horace Slughorn", "Rubeus Hagrid", "Severus Snape", "Horace Slughorn", "Rubeus Hagrid", "Severus Snape"];

        const studentAssign =[
        {teacher_id: 5, student_id:1, subject_id: 1},
        {teacher_id: null, student_id:2, subject_id: 1},
        {teacher_id: 6, student_id:3, subject_id: 1},
        {teacher_id: 5, student_id:4, subject_id: 1},
        {teacher_id: null, student_id:5, subject_id: 1},
        {teacher_id: 6, student_id:6, subject_id: 1}
        ];
        it('it returns the right set of schedules with attendance marked presence on given assignment', () => {            
            studentAssign.forEach((stud, index)=> {
                expect(getTeacherSchedule(stud.teacher_id, stud.subject_id)).toEqual(expectedSchedule[index]);
             })
        });

        it('it returns Not Assigned when Headmaster, headmistress and standby professor is absesnce and teacher_id is null', () => {    
            attendance = {
                1: false, 2: false, 3: false, 4: true, 6: true, 7: true, 8: true
            };
            expect(getTeacherSchedule(5, 1)).toEqual("Not Assigned");
        });

        it('it returns Not Assigned when Headmaster, headmistress and standby professor is absesnce and teacher_id is absence', () => {    
            attendance = {
                1: false, 2: false, 3: false, 4: true, 5: false, 6: true, 7: true, 8: true
            };
            expect(getTeacherSchedule(5, 1)).toEqual("Not Assigned");
        });

        it('it returns course standby professor is presence with not assigned teacher', () => {    
            attendance = {
                1: true, 2: true, 3: true, 4: true, 6: true, 7: true, 8: true
            };
            expect(getTeacherSchedule(5, 1)).toEqual("Rubeus Hagrid");
        });

        it('it returns Headmistress when course standby professor is absence with not assigned teacher', () => {    
            attendance = {
                1: true, 2: true, 3: false, 4: true, 6: true, 7: true, 8: true
            };
            expect(getTeacherSchedule(5, 1)).toEqual("Minerva McGonagall");
        });

        it('it returns headmaster when Headmistress and course standby professor is absence with not assigned teacher', () => {    
            attendance = {
                1: true, 2: false, 3: false, 4: true, 5: false, 6: true, 7: true, 8: true
            };
            expect(getTeacherSchedule(5, 1)).toEqual("Professor Dumbledore");
        });

        it('it returns right teacher when assigned and teacher is presence', () => {    
            attendance = {
                1: true, 2: false, 3: false, 4: true, 5: true, 6: true, 7: true, 8: true
            };
            expect(getTeacherSchedule(6, 1)).toEqual("Severus Snape");
        });

        it('it returns the right name given arrays of teachers', () => {            
            expect(getName(teachers, 1)).toEqual("Professor Dumbledore"); 
        });

        it('it returns the right name given arrays of students', () => {            
            expect(getName(students, 1)).toEqual("Harry Potter"); 
        });

        it('it returns the right subject name given arrays of subjects', () => {            
            expect(getName(subjects, 1)).toEqual("Potions Master"); 
        });
    });

});