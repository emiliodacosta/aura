import { ImSpinner5 } from 'react-icons/im';

export default function FullPageLoader() {
    return (
        <div className='flex flex-col justify-center items-center content-center min-h-screen'>
            <ImSpinner5 className='mb-4 text-6xl animate-spin' />
            <p>Loading...</p>
        </div>
    );
}