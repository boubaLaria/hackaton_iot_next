import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { views, profit, products } = await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <OverviewCard
        label="Équipements totaux"
        data={{
          ...views,
          state: "",
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Équipements actifs"	
        data={{
          ...profit,
          state: "ON",
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Équipements inactifs"
        data={{
          ...products,
          state: "OFF",
        }}
        Icon={icons.Product}
      />

      {/* <OverviewCard
        label="Total Users"
        data={{
          ...users,
          value: compactFormat(users.value),
        }}
        Icon={icons.Users}
      /> */}
    </div>
  );
}
