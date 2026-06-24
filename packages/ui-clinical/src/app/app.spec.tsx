import { render, screen } from '@testing-library/react';
import App from './app';

describe('App', () => {
  it('renders without crashing', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('shows the app header title', () => {
    render(<App />);
    expect(screen.getByText(/Clinical Observations Viewer/i)).toBeInTheDocument();
  });
});
