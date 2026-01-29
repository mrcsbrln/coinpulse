import { fetcher } from "@/lib/coingecko.actions";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DataTable from "../DataTable";
import { cn, formatCurrency } from "@/lib/utils";

const TrendingCoins = async () => {
  let trendingCoins;
  let columns: DataTableColumn<TrendingCoin>[];

  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
      "search/trending",
      undefined,
      300,
    );

    columns = [
      {
        header: "Name",
        cellClassName: "name-cell",
        cell: (coin) => {
          const item = coin.item;
          return (
            <Link href={`/coins/${item.id}`}>
              <Image src={item.large} alt={item.name} width={36} height={36} />
              <p>{item.name}</p>
            </Link>
          );
        },
      },
      {
        header: "24h Change",
        cellClassName: "name-cell",
        cell: (coin) => {
          const item = coin.item;
          const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

          return (
            <div
              className={cn(
                "price-change",
                isTrendingUp ? "text-green-500" : "text-red-500",
              )}
            >
              <p>
                {isTrendingUp ? (
                  <TrendingUp width={16} height={16} />
                ) : (
                  <TrendingDown width={16} height={16} />
                )}
              </p>
            </div>
          );
        },
      },
      {
        header: "Price",
        cellClassName: "price-cell",
        cell: (coin) => formatCurrency(coin.item.data.price),
      },
    ];
  } catch (error) {
    console.error("Failed to fetch trending coins", error);
    return <div>Failed to load trending coins</div>;
  }

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <DataTable
        data={trendingCoins.coins.slice(0, 6)}
        columns={columns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default TrendingCoins;
