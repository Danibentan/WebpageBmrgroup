'use client';

import { DependencyList, RefObject, useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';

type GSAPScope = Element | RefObject<Element | null> | null | undefined;

interface UseGSAPConfig {
  dependencies?: DependencyList;
  scope?: GSAPScope;
}

const resolveScope = (scope: GSAPScope) => {
  if (!scope) return undefined;
  if (typeof scope === 'object' && 'current' in scope) {
    return scope.current ?? undefined;
  }
  return scope;
};

export function useGSAP(callback: () => void | (() => void), config?: UseGSAPConfig) {
  const dependencies = config?.dependencies ?? [];

  useLayoutEffect(() => {
    const scope = resolveScope(config?.scope);
    const context = gsap.context(() => callback(), scope);
    return () => context.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
