export const getName = (objects, val) => {
    const object = objects.find(obj => obj.id === val);
    return object?.name;
  }
  
export const getHigherHierarchy = (attendance, teachers, subjects, subject_id) => {
    const subject = subjects.find(s=>s.id === subject_id);
    const standby_teacher = teachers.find(t=>t.id === subject.standby_teacher_id);
    const headmistress = teachers.find(t=>t.position === "Headmistress" );
    const headmaster = teachers.find(t=>t.position === "Headmaster");
    if(attendance[standby_teacher.id])
    {
        return standby_teacher.name;
    }
    else if(attendance[headmistress.id])
    {
        return headmistress.name;
    }
    else if(attendance[headmaster.id])
    {
        return headmaster.name;
    }

    return "Not Assigned";
}

