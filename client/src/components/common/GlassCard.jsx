import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const GlassCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay }}
    className={cn('glass-panel rounded-[28px] border border-white/50 p-6 shadow-glass', className)}
  >
    {children}
  </motion.div>
);
