import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MyScheme",
  description: "Read our Privacy Policy for using the MyScheme platform.",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
