"use client";

import CandlestickChart from "./CandlestickChart";
import CoinHeader from "./CoinHeader";
import DataTable from "./DataTable";
import { Separator } from "./ui/separator";

const CoinDetailsDataWrapper = ({
  children,
  coinId,
  coin,
  coinOHLCData,
}: CoinDetailsDataProps) => {
  return (
    <section id="coin-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        price={coin.market_data.current_price.usd}
        priceChangePercentage24h={
          coin.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={
          coin.market_data.price_change_percentage_30d_in_currency.usd
        }
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />
      <Separator className="divider" />
      <div className="trend">
        <CandlestickChart coinId={coinId} data={coinOHLCData} />
      </div>
    </section>
  );
};

export default CoinDetailsDataWrapper;
