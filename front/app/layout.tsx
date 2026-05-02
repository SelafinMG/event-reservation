import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-b from-cyan-400 via-[#3887BE] via-blue-800 to-purple-900 text-blue-50">
        <header className="p-6 flex justify-between items-center bg-blue-950/50 backdrop-blur">
          <h1 className="text-2xl font-bold">🚀 EventSync</h1>
          <nav className="space-x-6">
            <a href="/events" className="hover:text-cyan-200">Événements</a>
            <a href="/favorites" className="hover:text-cyan-200">Mes Favoris</a>
            <a href="/login" className="hover:text-cyan-200">Connexion</a>
          </nav>
        </header>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
