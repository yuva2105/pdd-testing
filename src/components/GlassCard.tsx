import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}
export function GlassCard({
  children,
  className = '',
  strong = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={`${strong ? 'glass-panel-strong' : 'glass-panel'} rounded-3xl p-5 ${className}`}
      {...props}>
      
      {children}
    </motion.div>);

}