'use client';
import { cn } from '@/lib/utils';
import React from 'react';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	return (
		<div className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)} {...props}>
			{/* Base background */}
			<div className="absolute inset-0" style={{ background: 'oklch(0.1 0.02 270)' }} />

			{/* Gradient orbs — give the page depth and energy */}
			<div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-25"
				style={{ background: 'radial-gradient(circle, oklch(0.55 0.28 295) 0%, transparent 70%)', filter: 'blur(60px)' }} />
			<div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
				style={{ background: 'radial-gradient(circle, oklch(0.6 0.24 220) 0%, transparent 70%)', filter: 'blur(70px)' }} />
			<div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full opacity-20"
				style={{ background: 'radial-gradient(circle, oklch(0.62 0.26 180) 0%, transparent 70%)', filter: 'blur(80px)' }} />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
				style={{ background: 'radial-gradient(circle, oklch(0.72 0.2 340) 0%, transparent 70%)', filter: 'blur(60px)' }} />

			{/* Colored dot grid on top */}
			<div className="absolute inset-0"
				style={{
					backgroundImage: 'radial-gradient(circle, oklch(0.68 0.22 295 / 0.18) 1px, transparent 1px)',
					backgroundSize: '28px 28px',
				}} />
		</div>
	);
}
