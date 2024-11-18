import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, LogIn, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const toast = useToast();
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo@example.com',
      password: 'demo1234',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('Bem-vindo', 'Login realizado com sucesso');
      navigate('/');
    } catch (error) {
      toast.error('Erro', 'Credenciais inválidas. Tente demo@example.com / demo1234');
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-border"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <LogIn className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Entre com suas credenciais para acessar o sistema
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    className="block w-full pl-10 pr-4 py-2.5 text-foreground bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Seu email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full pl-10 pr-12 py-2.5 text-foreground bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Sua senha"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </motion.button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/90 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </motion.button>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card/50 text-muted-foreground">
                    Credenciais de demonstração
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-center text-muted-foreground">
                <p>Email: demo@example.com</p>
                <p>Senha: demo1234</p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}