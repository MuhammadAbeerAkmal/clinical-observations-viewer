import { ObservationDto, PatientDto } from 'lib-dto';

type FhirName = { family?: string; given?: string[] };
type FhirQuantity = { value: number; unit?: string; code?: string };
type FhirCoding = { display?: string };
type FhirResource = Record<string, unknown>;
type FhirBundle = { entry?: { resource: FhirResource }[] };

export function mapBundleToPatients(bundle: FhirBundle): PatientDto[] {
  return (bundle.entry ?? []).map(({ resource }) => mapPatient(resource));
}

export function mapBundleToObservations(bundle: FhirBundle): ObservationDto[] {
  return (bundle.entry ?? [])
    .map(({ resource }) => mapObservation(resource))
    .filter((o): o is ObservationDto => o !== null);
}

function mapPatient(r: FhirResource): PatientDto {
  return {
    id: r['id'] as string,
    name: buildName(r['name'] as FhirName[] | undefined),
    gender: (r['gender'] as string) ?? 'unknown',
    birthDate: (r['birthDate'] as string) ?? '',
  };
}

function mapObservation(r: FhirResource): ObservationDto | null {
  const vq = r['valueQuantity'] as FhirQuantity | undefined;
  if (!vq) return null;
  const codeBlock = r['code'] as { text?: string; coding?: FhirCoding[] } | undefined;
  return {
    id: r['id'] as string,
    code: codeBlock?.text ?? codeBlock?.coding?.[0]?.display ?? 'Unknown',
    value: vq.value,
    unit: vq.unit ?? vq.code ?? '',
    effectiveDateTime: (r['effectiveDateTime'] as string) ?? '',
    category: 'vital-signs',
  };
}

function buildName(names?: FhirName[]): string {
  if (!names?.length) return 'Unknown';
  const n = names[0];
  const given = n.given?.join(' ') ?? '';
  return [given, n.family].filter(Boolean).join(' ') || 'Unknown';
}
