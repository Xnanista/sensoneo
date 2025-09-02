import React from "react";
import formatVolume from "src/lib/formaters/formatVolume";
import type { TProductListItem } from "src/types/products/productsList.types";

type HomePageRecentProductsItemProps = { item: TProductListItem };

const HomePageRecentProductsItem: React.FunctionComponent<
  HomePageRecentProductsItemProps
> = ({ item }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm leading-none font-medium">{item.name}</p>
        <p className="text-muted-foreground text-sm">
          {`${formatVolume(item.volume)} • $${Intl.NumberFormat("en-US").format(item.deposit)} deposit • `}
          <span className="capitalize">{item.packaging}</span>
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default HomePageRecentProductsItem;
