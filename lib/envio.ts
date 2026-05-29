export type ZonaEnvio = {
  id: 'escobar' | 'amba' | 'bsas-int' | 'otra';
  nombre: string;
  costo: number | null;
  esACoordinar?: boolean;
};

export const ZONAS_ENVIO: ZonaEnvio[] = [
  { id: 'escobar', nombre: 'Escobar y alrededores', costo: 0 }, // TODO confirmar zona y costo real.
  { id: 'amba', nombre: 'AMBA', costo: 0 }, // TODO reemplazar 0 por costo real.
  { id: 'bsas-int', nombre: 'Interior Buenos Aires', costo: 0 }, // TODO reemplazar 0 por costo real.
  { id: 'otra', nombre: 'Otra zona', costo: null, esACoordinar: true }
];

export function getZonaEnvio(id?: string | null) {
  return ZONAS_ENVIO.find((zona) => zona.id === id) ?? null;
}
