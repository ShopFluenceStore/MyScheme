import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Screen Reader | MyScheme",
  description: "Screen Reader MyScheme",
};

export default function ScreenReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
