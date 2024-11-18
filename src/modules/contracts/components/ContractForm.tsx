import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, Plus, Upload } from 'lucide-react';

const contractSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  clientName: z.string().min(1, 'Client name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  value: z.number().min(0, 'Value must be positive'),
  content: z.string().min(1, 'Contract content is required'),
  attachments: z.array(z.any()).optional(),
});

type ContractFormData = z.infer<typeof contractSchema>;

export function ContractForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
  });

  const onSubmit = async (data: ContractFormData) => {
    try {
      // Implementation for contract creation
      console.log('Contract data:', data);
    } catch (error) {
      console.error('Failed to create contract:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">New Contract</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contract Title
              <input
                type="text"
                {...register('title')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter contract title"
              />
            </label>
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name
              <input
                type="text"
                {...register('clientName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter client name"
              />
            </label>
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
              <input
                type="date"
                {...register('startDate')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
              <input
                type="date"
                {...register('endDate')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contract Value
              <input
                type="number"
                {...register('value', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter contract value"
              />
            </label>
            {errors.value && (
              <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contract Content
            <textarea
              {...register('content')}
              rows={10}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter contract terms and conditions"
            />
          </label>
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachments
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload files</span>
                    <input
                      type="file"
                      multiple
                      className="sr-only"
                      {...register('attachments')}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
              </div>
            </div>
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Contract
          </button>
        </div>
      </form>
    </div>
  );
}