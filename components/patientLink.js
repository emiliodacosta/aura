'use client';
import { useRouter } from 'next/navigation';

export default function PatientLink({ name }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/patient?name=${name}`)
  }

  return (
    <button className='mb-1' onClick={handleClick}>
      {name}
    </button>
  );
}
