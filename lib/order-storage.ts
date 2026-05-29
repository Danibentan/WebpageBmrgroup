import { promises as fs } from 'node:fs';
import path from 'node:path';

import type { StoredOrder } from './order-types';

const STORE_PATH = path.join('/tmp', 'bmr-orders.json');
const globalForOrders = globalThis as typeof globalThis & { __bmrOrders?: Map<string, StoredOrder> };
const memoryOrders = globalForOrders.__bmrOrders ?? new Map<string, StoredOrder>();
globalForOrders.__bmrOrders = memoryOrders;

async function readDiskOrders(): Promise<Record<string, StoredOrder>> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    return JSON.parse(raw) as Record<string, StoredOrder>;
  } catch {
    return {};
  }
}

async function writeDiskOrders(orders: Record<string, StoredOrder>) {
  await fs.writeFile(STORE_PATH, JSON.stringify(orders, null, 2), 'utf8');
}

export async function saveOrder(order: StoredOrder) {
  memoryOrders.set(order.orderId, order);

  // TODO reemplazar este almacenamiento mínimo (/tmp + memoria) por una base durable
  // en producción si se necesita reconciliación garantizada entre funciones serverless.
  const orders = await readDiskOrders();
  orders[order.orderId] = order;
  await writeDiskOrders(orders);
}

export async function getOrder(orderId: string): Promise<StoredOrder | null> {
  const memoryOrder = memoryOrders.get(orderId);
  if (memoryOrder) return memoryOrder;

  const orders = await readDiskOrders();
  const order = orders[orderId] ?? null;
  if (order) memoryOrders.set(orderId, order);
  return order;
}

export async function markOrderApproved(orderId: string, paymentId: string) {
  const order = await getOrder(orderId);
  if (!order) return null;

  const updated: StoredOrder = { ...order, status: 'approved', paymentId };
  await saveOrder(updated);
  return updated;
}

export async function markOrderNotified(orderId: string) {
  const order = await getOrder(orderId);
  if (!order) return null;

  const updated: StoredOrder = { ...order, notificationSentAt: order.notificationSentAt ?? new Date().toISOString() };
  await saveOrder(updated);
  return updated;
}
