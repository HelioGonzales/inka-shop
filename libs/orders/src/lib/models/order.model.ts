import { User } from '@inka-shop/users';
import { OrderItem } from './order-item.model';

export class Order {
  id!: string;
  // orderItems?: OrderItem[];
  orderItems?: any[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: any;
  totalPrice?: string;
  // user?: User;
  user?: any;
  dateOrdered?: string;
}
