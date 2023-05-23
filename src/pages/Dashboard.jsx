import React from "react";
import { withAuth } from "../components/WithAuth";
import AdminLayout from "../layouts/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <p className="text-gray-700 text-3xl mb-16 font-bold">
        Ini Halaman Dashboard
      </p>
    </AdminLayout>
  );
};

export default withAuth(Dashboard);
