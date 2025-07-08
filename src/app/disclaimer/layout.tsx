import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | MyScheme",
  description: "Read our disclaimer for using the MyScheme platform.",
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
