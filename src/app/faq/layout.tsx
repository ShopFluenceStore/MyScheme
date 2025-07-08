import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | MyScheme",
  description: "Read our Frequently Asked Questions for using the MyScheme platform.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
