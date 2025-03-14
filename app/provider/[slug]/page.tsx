// Página del servidor para la exportación estática
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { BloombergIcon, DFIcon } from '@/components/VendorIcons';
import ProviderClient from './provider-client';

// Definición de los proveedores disponibles
const providers = [
  {
    id: 'bloomberg',
    name: 'Bloomberg',
    logo: <BloombergIcon className="h-8 w-8" />
  },
  {
    id: 'df.cl',
    name: 'DF.cl',
    logo: <DFIcon className="h-8 w-8" />
  }
];

// Esta función es requerida para la exportación estática con Next.js
export function generateStaticParams() {
  return providers.map((provider) => ({
    slug: provider.id,
  }));
}

interface Props {
  params: {
    slug: string;
  };
}

export default function ProviderPage({ params }: Props) {
  const { slug } = params;
  
  // Encontrar el proveedor por su ID
  const provider = providers.find(v => v.id === slug);
  
  if (!provider) {
    notFound();
  }

  // Normalizar el ID del proveedor para la API
  const normalizedProviderId = slug === 'bloomberg' ? 'Bloomberg' : 
                              slug === 'df.cl' ? 'DF.cl' : 
                              slug;

  return (
    <ProviderClient 
      slug={slug}
      provider={provider} 
      normalizedProviderId={normalizedProviderId} 
    />
  );
}