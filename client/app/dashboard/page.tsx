import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ACCESS_TOKEN_COOKIE } from "@/features/auth/services/token.service";
import { DashboardClient } from "@/features/dashboard/components/dashboard-client";
import { getDashboardPageData } from "@/features/dashboard/services/dashboard-page.service";

export default async function DashboardPage() {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value ?? null;

  if (!token) {
    redirect("/sign-in");
  }

  try {
    const { user, initialData } = await getDashboardPageData(token);

    if (!user?.isAdmin) {
      redirect("/");
    }

    return <DashboardClient initialData={initialData} />;
  } catch (error) {
    const status = (error as { status?: number }).status;
    if (status === 401) {
      redirect("/sign-in");
    }

    throw error;
  }
}
