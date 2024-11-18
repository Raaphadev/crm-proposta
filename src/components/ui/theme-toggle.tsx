import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from './button';
import { Dialog } from './dialog';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes = [
    {
      value: 'light',
      label: 'Claro',
      icon: Sun,
      description: 'Tema claro para ambientes bem iluminados'
    },
    {
      value: 'dark',
      label: 'Escuro',
      icon: Moon,
      description: 'Tema escuro para reduzir o cansaço visual'
    },
    {
      value: 'system',
      label: 'Sistema',
      icon: Monitor,
      description: 'Segue as configurações do seu sistema'
    },
  ] as const;

  const currentTheme = themes.find((t) => t.value === theme);
  const Icon = currentTheme?.icon || Sun;

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="w-9 px-0"
        >
          <Icon className="h-5 w-5" />
        </Button>
      </motion.div>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Escolha um tema"
      >
        <div className="grid grid-cols-3 gap-4">
          {themes.map(({ value, label, icon: ThemeIcon, description }) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 hover:bg-accent transition-all duration-200 ${
                theme === value
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent'
              }`}
            >
              <ThemeIcon className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">{label}</span>
              <p className="mt-1 text-xs text-muted-foreground text-center">
                {description}
              </p>
            </motion.button>
          ))}
        </div>
      </Dialog>
    </>
  );
}