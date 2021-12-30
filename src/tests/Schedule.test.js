import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Schedule from '../components/Schedule';
import '@testing-library/jest-dom/extend-expect'


describe('Schedule', () => {
    
    describe('change', () => {
        it('it should render a functional Schedule component', () => {
            const fn = jest.fn();
            
            const { queryByTestId, getByText } = render(
                <Schedule studentAssign={[]} attendance={{}} teachers={[]} subjects={[]} getStudentName={fn} getsubjectName={fn} getTeacherSchedule={fn}/>
            );
            expect(queryByTestId('schedule-table')).toBeInTheDocument()
            expect(getByText('Student')).toBeDefined();
            expect(getByText('Subject')).toBeDefined();
            expect(getByText('Teacher')).toBeDefined();
            

        });
    });

});