export interface RegisterPayload {
  Email: string;
  Password: string;
  PhoneNumber: string;
}
export interface ProductSpecs {
  screen_size: string;
  resolution: string;
  chipset: string;
  ram: string;
  os: string;
  battery_capacity: string;
  charging_tech: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  release_year: number;
  warranty_period: number;
  status?: string;
  provider_id: number;
  color_ids: number[];
  capacity_id: number;
  is_featured: boolean;
  model: string;
  specs: ProductSpecs;
  images: (string | null)[];
}

export interface ProductDetailFilterParams {
  product_id: string;
  color_id: string;
  capacity_id: string;
}
export interface UpdateItemInCart {
  cart_id: string;
  item_id: string;
  quantity: number;
  price: number;
}
export interface DeleteItemInCart{
  cart_id :string;
  item_id :string;
}

export interface UpdateProductPayload {
  id: number;
  name: string;
  model: string;
  description?: string;
  warranty_period?: number;
  release_year?: number;
  is_featured?: boolean;
  status?: string;
  vendor_id: number;
  color_id?: number; // Bắt buộc
  color_ids?: number[];
  capacity_id?: number; // Bắt buộc
  stock_quantity?: number;
  serial_number?: string;
  import_price?: string | number; 
  selling_price: string | number; // Bắt buộc
  specs: {
    screen_size?: string;
    resolution?: string;
    chipset?: string;
    ram?: string;
    os?: string;
    battery_capacity?: string;
    charging_tech?: string;
  };
  image_urls?: string[];
}

export interface CreateVendorsPayload 
{
  vendor_code: string,
  name: string,
  phone: string,
  email: string,
  address: string,
  contact_person_id: number
}

export interface VendorBillItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateVendorBillPayload {
  lotCode: string;
  itemType: string;
  vendorId: number;
  paymentMethod: string;
  orderDate: string;
  orderTime: string;
  status: string;
  note: string;
  items: VendorBillItem[];
}

export interface CreateDiscountsPayload {
  title: string;
  description: string;
  discount_type: "percentage" | "fixed_amount"; 
  discount_value: number;
  start_date: string; 
  end_date: string; 
  is_active: boolean;
}

export interface CreatePurchasePayload {
  LotCode: string;
  ItemType: string;
  VendorId: number;
  PaymentMethod: string;
  OrderDate: string;
  OrderTime: string;
  Status: string;
  Note: string;
  Items: {
    ProductId: number;
    Quantity: number;
    UnitPrice: number;
  }[];

}

export interface ProductDetailFilterParams {
  product_id: string;
  color_id: string;
  capacity_id: string;
}
export interface UpdateItemInCart {
  cart_id: string;
  item_id: string;
  quantity: number;
  price: number;
}
export interface DeleteItemInCart{
  cart_id :string;
  item_id :string;
}