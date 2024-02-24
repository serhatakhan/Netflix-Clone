import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mb-10">
      <Link to={"/"}>
        <img className="max-w-[160px]" src="/netflix-logo.png" alt="netflix" />
      </Link>
    </header>
  );
};

export default Header;
