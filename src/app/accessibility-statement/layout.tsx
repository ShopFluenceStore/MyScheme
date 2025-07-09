import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | MyScheme",
  description: "Accessibility Statement MyScheme",
};

export default function AccessibilityStatementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
