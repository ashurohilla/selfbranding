"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/store/user";
import { PersonIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface PrivateRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, fallback }) => {
  const user = useUser((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to allow the animation to play out nicely
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        // --- LOADING STATE ---
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-white flex flex-col items-center justify-center"
        >
          <BrandedLoader />
        </motion.div>
      ) : !user?.id ? (
        // --- UNAUTHENTICATED STATE ---
        <motion.div
          key="restricted"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          {fallback || <DefaultAccessRestricted />}
        </motion.div>
      ) : (
        // --- AUTHENTICATED CONTENT ---
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * A sleek, animated loader to replace the basic CSS spinner.
 */
const BrandedLoader = () => (
  <div className="flex flex-col items-center gap-6">
    <div className="relative flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-t-2 border-b-2 border-teal-600 rounded-full"
      />
      {/* Inner pulsing square */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["20%", "50%", "20%"],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute w-8 h-8 bg-teal-500/20 border border-teal-600/50"
      />
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-center"
    >
      <p className="text-sm font-medium text-gray-500 tracking-widest uppercase">
        Securing Session
      </p>
      <div className="flex gap-1 justify-center mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-1 h-1 bg-teal-600 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  </div>
);

/**
 * The default UI shown when a user is not logged in.
 */
const DefaultAccessRestricted = () => (
  <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
    <Card className="w-full max-w-md shadow-xl border-none ring-1 ring-black/5">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 p-3 bg-red-50 rounded-full w-fit">
          <LockClosedIcon className="w-8 h-8 text-red-600" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">
          Access Restricted
        </CardTitle>
        <p className="text-sm text-gray-500 mt-2">
          You are attempting to access a secure area.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <PersonIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Please sign in to continue to your dashboard.</p>
        </div>
        
        <div className="grid gap-3">
          <Link href="/login" className="w-full">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-all active:scale-[0.98]">
              Sign In
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="ghost" className="w-full text-gray-500">
              Back to Home
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default PrivateRoute;