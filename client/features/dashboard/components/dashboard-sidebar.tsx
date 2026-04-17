"use client";

import { DashboardSection } from "@/features/dashboard/types/admin.types";

type DashboardSidebarProps = {
  section: DashboardSection;
  onChange: (section: DashboardSection) => void;
};

const sideMenu: { key: DashboardSection; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "products", label: "Products" },
  { key: "categories", label: "Categories" },
  { key: "users", label: "Users" },
  { key: "orders", label: "Orders" },
];

export const DashboardSidebar = ({ section, onChange }: DashboardSidebarProps) => {
  return (
    <aside className="rounded-2xl border border-emerald-200 bg-white/90 p-4 shadow-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Admin CMT</p>
      <div className="space-y-1">
        {sideMenu.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
              section === item.key
                ? "bg-emerald-700 text-white"
                : "text-slate-700 hover:bg-emerald-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};
