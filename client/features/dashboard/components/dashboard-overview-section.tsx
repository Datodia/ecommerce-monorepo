"use client";

import { DollarSign, Package, ShoppingBag, Tag, Users2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, RadialBar, RadialBarChart, PolarGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart";
import { cn } from "@/shared/lib/utils";
import { DashboardStats } from "@/features/dashboard/types/admin.types";

type DashboardOverviewSectionProps = {
  stats: DashboardStats;
  chartMax: number;
};

const statCards = [
  { key: "users" as const, label: "Users", sub: "Total registered", icon: Users2, color: "bg-sky-100 text-sky-600" },
  { key: "products" as const, label: "Products", sub: "In catalog", icon: Package, color: "bg-emerald-100 text-emerald-600" },
  { key: "categories" as const, label: "Categories", sub: "Active", icon: Tag, color: "bg-amber-100 text-amber-600" },
  { key: "orders" as const, label: "Orders", sub: "All time", icon: ShoppingBag, color: "bg-violet-100 text-violet-600" },
  { key: "revenue" as const, label: "Revenue", sub: "Total earned", icon: DollarSign, color: "bg-green-100 text-green-600" },
] as const;

const barChartConfig = {
  users: { label: "Users", color: "oklch(0.6 0.2 220)" },
  products: { label: "Products", color: "oklch(0.65 0.18 145)" },
  categories: { label: "Categories", color: "oklch(0.75 0.18 85)" },
  orders: { label: "Orders", color: "oklch(0.65 0.18 280)" },
} satisfies ChartConfig;

const radialChartConfig = {
  value: { label: "Value" },
} satisfies ChartConfig;

export const DashboardOverviewSection = ({ stats, chartMax }: DashboardOverviewSectionProps) => {
  const barData = [
    { name: "Users", users: stats.users },
    { name: "Products", products: stats.products },
    { name: "Categories", categories: stats.categories },
    { name: "Orders", orders: stats.orders },
  ];

  const radialData = [
    { name: "Orders", value: stats.orders, fill: "oklch(0.65 0.18 280)" },
    { name: "Products", value: stats.products, fill: "oklch(0.65 0.18 145)" },
    { name: "Users", value: stats.users, fill: "oklch(0.6 0.2 220)" },
    { name: "Categories", value: stats.categories, fill: "oklch(0.75 0.18 85)" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map(({ key, label, sub, icon: Icon, color }) => (
          <Card key={key}>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <span className={cn("rounded-lg p-2", color)}>
                <Icon className="size-4" />
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {key === "revenue" ? `$${stats.revenue.toFixed(2)}` : stats[key]}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig} className="h-[220px] w-full">
              <BarChart data={barData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis domain={[0, chartMax]} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="products" fill="var(--color-products)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="categories" fill="var(--color-categories)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={radialChartConfig} className="h-[220px] w-full">
              <RadialBarChart data={radialData} innerRadius={30} outerRadius={100}>
                <PolarGrid gridType="circle" />
                <RadialBar dataKey="value" label={{ position: "insideStart", fill: "#fff", fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
