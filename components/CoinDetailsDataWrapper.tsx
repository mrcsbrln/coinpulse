"use client";

import CandlestickChart from "./CandlestickChart";
import DataTable from "./DataTable";
import { Separator } from "./ui/separator";

const CoinDetailsDataWrapper = ({
  children,
  coinId,
  coin,
  coinOHLCData,
}: CoinDetailsDataProps) => {
  const tradeColumns; //ToDo

  return (
    <section id="coin-data-wrapper">
      <p>Coin Header</p>
      <Separator className="divider" />
      <div className="trend">
        <CandlestickChart coinId={coinId} data={coinOHLCData} />
        <h4>Trend Overview</h4>
        <Separator className="divider" />
        {tradeColumns && (
          <div className="trades">
            <h4>Past 24 Hour Trades</h4>
            <DataTable
              columns={tradeColumns}
              data={trades}
              rowKey={(_, index) => index}
              tableClassName="trades-table"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CoinDetailsDataWrapper;
