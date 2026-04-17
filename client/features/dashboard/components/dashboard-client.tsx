"use client";

import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { DashboardInitialData } from "@/features/dashboard/types/admin.types";
import { useDashboardManager } from "@/features/dashboard/hooks/use-dashboard-manager";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { DashboardOverviewSection } from "@/features/dashboard/components/dashboard-overview-section";
import { DashboardProductsSection } from "@/features/dashboard/components/dashboard-products-section";
import { DashboardCategoriesSection } from "@/features/dashboard/components/dashboard-categories-section";
import { DashboardUsersSection } from "@/features/dashboard/components/dashboard-users-section";
import { DashboardOrdersSection } from "@/features/dashboard/components/dashboard-orders-section";

type DashboardClientProps = {
  initialData: DashboardInitialData;
};

export const DashboardClient = ({ initialData }: DashboardClientProps) => {
  const dashboard = useDashboardManager(initialData);

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-100 via-emerald-50 to-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[240px_1fr]">
        <DashboardSidebar section={dashboard.section} onChange={dashboard.setSection} />

        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Dashboard</CardTitle>
            </CardHeader>
          </Card>

          {dashboard.section === "overview" && (
            <DashboardOverviewSection stats={dashboard.stats} chartMax={dashboard.chartMax} />
          )}

          {dashboard.section === "products" && (
            <DashboardProductsSection
              products={dashboard.products}
              categories={dashboard.categories}
              onCreateProduct={dashboard.createProduct}
              onUpdateProduct={dashboard.updateProduct}
              onDeleteProduct={dashboard.deleteProduct}
            />
          )}

          {dashboard.section === "categories" && (
            <DashboardCategoriesSection
              categories={dashboard.categories}
              onCreateCategory={dashboard.createCategory}
              onUpdateCategory={dashboard.updateCategory}
              onDeleteCategory={dashboard.deleteCategory}
            />
          )}

          {dashboard.section === "users" && (
            <DashboardUsersSection
              users={dashboard.users}
              onUpdateUser={dashboard.updateUser}
              onDeleteUser={dashboard.deleteUser}
            />
          )}

          {dashboard.section === "orders" && (
            <DashboardOrdersSection
              orders={dashboard.orders}
              onUpdateOrder={dashboard.updateOrder}
              onDeleteOrder={dashboard.deleteOrder}
            />
          )}
        </section>
      </div>
    </main>
  );
};
