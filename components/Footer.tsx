import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="inner">
        <nav>
          <Link href="/imprint">Imprint</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
