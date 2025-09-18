"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { date: "2024-04-01", total: 222 },
  { date: "2024-04-02", total: 97 },
  { date: "2024-04-03", total: 167 },
  { date: "2024-04-04", total: 242 },
  { date: "2024-04-05", total: 373 },
  { date: "2024-04-06", total: 301 },
  { date: "2024-04-07", total: 245 },
  { date: "2024-04-08", total: 409 },
  { date: "2024-04-09", total: 59 },
  { date: "2024-04-26", total: 75 },
  { date: "2024-04-27", total: 383 },
  { date: "2024-04-28", total: 122 },
  { date: "2024-04-29", total: 315 },
  { date: "2024-04-30", total: 454 },
  { date: "2024-05-01", total: 165 },
  { date: "2024-05-02", total: 293 },
  { date: "2024-05-03", total: 247 },
  { date: "2024-05-04", total: 385 },
  { date: "2024-05-05", total: 481 },
  { date: "2024-05-06", total: 498 },
  { date: "2024-05-07", total: 388 },
  { date: "2024-05-08", total: 149 },
  { date: "2024-05-09", total: 227 },
  { date: "2024-05-10", total: 293 },
]

const chartConfig = {
  views: {
    label: "Clicks",
  },
  total: {
    label: "Total",
    color: "#000be2",
  },
} satisfies ChartConfig

export function EngagementChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("total")

  const total = React.useMemo(
    () => ({
      total: chartData.reduce((acc, curr) => acc + curr.total, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Clicks over time</CardTitle>
          <CardDescription>
            Showing total clicks from last month
          </CardDescription>
        </div>
        <div className="flex">
          {["total"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
