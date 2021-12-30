import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const pageName = screen.getByText(/Schedule Today/i);
  expect(pageName).toBeInTheDocument();
  const scheduleSection = screen.getByText(/Current Schedule/i);
  expect(scheduleSection).toBeInTheDocument();
  const attendance = screen.getByText(/Attendance/i);
  expect(attendance).toBeInTheDocument();
});
