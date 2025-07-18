import AuthForm from '@/components/AuthForm';

export default function AuthPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const isSignUp = searchParams?.signup === 'true';
  return <AuthForm isSignUp={!!isSignUp} />;
}
