'use client';
import { cn } from '@/lib/utils';
import React from 'react';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	return (
		<div className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)} {...props}>
			{/* Page gradient base */}
			<div className="absolute inset-0" style={{
				background: 'linear-gradient(135deg, #0d3525 0%, #0b2d40 50%, #0d2535 100%)'
			}} />

			{/* Coral / salmon — top left */}
			<div className="absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full" style={{
				background: 'radial-gradient(circle, #f97316 0%, #fb7185 60%, transparent 80%)',
				opacity: 0.35,
				filter: 'blur(48px)',
				animation: 'blob-drift-1 22s ease-in-out infinite',
				willChange: 'transform',
			}} />

			{/* Lime green — top right */}
			<div className="absolute -top-16 right-0 w-[480px] h-[480px] rounded-full" style={{
				background: 'radial-gradient(circle, #4ade80 0%, #34d399 60%, transparent 80%)',
				opacity: 0.32,
				filter: 'blur(52px)',
				animation: 'blob-drift-2 28s ease-in-out infinite',
				willChange: 'transform',
			}} />

			{/* Sky blue — mid right */}
			<div className="absolute top-1/3 -right-24 w-[520px] h-[520px] rounded-full" style={{
				background: 'radial-gradient(circle, #38bdf8 0%, #818cf8 60%, transparent 80%)',
				opacity: 0.28,
				filter: 'blur(56px)',
				animation: 'blob-drift-3 18s ease-in-out infinite',
				willChange: 'transform',
			}} />

			{/* Amber / golden — bottom left */}
			<div className="absolute -bottom-24 -left-16 w-[500px] h-[500px] rounded-full" style={{
				background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 60%, transparent 80%)',
				opacity: 0.28,
				filter: 'blur(52px)',
				animation: 'blob-drift-4 25s ease-in-out infinite',
				willChange: 'transform',
			}} />

			{/* Cyan — bottom center */}
			<div className="absolute -bottom-16 left-1/3 w-[440px] h-[440px] rounded-full" style={{
				background: 'radial-gradient(circle, #22d3ee 0%, #06b6d4 60%, transparent 80%)',
				opacity: 0.25,
				filter: 'blur(48px)',
				animation: 'blob-drift-5 20s ease-in-out infinite',
				willChange: 'transform',
			}} />

			{/* Subtle dot grid */}
			<div className="absolute inset-0" style={{
				backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
				backgroundSize: '28px 28px',
			}} />
		</div>
	);
}
