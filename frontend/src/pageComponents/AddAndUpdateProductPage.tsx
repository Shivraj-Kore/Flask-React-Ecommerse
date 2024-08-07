import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const AddAndUpdateProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: 0 });
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


  const updateProduct = async (id: number) => {
    const updatedTitle = prompt("Enter new title:");
    const updatedDescription = prompt("Enter new description:");
    const updatedPrice = prompt("Enter new price:");

    if (updatedTitle && updatedDescription && updatedPrice) {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: updatedTitle,
            description: updatedDescription,
            price: parseFloat(updatedPrice),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update product');
        }

        getAllProducts(); // Refresh the product list
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      getAllProducts(); // Refresh the product list
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      getAllProducts(); // Refresh the product list
      setNewProduct({ title: '', description: '', price: 0 }); // Reset form fields
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: name === 'price' ? parseFloat(value) : value });
  };

  return (
    <div>
        <h1>Hello, this is the admins product page</h1>
        {error && <p>{error}</p>}
        <div>
            <form onSubmit={addProduct}>
                <h3>Add products</h3>
                <label htmlFor="prodName">Product Name/title</label>
                <input type="text" id="prodName" name="title" value={newProduct.title}
                    onChange={handleInputChange} required
                />
                <br />
                <label htmlFor="prodDesc">Product Description</label>
                <input type="text" id="prodDesc" name="description" value={newProduct.description}
                    onChange={handleInputChange} required
                />
                <br />
                <label htmlFor="prodPrice">Product Price</label>
                <input type="number" id="prodPrice" name="price" value={newProduct.price}
                    onChange={handleInputChange} required
                />

                <br />
                <button type="submit">Add Product</button>
                <br />
            </form>
        </div>
        <div>
            <ul>
            {products.map((product) => (
                <li key={product.id}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button type="button" onClick={() => updateProduct(product.id)}>Update Product</button>
                <button type="button" onClick={() => deleteProduct(product.id)}>Delete Product</button>
                </li>
            ))}
            </ul>
        </div>
    </div>
  );
};

export default AddAndUpdateProductPage;
