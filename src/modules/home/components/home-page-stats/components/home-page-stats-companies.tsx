import { Building2 } from "lucide-react";
import React from "react";
import CompaniesQuery from "src/hooks/query/companies/useCompaniesQuery";
import HomePageStatsCard from "./home-page-stats-card";

const HomePageStatsCompanies: React.FunctionComponent = () => {
  const { data, error } = CompaniesQuery.useQuery();

  return (
    <HomePageStatsCard
      name="Companies"
      count={error ? "X" : data?.total}
      description="Registered companies"
      icon={<Building2 />}
    />
  );
};

export default HomePageStatsCompanies;
