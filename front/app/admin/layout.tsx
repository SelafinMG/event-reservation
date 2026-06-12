export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="-mt-24 relative z-20 min-h-screen">{children}</div>;
}
