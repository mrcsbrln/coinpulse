import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

// next/link mocken: rendert einfach ein <a> Tag
jest.mock("next/link", () => {
  const MockLink = ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return { __esModule: true, default: MockLink };
});

describe("Footer", () => {
  test("rendert den Imprint-Link mit korrektem href", () => {
    render(<Footer />);

    const imprintLink = screen.getByRole("link", { name: /imprint/i });
    expect(imprintLink).toBeInTheDocument();
    expect(imprintLink).toHaveAttribute("href", "/imprint");
  });

  test("rendert den Privacy Policy-Link mit korrektem href", () => {
    render(<Footer />);

    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy-policy");
  });

  test("rendert genau zwei Links", () => {
    render(<Footer />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });

  test("rendert ein <footer> Element", () => {
    const { container } = render(<Footer />);

    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
