function Header() {
  return (
    <>
      <header className="bg-gray-800 p-4">
        <h1 className="text-white text-3xl">My Website</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-white hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="text-white hover:text-gray-400">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="text-white hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
