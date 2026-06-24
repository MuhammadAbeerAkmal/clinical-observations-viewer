import { MantineProvider, AppShell, Group, Text } from '@mantine/core';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { PatientsPage } from './pages/PatientsPage';
import { PatientDetailPage } from './pages/PatientDetailPage';

export function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <AppShell header={{ height: 60 }} padding="md">
          <AppShell.Header>
            <Group h="100%" px="md">
              <Text fw={700} size="xl">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Clinical Observations Viewer
                </Link>
              </Text>
            </Group>
          </AppShell.Header>
          <AppShell.Main>
            <Routes>
              <Route path="/" element={<PatientsPage />} />
              <Route path="/patients/:id" element={<PatientDetailPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
