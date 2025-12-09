export default function Navbar() {
  return (
    <nav className="hidden md:flex items-center gap-8 text-sm">
      <a
        href="#"
        className="text-gray-300 text-base hover:text-white transition-colors"
      >
        Home
      </a>
      <a
        href="#"
        className="text-gray-300 text-base hover:text-white transition-colors"
      >
        Customers
      </a>
      <a
        href="#"
        className="text-gray-300 text-base hover:text-white transition-colors"
      >
        Security
      </a>

      <a
        href="#"
        className="text-gray-300 text-base hover:text-white transition-colors"
      >
        Testimonials
      </a>
      <a
        href="#"
        className="text-gray-300 text-base hover:text-white transition-colors"
      >
        Jobs
      </a>
      <a
        href="#"
        className="text-gray-300 text-base hover:text-white transition-colors"
      >
        Insights
      </a>
    </nav>
  );
}
