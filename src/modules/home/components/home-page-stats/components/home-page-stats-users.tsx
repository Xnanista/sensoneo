import { Users } from "lucide-react";
import React from "react";
import UsersQuery from "src/hooks/query/users/useUsersQuery";
import HomePageStatsCard from "./home-page-stats-card";

const HomePageStatsUsers: React.FunctionComponent = () => {
  const { data, error } = UsersQuery.useQuery();

  return (
    <HomePageStatsCard
      name="Users"
      count={error ? "X" : data?.total}
      description="Registered users"
      icon={<Users />}
    />
  );
};

export default HomePageStatsUsers;
