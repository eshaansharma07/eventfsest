import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const PageLayout = ({ children }) => (
  <div className="min-h-screen overflow-hidden bg-mesh-soft text-slate-900">
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-lilac/20 blur-3xl" />
      <div className="absolute right-[8%] top-[22%] h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute bottom-[10%] left-[45%] h-72 w-72 rounded-full bg-pink/20 blur-3xl" />
    </div>
    <Navbar />
    {children}
    <Footer />
  </div>
);
