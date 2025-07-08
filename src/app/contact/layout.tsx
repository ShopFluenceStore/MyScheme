import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | MyScheme",
  description: "Contact us for any inquiries or feedback.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
