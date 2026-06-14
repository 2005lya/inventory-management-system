import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </ProtectedRoute>
      
  );
}