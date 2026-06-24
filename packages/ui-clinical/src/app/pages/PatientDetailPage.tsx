import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Title,
  Group,
  Button,
  Paper,
  Text,
  Badge,
  Loader,
  Center,
  Alert,
  Divider,
} from '@mantine/core';
import type { ObservationDto } from 'lib-dto';
import { getObservations } from '../api/patients';
import { ObservationsChart } from '../components/ObservationsChart';

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [observations, setObservations] = useState<ObservationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getObservations(id)
      .then(setObservations)
      .catch(() => setError('Failed to load observations.'))
      .finally(() => setLoading(false));
  }, [id]);

  const categories = [...new Set(observations.map((o) => o.category))];

  return (
    <Stack gap="md">
      <Group>
        <Button variant="subtle" onClick={() => navigate(-1)} aria-label="Go back">
          ← Back
        </Button>
        <Title order={1}>Patient Observations</Title>
      </Group>

      {categories.length > 0 && (
        <Group gap="xs">
          {categories.map((cat) => (
            <Badge key={cat} variant="light" color="blue">
              {cat}
            </Badge>
          ))}
        </Group>
      )}

      {loading && (
        <Center>
          <Loader aria-label="Loading observations" />
        </Center>
      )}

      {error && (
        <Alert color="red" title="Error" role="alert">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <Paper withBorder p="md">
            <Title order={3} mb="sm">
              Observation Values Over Time
            </Title>
            {observations.length > 0 ? (
              <ObservationsChart observations={observations} />
            ) : (
              <Text c="dimmed">No observations available for this patient.</Text>
            )}
          </Paper>

          <Divider />

          <Title order={2}>Recent Observations</Title>
          <Stack gap="xs">
            {observations.slice(0, 10).map((obs) => (
              <Paper key={obs.id} withBorder p="sm">
                <Group justify="space-between" wrap="nowrap">
                  <Text fw={500}>{obs.code}</Text>
                  <Group gap="xs">
                    <Text>
                      {obs.value} {obs.unit}
                    </Text>
                    <Text c="dimmed" size="sm">
                      {new Date(obs.effectiveDateTime).toLocaleString()}
                    </Text>
                  </Group>
                </Group>
              </Paper>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
}
