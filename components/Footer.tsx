import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="main-container inner">
        <Link href="/imprint">Imprint</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
