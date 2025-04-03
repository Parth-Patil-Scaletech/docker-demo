import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <h1 className="text-lg font-bold text-gray-800">📁 File Management System</h1>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white shadow-sm mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © 2025 Docker Demo Project - All Rights Reserved
        </div>
      </footer>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}
