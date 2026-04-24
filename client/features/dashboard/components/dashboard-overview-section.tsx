"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  DollarSign,
  Package,
  ShoppingBag,
  Tag,
  TrendingUp,
  Users2,
} from "lucide-react";

import { DashboardStats } from "@/features/dashboard/types/admin.types";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

type DashboardOverviewSectionProps = {
  stats: DashboardStats;
  chartMax: number;
};

const statCards = [
  {
    key: "users" as const,
    label: "Users",
    sub: "Registered accounts",
    icon: Users2,
    color: "bg-sky-100 text-sky-700",
  },
  {
    key: "products" as const,
    label: "Products",
    sub: "Items in catalog",
    icon: Package,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    key: "categories" as const,
    label: "Categories",
    sub: "Published collections",
    icon: Tag,
    color: "bg-amber-100 text-amber-700",
  },
  {
    key: "orders" as const,
    label: "Orders",
    sub: "Lifetime volume",
    icon: ShoppingBag,
    color: "bg-rose-100 text-rose-700",
  },
  {
    key: "revenue" as const,
    label: "Revenue",
    sub: "Gross sales tracked",
    icon: DollarSign,
    color: "bg-lime-100 text-lime-700",
  },
] as const;

const volumeChartConfig = {
  total: { label: "Total", color: "oklch(0.62 0.16 155)" },
} satisfies ChartConfig;

const mixChartConfig = {
  products: { label: "Products", color: "oklch(0.62 0.16 155)" },
  categories: { label: "Categories", color: "oklch(0.78 0.16 85)" },
  users: { label: "Users", color: "oklch(0.65 0.16 235)" },
  orders: { label: "Orders", color: "oklch(0.68 0.17 25)" },
} satisfies ChartConfig;

export const DashboardOverviewSection = ({
  stats,
  chartMax,
}: DashboardOverviewSectionProps) => {
  const totalObjects = stats.products + stats.categories + stats.users + stats.orders;
  const averageOrderValue = stats.orders > 0 ? stats.revenue / stats.orders : 0;
  const productsPerCategory = stats.categories > 0 ? stats.products / stats.categories : 0;

  const volumeData = [
    { name: "Users", total: stats.users },
    { name: "Products", total: stats.products },
    { name: "Categories", total: stats.categories },
    { name: "Orders", total: stats.orders },
  ];

  const mixData = [
    { name: "Products", value: stats.products, fill: "var(--color-products)" },
    { name: "Categories", value: stats.categories, fill: "var(--color-categories)" },
    { name: "Users", value: stats.users, fill: "var(--color-users)" },
    { name: "Orders", value: stats.orders, fill: "var(--color-orders)" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-5">
        {statCards.map(({ key, label, sub, icon: Icon, color }) => (
          <Card key={key} className="border-0 shadow-sm">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <CardDescription>{sub}</CardDescription>
              </div>
              <span className={cn("rounded-xl p-2", color)}>
                <Icon className="size-4" />
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight">
                {key === "revenue" ? `$${stats.revenue.toFixed(2)}` : stats[key].toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Operational Volume</CardTitle>
            <CardDescription>
              Side-by-side comparison of the main tracked entities
            </CardDescription>
          </CardHeader>
          <CardContent className="min-w-0">
            <ChartContainer
              config={volumeChartConfig}
              className="h-[320px] min-h-[320px] w-full min-w-0"
            >
              <BarChart
                accessibilityLayer
                data={volumeData}
                margin={{ top: 16, right: 12, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  domain={[0, chartMax]}
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="total" radius={[12, 12, 4, 4]} fill="var(--color-total)">
                  <LabelList position="top" className="fill-foreground text-xs" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Entity Mix</CardTitle>
            <CardDescription>Distribution across the tracked dashboard objects</CardDescription>
          </CardHeader>
          <CardContent className="min-w-0 space-y-5">
            <ChartContainer
              config={mixChartConfig}
              className="mx-auto h-[240px] min-h-[240px] w-full max-w-[280px] min-w-0"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={mixData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={92}
                  paddingAngle={4}
                >
                  {mixData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>

            <div className="space-y-3">
              {[
                {
                  label: "Average order value",
                  value: `$${averageOrderValue.toFixed(2)}`,
                  note: "Revenue divided by total orders",
                  icon: DollarSign,
                },
                {
                  label: "Products per category",
                  value: productsPerCategory.toFixed(1),
                  note: "Catalog density across active categories",
                  icon: Package,
                },
                {
                  label: "Orders per user",
                  value: stats.users > 0 ? (stats.orders / stats.users).toFixed(2) : "0.00",
                  note: "Purchase activity relative to account count",
                  icon: TrendingUp,
                },
              ].map((metric) => {
                const Icon = metric.icon;

                return (
                  <div key={metric.label} className="rounded-2xl border bg-muted/40 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">{metric.label}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{metric.note}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-emerald-600" />
                        <span className="text-2xl font-semibold tracking-tight">
                          {metric.value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-2">
              {mixData.map((entry) => {
                const share = totalObjects > 0 ? (entry.value / totalObjects) * 100 : 0;

                return (
                  <div
                    key={entry.name}
                    className="flex items-center justify-between rounded-xl border bg-background px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: entry.fill }}
                      />
                      <span className="text-sm font-medium">{entry.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{share.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
