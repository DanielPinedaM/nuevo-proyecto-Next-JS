'use client';
import MenuButton from '@/components/ui/menu/MenuButton';

export default function Header() {
  return (
    <header className='flex-none'>
      <ul>
        <li className='xl:static fixed top-1 right-1'>
          <MenuButton />
        </li>
      </ul>
    </header>
  );
}
