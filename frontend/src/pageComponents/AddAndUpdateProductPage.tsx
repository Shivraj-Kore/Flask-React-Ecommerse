import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const AddAndUpdateProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price:'' });
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
      setNewProduct({ title: '', description: '', price: '' }); // Reset form fields
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
  <>
    <div className="min-h-screen bg-gray-900 text-white p-6">
    <h1 className="text-3xl font-bold mb-6">Hello, this is the Admin's Product Page</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}  
      <div>
        <h3 className="text-2xl font-bold mb-4">Product List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="mb-2">{product.description}</p>
              <p className="font-bold mb-4">Price: ${product.price}</p>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => updateProduct(product.id)}
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 mt-[20px]">
        <h3 className="text-2xl font-bold mb-4">Add Products</h3>
        <form onSubmit={addProduct} className="space-y-4">
          <div>
            <label htmlFor="prodName" className="block text-sm font-medium mb-1">Product Name/Title</label>
            <input
              type="text"
              id="prodName"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
              required
            />
          </div>
          <div>
            <label htmlFor="prodDesc" className="block text-sm font-medium mb-1">Product Description</label>
            <input
              type="text"
              id="prodDesc"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Description"
              required
            />
          </div>
          <div>
            <label htmlFor="prodPrice" className="block text-sm font-medium mb-1">Product Price</label>
            <input
              type="number"
              id="prodPrice"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Price"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  </>
  );
};

export default AddAndUpdateProductPage;
