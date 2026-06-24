import { render, screen, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PatientDetailPage } from './PatientDetailPage';
import * as api from '../api/patients';

jest.mock('../api/patients');
jest.mock('../components/ObservationsChart', () => ({
  ObservationsChart: ({ observations }: { observations: unknown[] }) => (
    <div data-testid="chart" aria-label={`chart with ${observations.length} observations`} />
  ),
}));

const mockGetObs = api.getObservations as jest.MockedFunction<typeof api.getObservations>;

function renderPage(patientId = 'p1') {
  return render(
    <MemoryRouter initialEntries={[`/patients/${patientId}`]}>
      <MantineProvider>
        <Routes>
          <Route path="/patients/:id" element={<PatientDetailPage />} />
        </Routes>
      </MantineProvider>
    </MemoryRouter>,
  );
}

describe('PatientDetailPage', () => {
  afterEach(() => jest.clearAllMocks());

  it('shows a loader while fetching', () => {
    mockGetObs.mockReturnValue(
      new Promise(() => {
        /* never resolves - keeps loading state active */
      }),
    );
    renderPage();
    expect(screen.getByLabelText(/loading observations/i)).toBeInTheDocument();
  });

  it('renders observations after a successful fetch', async () => {
    mockGetObs.mockResolvedValue([
      {
        id: 'o1',
        code: 'Heart rate',
        value: 72,
        unit: 'beats/min',
        effectiveDateTime: '2024-01-15T10:00:00Z',
        category: 'vital-signs',
      },
    ]);
    renderPage();
    await waitFor(() => expect(screen.getByText('Heart rate')).toBeInTheDocument());
    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });

  it('shows an error alert when the API fails', async () => {
    mockGetObs.mockRejectedValue(new Error('network error'));
    renderPage();
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  });
});
