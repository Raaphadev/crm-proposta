import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useCrmStore } from '../../crm/store/crmStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function Dashboard() {
  const { deals } = useCrmStore();

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const dealsByStage = {
    labels: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
        <Bar data={salesData} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Deals by Stage</h3>
        <Pie data={dealsByStage} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {deals.slice(0, 5).map((deal) => (
            <div key={deal.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{deal.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(deal.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {deal.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}