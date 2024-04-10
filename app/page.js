import Section from '../components/section';
import PatientLink from '../components/patientLink';
import { getAllPatients } from './api/route';

export default async function Page() {
  const dbPatients = await getAllPatients();
  return (
    <div className='p-4'>
      <Section title='All Patients'>
        {dbPatients.map((patient) => {
          return (
            <>
              <PatientLink key={patient.name} name={patient.name} />
              <br />
            </>
          );
        })}
      </Section>
    </div>
  );
}
