import React from "react";
import HomePageStatsActiveProducts from "./components/home-page-stats-active-products";
import HomePageStatsPendingProducts from "./components/home-page-stats-pending-products";
import HomePageStatsCompanies from "./components/home-page-stats-companies";
import HomePageStatsUsers from "./components/home-page-stats-users";

const HomePageStats: React.FunctionComponent = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4">
      <HomePageStatsActiveProducts />
      <HomePageStatsPendingProducts />
      <HomePageStatsCompanies />
      <HomePageStatsUsers />
    </div>
  );
};

export default HomePageStats;
