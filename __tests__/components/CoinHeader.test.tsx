import { render, screen } from "@testing-library/react";
import CoinHeader from "@/components/CoinHeader";

// next/image mocken: rendert einfach ein <img> Tag
jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  );
  MockImage.displayName = "MockImage";
  return { __esModule: true, default: MockImage };
});

// lucide-react Icons mocken: rendern einfache SVGs mit data-testid
jest.mock("lucide-react", () => ({
  TrendingUp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="trending-up" {...props} />
  ),
  TrendingDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="trending-down" {...props} />
  ),
}));

// Positive Props: alles steigt
const positiveProps: CoinHeaderProps = {
  name: "Bitcoin",
  image: "https://example.com/btc.png",
  price: 65432.1,
  priceChangePercentage24h: 5.34,
  priceChangePercentage30d: 12.5,
  priceChange24h: 3200.5,
};

// Negative Props: alles faellt
const negativeProps: CoinHeaderProps = {
  name: "Ethereum",
  image: "https://example.com/eth.png",
  price: 1800.5,
  priceChangePercentage24h: -3.78,
  priceChangePercentage30d: -8.2,
  priceChange24h: -120.3,
};

describe("CoinHeader", () => {
  test("zeigt den Coin-Namen an", () => {
    render(<CoinHeader {...positiveProps} />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  });

  test("zeigt den formatierten Preis an", () => {
    render(<CoinHeader {...positiveProps} />);
    // formatCurrency(65432.10) -> "$65,432.10"
    expect(screen.getByText("$65,432.10")).toBeInTheDocument();
  });

  test("rendert ein Bild mit korrektem src und alt", () => {
    render(<CoinHeader {...positiveProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/btc.png");
    expect(img).toHaveAttribute("alt", "Bitcoin");
  });

  test("zeigt TrendingUp-Icon bei positivem 24h-Trend", () => {
    render(<CoinHeader {...positiveProps} />);
    const trendingUpIcons = screen.getAllByTestId("trending-up");
    expect(trendingUpIcons.length).toBeGreaterThanOrEqual(1);
  });

  test("zeigt TrendingDown-Icon bei negativem 24h-Trend", () => {
    render(<CoinHeader {...negativeProps} />);
    const trendingDownIcons = screen.getAllByTestId("trending-down");
    expect(trendingDownIcons.length).toBeGreaterThanOrEqual(1);
  });

  test("rendert alle 3 Stat-Eintraege", () => {
    render(<CoinHeader {...positiveProps} />);

    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("30 Days")).toBeInTheDocument();
    expect(screen.getByText("Price Change (24h)")).toBeInTheDocument();
  });

  test("zeigt gruene Klasse bei positivem Trend", () => {
    const { container } = render(<CoinHeader {...positiveProps} />);
    const greenValues = container.querySelectorAll(".text-green-500");
    // Alle 3 Stats sind positiv -> 3 gruene Werte
    expect(greenValues).toHaveLength(3);
  });

  test("zeigt rote Klasse bei negativem Trend", () => {
    const { container } = render(<CoinHeader {...negativeProps} />);
    const redValues = container.querySelectorAll(".text-red-500");
    // Alle 3 Stats sind negativ -> 3 rote Werte
    expect(redValues).toHaveLength(3);
  });
});
