import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
  loading?: boolean;
}

export function Search({ onSearch, loading, className, ...props }: SearchProps) {
  const [value, setValue] = React.useState('');
  const debouncedSearch = useDebounce(onSearch, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full pl-10 pr-4 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
          loading && "pr-10",
          className
        )}
        {...props}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}