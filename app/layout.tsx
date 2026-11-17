import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title:'Tử Vi 247 | Lập lá số Tử Vi Đẩu Số',
 description:'Lập lá số Tử Vi Đẩu Số, xem 12 cung, chính tinh, phụ tinh, tứ hóa, đại hạn và cách cục bằng tiếng Việt.',
 keywords:['Tử Vi','Tử Vi Đẩu Số','lập lá số','12 cung','tứ hóa','đại hạn'],
 metadataBase:new URL('https://tuvi247.2bd.net'),
 openGraph:{title:'Tử Vi 247 | Lập lá số Tử Vi Đẩu Số',description:'Công cụ lập và tra cứu lá số Tử Vi bằng tiếng Việt.',url:'https://tuvi247.2bd.net',siteName:'Tử Vi 247',locale:'vi_VN',type:'website'}
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="vi"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}