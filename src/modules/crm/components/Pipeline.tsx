import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DollarSign, Users, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCrmQueries } from '../hooks/useCrmQueries';
import { LoadingOverlay } from '../../../components/ui/loading-overlay';
import { formatCurrency, formatDate, cn } from '../../../lib/utils';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useToast } from '../../../hooks/useToast';
import type { Deal } from '../types';

interface DealCardProps {
  deal: Deal;
  onDragEnd: (dealId: string, newStageId: string) => void;
}

function DealCard({ deal, onDragEnd }: DealCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'DEAL',
    item: { id: deal.id, type: 'DEAL' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ref={drag}
      className={cn(
        "bg-card backdrop-blur-sm p-4 rounded-lg shadow-sm border border-border cursor-move hover:shadow-md transition-shadow",
        isDragging ? "opacity-50" : ""
      )}
    >
      <h3 className="font-medium text-card-foreground">{deal.title}</h3>
      <div className="mt-2 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{formatCurrency(deal.value, deal.currency)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{deal.company}</span>
        </div>
        {deal.expectedCloseDate && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{formatDate(deal.expectedCloseDate)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PipelineStage({ stage, deals, onDragEnd }: any) {
  const [{ isOver }, drop] = useDrop({
    accept: 'DEAL',
    drop: (item: { id: string }) => {
      onDragEnd(item.id, stage.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={cn(
        "w-[280px] md:w-80 flex-shrink-0 bg-card/50 backdrop-blur-sm rounded-lg p-4",
        isOver ? "bg-accent" : ""
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-foreground truncate">{stage.name}</h3>
        <span
          className={cn(
            "px-2 py-1 text-xs font-medium rounded-full text-white",
            stage.color
          )}
        >
          {deals.length}
        </span>
      </div>
      <div className="space-y-3">
        <AnimatePresence>
          {deals.map((deal: Deal) => (
            <DealCard key={deal.id} deal={deal} onDragEnd={onDragEnd} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Pipeline() {
  const { deals, pipelines, isLoading, moveDeal } = useCrmQueries();
  const defaultPipeline = pipelines[0];
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const toast = useToast();

  const handleDragEnd = (dealId: string, newStageId: string) => {
    const deal = deals.find(d => d.id === dealId);
    const stage = defaultPipeline?.stages.find(s => s.id === newStageId);
    
    if (deal && stage) {
      moveDeal({ dealId, stageId: newStageId });
      toast.success(
        'Negócio movido',
        `${deal.title} foi movido para ${stage.name}`
      );
    }
  };

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-sm p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Pipeline de Vendas</h2>
        </div>
        <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="inline-flex space-x-4 pb-4">
            {defaultPipeline?.stages.map((stage) => (
              <PipelineStage
                key={stage.id}
                stage={stage}
                deals={deals.filter((deal) => deal.stageId === stage.id)}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}