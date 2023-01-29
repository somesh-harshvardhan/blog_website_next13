import './globals.css'

import StyledComponentsRegistry from './../lib/registry';
import Header from '@/components/header/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
         
      </body>
    </html>
  );
}