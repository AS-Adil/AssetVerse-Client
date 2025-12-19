import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../component/loading/Loading";

const COLORS = ["#2563EB", "#EF4444"];

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: assetTypes = [], isLoading: pieLoading } = useQuery({
    queryKey: ["asset-types", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset-types?email=${user.email}`);
      return res.data;
    },
  });

  const { data: topAssets = [], isLoading: barLoading } = useQuery({
    queryKey: ["top-assets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/top-assets?email=${user.email}`);
      return res.data;
    },
  });

  if (pieLoading || barLoading) return <Loading />;

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-secondary">
          Analytics Overview
        </h1>
        <p className="text-neutral text-sm">
          Insights based on your company assets & requests
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Pie Chart Card */}
        <div className="bg-base-200 rounded-2xl shadow-md p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-secondary">
            Asset Type Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetTypes}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {assetTypes.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-base-200 rounded-2xl shadow-md p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-secondary">
              Most Requested Assets
            </h2>
            <p className="text-sm text-neutral">
              Top 5 assets requested by employees
            </p>
          </div>

          <div className="flex-1">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topAssets} barSize={36}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#1E293B", fontSize: 12 }}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="requests"
                  fill="#38BDF8"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Analytics;
