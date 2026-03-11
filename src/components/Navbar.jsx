import { Link, NavLink } from 'react-router-dom';

const navClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm transition ${isActive ? 'bg-accent/20 text-accent' : 'text-muted hover:text-white'}`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-accent/20 bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-xl font-bold text-accent">VibeFix</Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/pricing" className={navClass}>Pricing</NavLink>
          <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
          <NavLink to="/auth" className={navClass}>Login</NavLink>
        </nav>
      </div>
    </header>
  );
}
