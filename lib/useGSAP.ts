'use client';

import { DependencyList, RefObject, useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';

type GSAPScope = Element | RefObject<Element | null> | null | undefined;

interface UseGSAPConfig {
  dependencies?: DependencyList;
  scope?: GSAPScope;
}

type UseGSAPOptions = UseGSAPConfig | DependencyList;

const resolveScope = (scope: GSAPScope) => {
  if (!scope) return undefined;
  if (typeof scope === 'object' && 'current' in scope) {
    return scope.current ?? undefined;
  }
  return scope;
};

const isConfig = (value: UseGSAPOptions | undefined): value is UseGSAPConfig => {
  if (!value || Array.isArray(value)) return false;
  return 'dependencies' in value || 'scope' in value;
};

export function useGSAP(callback: () => void | (() => void), options?: UseGSAPOptions) {
  const config = isConfig(options) ? options : undefined;
  const dependencies = Array.isArray(options) ? options : (config?.dependencies ?? []);

  useLayoutEffect(() => {
    const scope = resolveScope(config?.scope);
    const context = gsap.context(() => callback(), scope);
    return () => context.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
