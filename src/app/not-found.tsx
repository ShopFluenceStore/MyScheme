import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8 -mt-16">
          <div className="relative w-64 h-48 mx-auto">
            <Image
              src="/images/404.svg"
              alt="404 Illustration"
              width={256}
              height={192}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
        
        {/* Page not found text */}
        <h1 className="text-3xl font-bold text-[var(--text)] mb-3">Page not found</h1>
        <p className="text-[var(--sub-text)] mb-8 text-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        
        {/* Back to home button */}
        <div className="mt-10">
          <Link 
            href="/" 
          >
            <Button variant="link" className="text-lg">
            Back to home page
            <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        {/* Additional help */}
        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--sub-text)]">
            Need help?{' '}
            <Link href="/contact" className="text-[var(--link-color)] hover:underline">
              Contact our support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
