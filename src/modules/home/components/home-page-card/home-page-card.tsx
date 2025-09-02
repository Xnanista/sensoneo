import React from "react";
import { Card, CardContent, CardHeader } from "src/components/card";
import { Separator } from "src/components/separator";
import { cn } from "src/lib/utils";

type TDivBase = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref" | "title"
>;

type HomePageCardProps = TDivBase & {
  title: React.ReactNode;
};

const HomePageCard: React.FunctionComponent<HomePageCardProps> = ({
  title,
  className,
  children,
  ...rest
}) => {
  return (
    <Card className={cn("py-0", className)} {...rest}>
      <CardHeader className="text-xl font-semibold px-5 pt-5 ">
        {title}
      </CardHeader>
      <Separator />
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
};

export default HomePageCard;
