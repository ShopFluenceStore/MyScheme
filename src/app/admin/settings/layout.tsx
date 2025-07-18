import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Settings | Admin Dashboard",
  description: "Configure site settings, branding, and functionality.",
};

export default function AdminSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}