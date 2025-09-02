import { CircleDashed } from "lucide-react";
import React from "react";
import ProductsListQuery from "src/hooks/query/products/useProductsListQuery";
import HomePageStatsCard from "./home-page-stats-card";

const HomePageStatsPendingProducts: React.FunctionComponent = () => {
  const { data, error } = ProductsListQuery.useQuery({
    page: 1,
    limit: 1,
    active: false,
  });

  return (
    <HomePageStatsCard
      name="Pending products"
      count={error ? "X" : data?.pagination.totalItems}
      description="Products waiting for approval"
      icon={<CircleDashed />}
    />
  );
};

export default HomePageStatsPendingProducts;
