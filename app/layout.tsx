import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title:'Tử Vi 247 | Tử Vi Đẩu Số & Kinh Dịch',
 description:'Lập lá số Tử Vi Đẩu Số và gieo quẻ Kinh Dịch với 64 quẻ, hào động, quẻ biến và tra cứu cổ văn bằng tiếng Việt.',
 keywords:['Tử Vi','Tử Vi Đẩu Số','Kinh Dịch','Chu Dịch','64 quẻ','gieo quẻ','hào động','quẻ biến'],
 metadataBase:new URL('https://tuvi247.2bd.net'),
 openGraph:{title:'Tử Vi 247 | Tử Vi Đẩu Số & Kinh Dịch',description:'Công cụ lập lá số Tử Vi và gieo quẻ Kinh Dịch bằng tiếng Việt.',url:'https://tuvi247.2bd.net',siteName:'Tử Vi 247',locale:'vi_VN',type:'website'}
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="vi"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}