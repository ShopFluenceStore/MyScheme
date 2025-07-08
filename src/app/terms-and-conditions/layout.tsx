import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | MyScheme",
  description: "Read our terms and conditions for using the MyScheme platform.",
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
