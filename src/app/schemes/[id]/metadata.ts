import { Metadata } from 'next';

// This should match the scheme type from your data
interface Scheme {
  id: string;
  title: string;
  description: string;
  logo?: string;
}

// This would normally come from an API
const demoSchemes: Scheme[] = [
  {
    id: '1',
    title: 'PM Kisan Samman Nidhi',
    description: 'Income support scheme for all landholding farmers in the country.',
    logo: '/schemes/pm-kisan.png',
  },
  // Add other schemes as needed
];

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const scheme = demoSchemes.find(s => s.id === params.id);
  
  if (!scheme) {
    return {
      title: 'Scheme Not Found',
      description: 'The requested scheme could not be found.'
    };
  }

  return {
    title: `${scheme.title} | Government Scheme`,
    description: scheme.description,
    openGraph: {
      title: scheme.title,
      description: scheme.description,
      type: 'website',
      images: scheme.logo ? [scheme.logo] : undefined
    }
  };
}
