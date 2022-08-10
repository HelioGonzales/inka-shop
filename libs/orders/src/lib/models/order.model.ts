import { User } from '@inka-shop/users';
import { OrderItem } from './order-item.model';

export class Order {
  id!: string;
  orderItem?: OrderItem;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: any;
  totalPrice?: string;
  user?: User;
  dateOrdered?: string;
}
