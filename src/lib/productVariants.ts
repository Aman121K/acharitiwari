export type ProductVariant = {
  id?: string;
  sku: string;
  label: string;
  size?: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  weightKg?: number;
  isActive: boolean;
  inStock: boolean;
  isDefault?: boolean;
};

const placeholder = /^default(?:\s+(?:title|variant))?$/i;

export function customerVariantLabel(input: { label?: unknown; size?: unknown; weightKg?: unknown }): string {
  const label = typeof input.label === 'string' ? input.label.trim() : '';
  const size = typeof input.size === 'string' ? input.size.trim() : '';
  if (label && !placeholder.test(label)) return label;
  if (size && !placeholder.test(size)) return size;
  const weight = Number(input.weightKg);
  if (Number.isFinite(weight) && weight > 0) return weight < 1 ? `${Math.round(weight * 1000)}g` : `${weight}kg`;
  return 'Standard pack';
}

export function customerVariantSize(input: { size?: unknown; weightKg?: unknown }): string | undefined {
  const size = typeof input.size === 'string' ? input.size.trim() : '';
  if (size && !placeholder.test(size)) return size;
  const weight = Number(input.weightKg);
  if (Number.isFinite(weight) && weight > 0) return weight < 1 ? `${Math.round(weight * 1000)}g` : `${weight}kg`;
  return undefined;
}

export function getDefaultVariant(variants: ProductVariant[]): ProductVariant | undefined {
  const active=variants.filter(variant=>variant.isActive!==false);
  const marked=active.find(variant=>variant.isDefault);
  return (marked?.inStock ? marked : undefined) || active.find(variant=>variant.inStock) || marked || active[0];
}

export function getListingPrice(variants: ProductVariant[], fallback:number): number {
  const active=variants.filter(variant=>variant.isActive!==false);
  const purchasable=active.filter(variant=>variant.inStock);
  const candidates=purchasable.length?purchasable:active;
  return candidates.length?Math.min(...candidates.map(variant=>variant.price)):fallback;
}

export function productWithVariant<T extends { variants?: ProductVariant[]; price:number; weight:string; sku?:string; inStock:boolean; inventory?:number; variantSku?:string; variantLabel?:string; variantSize?:string }>(product:T, variant:ProductVariant): T {
  const label=customerVariantLabel(variant);
  return { ...product, price:variant.price, weight:label, sku:variant.sku, inStock:variant.inStock, inventory:variant.inventory, variantSku:variant.sku, variantLabel:label, variantSize:customerVariantSize(variant) };
}
