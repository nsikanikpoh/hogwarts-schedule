import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../components/Checkbox';
import '@testing-library/jest-dom/extend-expect'


describe('Checkbox', () => {

    describe('change', () => {
        it('it should render a functional checkbox component', () => {
            const fn = jest.fn();
            const { getByTestId, queryByTestId, getByText } = render(
                <Checkbox description="Peter Piper" commitChecked={fn} teacherId={1} />
            );
            
            const checkbox = getByTestId("custom-checkbox");
            expect(checkbox.checked).toEqual(false);
            fireEvent.click(checkbox)
            expect(checkbox.checked).toEqual(true)
            expect(queryByTestId('custom-checkbox-label')).toBeInTheDocument()
            expect(getByText('Peter Piper')).toBeDefined();
        });
    });

});