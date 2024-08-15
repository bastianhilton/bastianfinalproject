export const normalizeProduct = (product) => {
    return {
      id: product.productId,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.categoryId,
      images: product.images.map((img) => img.url),
    };
  };
  