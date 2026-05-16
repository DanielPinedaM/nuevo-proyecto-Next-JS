'use client';
import { CiMenuBurger } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { useMenuStore } from '@/shared/ui/menu/store/menu.store';
const PrimeReactTooltip = dynamic(() => import('@/shared/components/PrimeReactTooltip'));

export default function MenuButton() {
  const { handleMenu, showMenu } = useMenuStore();

  return (
    <>
      <PrimeReactTooltip
        target={'tooltip-menu'}
        content={showMenu ? 'Ocultar' : 'Mostrar'}
        position='right'
      />

      <button className='tooltip-menu cursor-pointer' onClick={handleMenu}>
        {showMenu ? <FaArrowLeft className='text-xl' /> : <CiMenuBurger className='text-xl' />}
      </button>
    </>
  );
}
