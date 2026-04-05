'use client';
import { cn } from '@/lib/utils';
import React from 'react';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	return (
		<div className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)} {...props}>
			{/* Base: deep ocean teal */}
			<div className="absolute inset-0" style={{ background: 'oklch(0.13 0.025 195)' }} />

			{/* Coral blob — top left */}
			<div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full"
				style={{ background: 'radial-gradient(circle, #ff7c5c 0%, transparent 70%)', opacity: 0.18, filter: 'blur(72px)' }} />

			{/* Mint / lime blob — top right */}
			<div className="absolute -top-20 right-0 w-[480px] h-[480px] rounded-full"
				style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)', opacity: 0.16, filter: 'blur(80px)' }} />

			{/* Sky blue blob — middle right */}
			<div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full"
				style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)', opacity: 0.18, filter: 'blur(70px)' }} />

			{/* Warm yellow blob — bottom left */}
			<div className="absolute -bottom-32 -left-20 w-[460px] h-[460px] rounded-full"
				style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)', opacity: 0.14, filter: 'blur(80px)' }} />

			{/* Cyan blob — bottom right */}
			<div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full"
				style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)', opacity: 0.14, filter: 'blur(70px)' }} />

			{/* Teal-tinted dot grid */}
			<div className="absolute inset-0"
				style={{
					backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.12) 1px, transparent 1px)',
					backgroundSize: '28px 28px',
				}} />
		</div>
	);
}
