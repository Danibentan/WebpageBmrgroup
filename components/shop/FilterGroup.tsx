import { ReactNode } from 'react';
export function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return <div className="filter-group"><p className="filter-title">{title}</p>{children}</div>;
}
