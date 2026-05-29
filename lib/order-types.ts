export type CheckoutItem = {
  id: string;
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
};

export type CheckoutContact = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
};

export type FacturaTipo = 'B' | 'A' | 'C';

export type CheckoutFacturacion = {
  tipo: FacturaTipo;
  documento: string;
  nombreFiscal: string;
  condicionIva?: string;
};

export type CheckoutEntrega =
  | {
      metodo: 'retiro';
    }
  | {
      metodo: 'envio';
      zonaId: string;
      direccion: {
        calleNumero: string;
        localidad: string;
        provincia: string;
        codigoPostal: string;
        pisoDepto?: string;
      };
    };

export type CheckoutPayload = {
  contacto: CheckoutContact;
  facturacion: CheckoutFacturacion;
  entrega: CheckoutEntrega;
};

export type StoredOrder = {
  orderId: string;
  createdAt: string;
  status: 'created' | 'approved';
  paymentId?: string;
  notificationSentAt?: string;
  contacto: CheckoutContact;
  facturacion: CheckoutFacturacion;
  entrega: CheckoutEntrega;
  zona?: {
    id: string;
    nombre: string;
    costo: number | null;
    esACoordinar?: boolean;
  };
  items: CheckoutItem[];
  envioItem?: CheckoutItem;
  subtotal: number;
  envioCosto: number | null;
  total: number;
};
