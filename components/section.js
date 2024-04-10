'use client'
import { useRouter } from 'next/navigation';

export default function Section({
  children,
  title,
  selectedPeriod,
  setSelectedPeriod,
}) {
  const MeasurementPeriodDropdown = () => (
    <label className='align-middle'>
      Period:
      <select
        className='bg-darkGray outline outline-white ml-1 align-middle'
        name='selectedPeriod'
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
      >
        <option value={1}>Last month</option>
        <option value={3}>Last 3 months</option>
        <option value={6}>Last 6 months</option>
      </select>
    </label>
  );

  const router = useRouter();
  const handleClick = () => {
    router.push(`/`)
  }

  const SectionTitle = () => (
    <>
      <h2 className='text-lg font-semibold mb-2 color-white'>{title}</h2>
      {title === 'Patient Basic Information' && (
          <button className='mb-2' onClick={handleClick}>
            Return to All Patients
          </button>
      )}
      {title === 'Temperature Readings (°C)' && (
        <div className='text-xs mt-1.5 mr-0.5'>
          <MeasurementPeriodDropdown />
        </div>
      )}
    </>
  );

  return (
    <div className='bg-darkGray p-2'>
      {title === 'Patient Basic Information' || title === 'Temperature Readings (°C)' ? (
        <span className='flex justify-between'>
          <SectionTitle title={title} />
        </span>
      ) : (
        <SectionTitle title={title} />
      )}
      {children}
    </div>
  );
}
