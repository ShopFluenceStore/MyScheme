import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | MyScheme",
  description: "Admin Panel MyScheme",
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
