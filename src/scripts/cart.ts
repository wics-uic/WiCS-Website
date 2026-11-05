
import tshirt from '../assets/merch/tshirt.png';
import keychain from '../assets/merch/keychain.png';
import crewneck from '../assets/merch/crewneck.png';

export const products = {
  tshirt: {
    name: 'Short Sleeve T-shirt',
    price: 15,
    image: tshirt.src,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  keychain: {
    name: 'WiCS Keychain',
    price: 3,
    image: keychain.src,
    sizes: [] as string[],
  },
  crewneck: {
    name: 'Long Sleeve Crewneck',
    price: 25,
    image: crewneck.src,
    sizes: ['S', 'M', 'L', 'XL'],
  },
};

export type ProductId = keyof typeof products;

export interface CartItem {
  id: ProductId;
  size: string | null;
  quantity: number;
}

const CART_KEY = 'wics-cart';

export function getCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return [];

    const data: unknown = JSON.parse(saved);
    if (!Array.isArray(data)) return [];

    return data.filter((item): item is CartItem => {
      if (!item || typeof item !== 'object') return false;

      const id = item.id as ProductId;
      const product = products[id];

      return Boolean(
        product &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0 &&
        (
          product.sizes.length === 0
            ? item.size === null
            : product.sizes.includes(item.size)
        )
      );
    });
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(
  id: ProductId,
  size: string | null = null
): void {
  const product = products[id];

  if (!product) return;

  if (
    product.sizes.length > 0 &&
    !product.sizes.includes(size ?? '')
  ) {
    return;
  }

  if (product.sizes.length === 0) {
    size = null;
  }

  const cart = getCart();

  const existing = cart.find(
    item => item.id === id && item.size === size
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, size, quantity: 1 });
  }

  saveCart(cart);
}

export function changeQuantity(
  id: ProductId,
  size: string | null,
  change: number
): void {
  const cart = getCart();

  const item = cart.find(
    item => item.id === id && item.size === size
  );

  if (!item) return;

  item.quantity = Math.max(1, item.quantity + change);
  saveCart(cart);
}

export function removeFromCart(
  id: ProductId,
  size: string | null
): void {
  const cart = getCart().filter(
    item => !(item.id === id && item.size === size)
  );

  saveCart(cart);
}
