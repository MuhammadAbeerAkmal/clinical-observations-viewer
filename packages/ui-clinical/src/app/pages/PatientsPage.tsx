import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Title,
  Group,
  TextInput,
  Button,
  Table,
  Text,
  Alert,
  Loader,
  Center,
} from '@mantine/core';
import type { PatientDto } from 'lib-dto';
import { searchPatients } from '../api/patients';

export function PatientsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState<PatientDto[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    setLoading(true);
    setError(null);
    try {
      const results = await searchPatients(query.trim() || undefined);
      setPatients(results);
    } catch {
      setError('Failed to fetch patients. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack gap="lg">
      <Title order={1}>Patient Search</Title>

      <Group align="flex-end">
        <TextInput
          label="Search by name"
          placeholder="e.g. Smith"
          aria-label="Search patients by name"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1 }}
        />
        <Button onClick={handleSearch} loading={loading}>
          Search
        </Button>
      </Group>

      {error && (
        <Alert color="red" title="Error" role="alert">
          {error}
        </Alert>
      )}

      {loading && (
        <Center>
          <Loader aria-label="Loading patients" />
        </Center>
      )}

      {!loading && patients !== null && patients.length === 0 && (
        <Text c="dimmed">No patients found{query ? ` for "${query}"` : ''}.</Text>
      )}

      {!loading && patients && patients.length > 0 && (
        <Table highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Gender</Table.Th>
              <Table.Th>Date of Birth</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {patients.map((p) => (
              <Table.Tr
                key={p.id}
                onClick={() => navigate(`/patients/${p.id}`)}
                style={{ cursor: 'pointer' }}
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') && navigate(`/patients/${p.id}`)
                }
                role="button"
                aria-label={`View observations for ${p.name}`}
              >
                <Table.Td>{p.name}</Table.Td>
                <Table.Td>{p.gender}</Table.Td>
                <Table.Td>{p.birthDate}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Stack>
  );
}
