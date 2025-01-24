'use client';
import { GrView } from 'react-icons/gr';

export default function ListData({ post }) {
  const { id, userId, title, completed } = post;

  const onClickViewAlert = (userId: number): void => {
    alert(userId);
  };

  return (
    <>
      <p>
        <span className='font-bold'>id</span> <span>{id}</span>
      </p>
      <p>
        <span className='font-bold'>title</span> <span>{title}</span>
      </p>
      <p>
        <span className='font-bold'>completed</span> <span>{completed ? 'si' : 'no'}</span>
      </p>

      <button
        className='flex items-center justify-center gap-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        onClick={() => onClickViewAlert(userId)}
      >
        <GrView />
        <span>ver userId</span>
      </button>

      <br />
      <br />
    </>
  );
}
