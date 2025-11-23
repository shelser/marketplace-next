import { CartItem } from "./cartItems.modal"
import { Product } from "./product.model"

export interface CartContextType {
  isOpen: boolean
  cartItems: CartItem[]
  setIsOpen: (value: boolean) => void
  addCartItem: (product: Product) => void
  deleteCartItem: (produc: Product) => void
  orderSum: number
  countProducts: number
}