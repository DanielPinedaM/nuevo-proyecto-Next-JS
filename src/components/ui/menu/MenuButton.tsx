'use client';
import { CiMenuBurger } from 'react-icons/ci';
import { useMenuStore } from '@/store/menuStore';
import { FaArrowLeft } from 'react-icons/fa';
import dynamic from 'next/dynamic';
const PrimeReactTooltip = dynamic(() => import('@/components/PrimeReactTooltip'));

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
