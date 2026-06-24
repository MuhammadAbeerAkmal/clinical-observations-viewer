import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import { PatientsPage } from './PatientsPage';
import * as api from '../api/patients';

jest.mock('../api/patients');
const mockSearch = api.searchPatients as jest.MockedFunction<typeof api.searchPatients>;

function renderPage() {
  return render(
    <MemoryRouter>
      <MantineProvider>
        <PatientsPage />
      </MantineProvider>
    </MemoryRouter>,
  );
}

describe('PatientsPage', () => {
  afterEach(() => jest.clearAllMocks());

  it('renders the search input and button', () => {
    renderPage();
    expect(screen.getByRole('textbox', { name: /search patients by name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays patients returned by the API', async () => {
    mockSearch.mockResolvedValue([
      { id: 'p1', name: 'Jane Smith', gender: 'female', birthDate: '1980-06-15' },
    ]);
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => expect(screen.getByText('Jane Smith')).toBeInTheDocument());
  });

  it('shows an error alert when the API fails', async () => {
    mockSearch.mockRejectedValue(new Error('network error'));
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  });

  it('shows empty state when no patients are found', async () => {
    mockSearch.mockResolvedValue([]);
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => expect(screen.getByText(/no patients found/i)).toBeInTheDocument());
  });
});
