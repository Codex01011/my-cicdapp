import { render, screen } from '@testing-library/react';
import App from './App';

test('renders class name', () => {
  render(<App />);
  const linkElement = screen.getByText(/TECH2102:Enterprise Computing/i);
  expect(linkElement).toBeInTheDocument();
});
