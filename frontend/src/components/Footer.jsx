import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 md:flex md:items-center md:justify-between">
        <div className="mb-2 md:mb-0">
          <Link to="/" className="text-lg font-semibold text-gray-900 dark:text-white">
            TravelAssistant
          </Link>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Plan smarter trips & save favorite places</p>
        </div>

        <nav className="flex flex-row items-center gap-2">
          <Link to="/" className="text-sm hover:underline">Home</Link>
          <Link to="/profile" className="text-sm hover:underline">Profile</Link>
        </nav>
      </div>
    </footer>
  );
}
