import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false 
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm border border-gray-200',
        hover && 'transition-transform hover:scale-105 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('p-6 pb-0', className)}>
      {children}
    </div>
  )
}

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardContent, CardFooter }