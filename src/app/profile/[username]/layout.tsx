import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: { username: string } 
}): Promise<Metadata> {
  // In a real app, you'd fetch the user data here
  const username = params.username;
  
  return {
    title: `@${username} | MyScheme Profile`,
    description: `View ${username}'s profile and published schemes on MyScheme.`,
  };
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}