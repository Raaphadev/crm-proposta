import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Card } from '../../../components/ui/card';
import { analyticsApi } from '../../../lib/api/analytics';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { formatCurrency } from '../../../lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function AdvancedAnalytics() {
  const [metrics, setMetrics] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [timeframe, setTimeframe] = React.useState<'daily' | 'monthly'>('monthly');

  React.useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await analyticsApi.getDashboardMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to load metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!metrics) return null;

  const revenueData = {
    labels: metrics.metrics[timeframe].labels,
    datasets: [
      {
        label: 'Receita',
        data: metrics.metrics[timeframe].data,
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Receita: ${formatCurrency(context.raw)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => formatCurrency(value)
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total de Negócios</h3>
            <p className="mt-2 text-3xl font-semibold">{metrics.totalDeals}</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Receita Total</h3>
            <p className="mt-2 text-3xl font-semibold">
              {formatCurrency(metrics.totalRevenue)}
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Ticket Médio</h3>
            <p className="mt-2 text-3xl font-semibold">
              {formatCurrency(metrics.averageTicket)}
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Taxa de Conversão</h3>
            <p className="mt-2 text-3xl font-semibold">{metrics.conversionRate}%</p>
          </Card.Content>
        </Card>
      </div>

      <Card>
        <Card.Header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Evolução da Receita</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'daily'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Diário
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'monthly'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Mensal
            </button>
          </div>
        </Card.Header>
        <Card.Content className="p-6">
          <Line data={revenueData} options={options} height={80} />
        </Card.Content>
      </Card>
    </div>
  );
}