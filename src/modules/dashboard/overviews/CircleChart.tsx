"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

export function CircleChart({
  amount,
  title,
  color,
  isPending,
  className,
}: {
  amount: number | undefined;
  title: string;
  color?: string;
  isPending: boolean;
  className?: string;
}) {
  const chartData = [
    { browser: "Total", visitors: amount, fill: color ?? "red" },
  ];

  const totalAmount = () =>
    chartData.reduce((acc, curr) => acc + curr.visitors!, 0);

  return (
    <Card
      className={cn(
        "flex flex-col  bg-transparent backdrop-blur-xs",
        className
      )}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          {
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {isPending ? (
                              <Skeleton>skeleton</Skeleton>
                            ) : (
                              totalAmount().toString()
                            )}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Taka
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          }
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <h1>{title}</h1>
      </CardFooter>
    </Card>
  );
}
