import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('jwtToken');

  const getAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err:any) {
      setError(err.message);
    }
  };


  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <h1>Hello, this is the product page</h1>
      {error && <p>{error}</p>}
      <div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
        {/* <button type="button">Delete Product</button> */}
      </div>
    </div>
  );
};

export default ProductPage;
