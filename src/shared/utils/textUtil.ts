export const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text;

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export const iconList = [
  { value: "home", label: "Hogar" },
  { value: "hair-dryer", label: "Belleza" },
];
