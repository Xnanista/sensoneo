import React from "react";
import ProductsListQuery from "src/hooks/query/products/useProductsListQuery";
import HomePageCard from "../home-page-card";
import HomePageRecentProductsSkeleton from "./components/home-page-recent-products-skeleton";
import HomePageRecentProductsItem from "./components/home-page-recent-products-item";

const HomePageRecentProducts: React.FunctionComponent = () => {
  const { data, isLoading } = ProductsListQuery.useQuery({
    page: 1,
    limit: 5,
    active: true,
    order: "desc",
    sort: "registeredAt",
  });

  return (
    <HomePageCard title="Recent Products" className="mt-8">
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <HomePageRecentProductsSkeleton />
        ) : (
          data?.data.map((product) => (
            <HomePageRecentProductsItem key={product.id} item={product} />
          ))
        )}
      </div>
      <div>{}</div>
    </HomePageCard>
  );
};

export default HomePageRecentProducts;
