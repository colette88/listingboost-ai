import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'ListingBoost AI — Turn products into bestsellers',description:'Create SEO titles, compelling descriptions, benefit-driven bullets and tags for Etsy, Amazon and Shopify.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
