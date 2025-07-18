import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Schemes | MyScheme Dashboard",
  description: "Manage your published government schemes and track their performance.",
};

export default function MySchemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}