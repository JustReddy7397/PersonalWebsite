import { cva } from 'class-variance-authority';

export const paginationContentVariants = cva('flex flex-row items-center gap-1 transition-all duration-300');

export const paginationItemVariants = cva('transition-all duration-200 hover:scale-105');

export const paginationPreviousVariants = cva('gap-1 px-2.5 sm:pl-2.5 transition-all duration-200 hover:translate-x-[-2px]');

export const paginationNextVariants = cva('gap-1 px-2.5 sm:pr-2.5 transition-all duration-200 hover:translate-x-[2px]');

export const paginationEllipsisVariants = cva('flex size-9 items-center justify-center transition-all duration-200 hover:scale-110');

export const paginationVariants = cva('mx-auto flex w-full justify-center transition-all duration-300');
