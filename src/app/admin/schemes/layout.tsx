import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Schemes | Admin Dashboard",
  description: "Admin panel for managing all government schemes and user submissions.",
};

export default function AdminSchemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}