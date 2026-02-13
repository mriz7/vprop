import './globals.css';

export const metadata = {
  title: 'Will You Be My Valentine? 💕',
  description: 'A special message just for you...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💕</text></svg>" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
