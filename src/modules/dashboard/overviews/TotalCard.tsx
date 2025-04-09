import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type TotalCardType = { title: string; amount: number };
const TotalCard = ({
  info,
  className,
}: {
  info: TotalCardType[];
  className?: string;
}) => {
  return (
    <Card className={cn("bg-transparent backdrop-blur-xs ", className)}>
      <CardTitle></CardTitle>
      <CardContent className="grid-cols-2 grid space-y-5">
        {info.map((item, i) => (
          <div key={i} className="">
            <h1 className="text-lg md:text-xl font-black">{item.title}</h1>
            <h2 className="text-2xl font-semibold text-blue-300">
              = {item.amount}
            </h2>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TotalCard;
