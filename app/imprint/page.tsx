import Link from "next/link";

const page = () => {
  return (
    <main className="legal-page">
      <div className="content">
        <h1 className="text-xl font-bold">Imprint</h1>
        <p>Marcus Hartmann</p>
        <p>Liegnitzer Str. 16</p>
        <p>10999 Berlin</p>
        <Link href="mailto:info@marcus-hartmann.net">
          info@marcus-hartmann.net
        </Link>
        <p>
          <strong>Disclaimer:</strong> This website is a non-commercial
          portfolio project for demonstration purposes only. No real
          transactions are processed, and no contracts are concluded.
        </p>
      </div>
    </main>
  );
};

export default page;
