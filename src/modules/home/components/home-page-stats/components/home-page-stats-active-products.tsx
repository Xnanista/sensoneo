import { Milk } from "lucide-react";
import React from "react";
import ProductsListQuery from "src/hooks/query/products/useProductsListQuery";
import HomePageStatsCard from "./home-page-stats-card";

const HomePageStatsActiveProducts: React.FunctionComponent = () => {
  const { data, error } = ProductsListQuery.useQuery({
    page: 1,
    limit: 1,
    active: true,
  });

  return (
    <HomePageStatsCard
      name="Active products"
      count={error ? "X" : data?.pagination.totalItems}
      description="Active products in system"
      icon={<Milk />}
    />
  );
};

export default HomePageStatsActiveProducts;
