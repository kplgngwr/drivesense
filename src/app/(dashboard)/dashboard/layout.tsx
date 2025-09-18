'use client'

import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { LoadScript } from '@react-google-maps/api';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (

    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}>
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden pt-16">{children}</main>
        </div>
      </LoadScript>
    </>
  );
}
