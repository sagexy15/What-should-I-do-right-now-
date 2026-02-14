import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import MobileNav from './MobileNav';

export default function Layout() {
  return (
    <div className="h-screen overflow-hidden bg-main dark:bg-dm-bg transition-colors duration-300 flex">
      {/* Fixed sidebar — full viewport height, does not scroll */}
      <div className="hidden lg:flex flex-col shrink-0 w-[240px] h-screen fixed left-0 top-0 z-20">
        <Sidebar />
      </div>
      {/* Scrollable main content — only this area moves when scrolling */}
      <main className="flex-1 min-w-0 min-h-0 overflow-y-auto lg:pl-[240px] xl:pr-[260px]">
        <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 max-w-4xl mx-auto">
          <MobileNav />
          <Outlet />
        </div>
      </main>
      {/* Fixed right panel — full viewport height, does not scroll */}
      <div className="hidden xl:block w-[260px] h-screen fixed right-0 top-0 z-20 shrink-0">
        <RightPanel />
      </div>
    </div>
  );
}
