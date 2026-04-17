"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/shared/lib/utils";

type ChartConfig = Record<string, { label?: React.ReactNode; color?: string; icon?: React.ComponentType }>;

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & { config: ChartConfig; children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"] }) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn("min-w-0 min-h-0 text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%" minWidth={0}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([, c]) => c.color);
  if (!colorConfig.length) return null;
  return (
    <style>{`[data-chart=${id}] { ${colorConfig.map(([key, c]) => `--color-${key}: ${c.color};`).join(" ")} }`}</style>
  );
}

function ChartTooltip({ ...props }: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) {
  return <RechartsPrimitive.Tooltip {...props} />;
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  label,
  labelFormatter,
}: React.ComponentProps<"div"> & {
  active?: boolean;
  payload?: RechartsPrimitive.TooltipPayloadEntry[];
  indicator?: "dot" | "line" | "dashed";
  hideLabel?: boolean;
  label?: string;
  labelFormatter?: (value: string | number, payload: RechartsPrimitive.TooltipPayloadEntry[]) => React.ReactNode;
}) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;

  return (
    <div className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}>
      {!hideLabel && (
        <div className="font-medium">
          {labelFormatter ? labelFormatter(label ?? "", payload) : label}
        </div>
      )}
      <div className="grid gap-1.5">
        {payload.map((item) => {
          const itemConfig = config[item.dataKey as string];
          return (
            <div key={String(item.dataKey)} className="flex items-center gap-2">
              <div
                className="shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)"
                style={{ "--color-bg": item.color, "--color-border": item.color } as React.CSSProperties}
              />
              <span className="text-muted-foreground">{String(itemConfig?.label || item.dataKey)}</span>
              <span className="ml-auto font-mono font-medium text-foreground">{typeof item.value === "number" ? item.value.toLocaleString() : String(item.value ?? "")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChartLegend({ ...props }: React.ComponentProps<typeof RechartsPrimitive.Legend>) {
  return <RechartsPrimitive.Legend {...props} />;
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, useChart };
export type { ChartConfig };
