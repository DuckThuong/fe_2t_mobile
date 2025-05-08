export interface RegisterPayload {
  Email: string;
  Password: string;
  PhoneNumber: string;
}
export interface CreateProductPayload {
  name: string;
  warranty: number;
  color: number;
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