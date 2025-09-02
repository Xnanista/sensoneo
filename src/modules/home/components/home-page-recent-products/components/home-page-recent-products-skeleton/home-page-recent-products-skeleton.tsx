import React from "react";
import { Skeleton } from "src/components/skeleton";

const HomePageRecentProductsSkeleton: React.FunctionComponent = () => {
  return [...new Array(5)].map((_, index) => (
    <Skeleton key={index} style={{ height: 34 }} />
  ));
};

export default HomePageRecentProductsSkeleton;
