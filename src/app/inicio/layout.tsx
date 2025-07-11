import Header from '@/components/ui/Header';
import MenuResponsive from '@/components/ui/menu/MenuResponsive';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-dvh'>
      <MenuResponsive />

      <div className='flex flex-col flex-1 min-w-0'>
        <Header />

        <main className='min-w-0 w-full flex-1 overflow-auto'>
          <div className='p-4 min-w-max'>{children}</div>
        </main>
      </div>
    </div>
  );
}
