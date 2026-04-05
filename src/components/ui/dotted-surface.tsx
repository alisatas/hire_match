'use client';
import { cn } from '@/lib/utils';
import React from 'react';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	return (
		<div
			className={cn('pointer-events-none fixed inset-0 -z-10', className)}
			style={{
				backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
				backgroundSize: '28px 28px',
			}}
			{...props}
		/>
	);
}
