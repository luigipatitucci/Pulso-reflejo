import type { Metadata } from 'next';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Reflejo | Gestión, comunicación y calidad en salud',
    template: '%s | Reflejo',
  },
  description: 'Consultoría en gestión, comunicación, calidad y seguridad para organizaciones y profesionales de la salud.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <ContentProvider>
          <a className="skipLink" href="#main">Saltar al contenido</a>
          <Header />
          {children}
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}
