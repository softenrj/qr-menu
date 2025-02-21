"use client"
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Aside from '@/components/dashboard/aside';
import Home from '@/components/dashboard/home';

const Page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "loading") {
        return <div>Loading...</div>;
      }
    
      if (status === "unauthenticated") {
        router.push('/');
      }
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Aside activeTab={'dashboard'} />
            <Home />
        </div>
    );
}

export default Page;
