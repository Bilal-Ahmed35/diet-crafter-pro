import React from 'react';
import { useTranslatedText } from '@/hooks/useTranslatedContent';
import { Skeleton } from '@/components/ui/skeleton';

interface TranslatedTextProps {
  text: string;
  sourceLang?: string;
  enabled?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  showSkeleton?: boolean;
  fallbackToOriginal?: boolean;
  children?: React.ReactNode;
}

export function TranslatedText({
  text,
  sourceLang = 'en',
  enabled = true,
  className = '',
  as: Component = 'span',
  showSkeleton = false,
  fallbackToOriginal = true,
  children,
  ...props
}: TranslatedTextProps & Record<string, any>) {
  const { translatedText, isLoading, originalText } = useTranslatedText(text, {
    sourceLang,
    enabled,
    debounceMs: 200
  });

  // Show skeleton while loading if requested
  if (isLoading && showSkeleton) {
    return <Skeleton className={`h-4 w-full ${className}`} />;
  }

  // Show original text while loading if fallback is enabled
  const displayText = isLoading && fallbackToOriginal ? originalText : translatedText;

  return (
    <Component className={className} {...props}>
      {displayText}
      {children}
    </Component>
  );
}

// Convenience components for common use cases
export function TranslatedHeading({ 
  level = 1, 
  text, 
  className = '', 
  ...props 
}: TranslatedTextProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const HeadingComponent = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <TranslatedText
      as={HeadingComponent}
      text={text}
      className={className}
      showSkeleton={true}
      {...props}
    />
  );
}

export function TranslatedParagraph({ text, className = '', ...props }: TranslatedTextProps) {
  return (
    <TranslatedText
      as="p"
      text={text}
      className={className}
      showSkeleton={true}
      {...props}
    />
  );
}

export function TranslatedButton({ 
  text, 
  className = '', 
  onClick,
  variant,
  ...props 
}: TranslatedTextProps & { 
  onClick?: () => void;
  variant?: string;
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      {...props}
    >
      <TranslatedText text={text} fallbackToOriginal={true} />
    </button>
  );
}