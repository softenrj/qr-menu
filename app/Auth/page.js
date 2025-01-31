"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GitHub, Google, LinkedIn } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Page = () => {

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session,router]);

    if (!session) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex flex-1 items-center justify-center bg-gray-100 px-6 bg-gradient-to-r from-green-400 to-blue-500 h-screen w-full">
                    <div className="bg-white shadow-2xl rounded-2xl p-14 w-full max-w-lg text-center mt-20 mb-60">
                        <div className="h-40 w-40 mx-auto rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                            <img
                                src="profile.jpg"
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <h2 className="text-4xl font-bold text-gray-800 mt-6 mb-8">Login</h2>

                        <div className="space-y-6">
                            <button
                                className="flex items-center justify-center w-full py-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 transition-all duration-300 text-lg font-medium shadow-md"
                                onClick={() => signIn("google")}
                            >
                                <Google className="mr-3 text-red-500" fontSize="large" />
                                Continue with Google
                            </button>

                            <button
                                className="flex items-center justify-center w-full py-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 transition-all duration-300 text-lg font-medium shadow-md"
                                onClick={() => signIn("github")}
                            >
                                <GitHub className="mr-3 text-black" fontSize="large" />
                                Continue with GitHub
                            </button>

                            <button
                                className="flex items-center justify-center w-full py-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 transition-all duration-300 text-lg font-medium shadow-md"
                                onClick={() => signIn("linkedin")}
                            >
                                <LinkedIn className="mr-3 text-blue-700" fontSize="large" />
                                Continue with LinkedIn
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return null;
};

export default Page;
