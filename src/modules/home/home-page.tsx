import { Package, Plus } from "lucide-react";

import { Link } from "react-router";
import { Button } from "src/components/button";
import { PageHeader } from "../../components/page-header";
import HomePageCard from "./components/home-page-card";
import HomePageRecentProducts from "./components/home-page-recent-products";
import HomePageStats from "./components/home-page-stats";

export function HomePage() {
  return (
    <div>
      <PageHeader
        title="Deposit management dashboard"
        description="Welcome to your deposit management system. Monitor and manage your products, companies, and users."
        icon={<Package size={28} />}
      />
      <HomePageStats />
      <HomePageCard title="Quick actions" className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link to="/products">
            <Button variant="outline" className="w-full">
              <Plus />
              View all products
            </Button>
          </Link>
          <Button variant="default">
            <Plus />
            Add new product
          </Button>
        </div>
      </HomePageCard>
      <HomePageRecentProducts />
    </div>
  );
}
