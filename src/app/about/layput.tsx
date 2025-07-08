import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | MyScheme",
  description: "About MyScheme",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
