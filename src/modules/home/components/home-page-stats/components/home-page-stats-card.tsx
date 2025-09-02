import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/card";
import { Skeleton } from "src/components/skeleton";

type HomePageStatsCardProps = {
  name: React.ReactNode;
  description: React.ReactNode;
  icon: React.ReactNode;
  count: React.ReactNode;
};

const HomePageStatsCard = ({
  name,
  icon,
  description,
  count,
}: HomePageStatsCardProps) => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="text-lg font-semibold text-primary">
          {name}
        </CardDescription>
        <CardTitle className="font-bold tabular-nums text-3xl pt-1 pb-2">
          {count === null || count === undefined ? (
            <Skeleton style={{ height: 36 }} />
          ) : (
            count
          )}
        </CardTitle>
        <CardAction className="text-neutral-500">{icon}</CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
          {description}
        </div>
      </CardFooter>
    </Card>
  );
};

export default HomePageStatsCard;
