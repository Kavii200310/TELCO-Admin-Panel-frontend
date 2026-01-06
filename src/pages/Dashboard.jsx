import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Signal, Smartphone, Clock } from "lucide-react";
import StatCard from "@/components/admin/Dashboard/StatCard";
import api from "@/services/api";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { id: 1, title: "Total Revenue", value: "Rs. 0.00", icon: DollarSign },
    { id: 2, title: "Active eSIMs", value: "0", icon: Signal },
    { id: 3, title: "Stock Available", value: "0", icon: Smartphone },
    { id: 4, title: "Pending Orders", value: "0", icon: Clock },
  ]);

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await api.get("/admin/dashboard");
        const data = res.data;

        /* ---------- Helpers ---------- */
        const formatNumber = (n) => Number(n || 0).toLocaleString();

        const formatCurrency = (amount) =>
          `Rs. ${Number(amount || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;

        const formatDate = (dateStr) => {
          if (!dateStr) return "N/A";
          const d = new Date(dateStr + "T00:00:00");
          return d.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
        };

        /* ---------- Stats Cards ---------- */
        setStats([
          {
            id: 1,
            title: "Total Revenue",
            value: formatCurrency(data.totalRevenue),
            icon: DollarSign,
            bgIconColor: "bg-green-50",
            iconColor: "text-green-600",
          },
          {
            id: 2,
            title: "Active eSIMs",
            value: formatNumber(data.activeEsims),
            icon: Signal,
            bgIconColor: "bg-blue-50",
            iconColor: "text-blue-600",
          },
          {
            id: 3,
            title: "Stock Available",
            value: formatNumber(data.stockAvailable),
            icon: Smartphone,
            bgIconColor: "bg-purple-50",
            iconColor: "text-purple-600",
          },
          {
            id: 4,
            title: "Pending Orders",
            value: formatNumber(data.pendingOrders),
            icon: Clock,
            bgIconColor: "bg-orange-50",
            iconColor: "text-orange-600",
          },
        ]);

        /* ---------- Recent Transactions ---------- */
        setTransactions(
          (data.recentTransactions || []).map((trx) => ({
            id: trx.id ?? "N/A",
            phone: trx.customer ?? "N/A",
            status: trx.status ?? "Unknown",
            date: formatDate(trx.date),
            amount: formatCurrency(trx.amount),
          }))
        );
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError("Failed to load dashboard data.");
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgIconColor={stat.bgIconColor}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>Recent Transactions</CardTitle>
          <Button
            variant="link"
            className="text-blue-600 p-0"
            onClick={() => (window.location.href = "/admin/orders")}
          >
            View All →
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-400">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((trx) => (
                  <tr key={trx.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{trx.id}</td>
                    <td className="px-6 py-4">{trx.phone}</td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(trx.status)}>
                        {trx.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">{trx.date}</td>
                    <td className="px-6 py-4 text-right font-semibold">
                      {trx.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No recent transactions
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
