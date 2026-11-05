import { useState, useEffect } from "react";
import { GetAllProducts } from "../Services/ProductService";

function ProductDashBoard() {
  const [products, SetProducts] = useState([]);
  const loadproducts = async () => {
    try {
      const response = await GetAllProducts();
      SetProducts(response.data);
    } catch (error) {
      console.log(error);
      console.log(error?.response.message);
    }
  }
  const Stockvalue = (product) => {
    return product.purchasePrice * product.quantity;
  }
  const PotentialSalesValue = (product) => {
    return product.sellingPrice * product.quantity;
  }
  const PotentialProfit = (product) => {
    return (product.sellingPrice - product.purchasePrice) * product.quantity;
  }
  useEffect(() => {
    loadproducts();
  }, []);
  const TotalStockQuantity = products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
  const TotalInventoryValue = products.reduce((total, product) => {
    return total + (product.quantity * product.purchasePrice);
  }, 0);
  const TotalPotentialProfit = products.reduce((total, product) => {
    return total + ((product.sellingPrice - product.purchasePrice) * product.quantity);
  }, 0);
  return (
    <div className="container-fluid py-4 px-3 px-md-4 bg-light min-vh-100">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Inventory Dashboard</h2>
        <p className="text-secondary mb-0">
          Inventory overview and product performance
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <p className="text-secondary fw-semibold mb-2">Total Products</p>
              <h3 className="fw-bold text-primary mb-0">{products.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <p className="text-secondary fw-semibold mb-2">Total Stock Quantity</p>
              <h3 className="fw-bold text-success mb-0">
                {TotalStockQuantity.toLocaleString("en-IN")}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <p className="text-secondary fw-semibold mb-2">Inventory Value</p>
              <h3 className="fw-bold text-info mb-0">
                ₹{TotalInventoryValue.toLocaleString("en-IN")}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <p className="text-secondary fw-semibold mb-2">Potential Profit</p>
              <h3 className="fw-bold text-success mb-0">
                ₹{TotalPotentialProfit.toLocaleString("en-IN")}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white border-0 px-4 py-3">
          <h5 className="fw-bold mb-1">Product Inventory</h5>
          <p className="text-secondary small mb-0">
            Product details, stock levels and calculated values
          </p>
        </div>
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-white border-0 px-4 py-3">
            <button className="btn btn-success" onClick={loadproducts()}>Refresh data</button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle text-nowrap mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Purchase Price</th>
                  <th className="py-3">Selling Price</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Reorder Level</th>
                  <th className="py-3">Supplier</th>
                  <th className="py-3">Stock Value</th>
                  <th className="py-3">Potential Sales</th>
                  <th className="py-3">Potential Profit</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-4 py-3 fw-semibold text-dark">
                      {product.productName}
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                        {product.category}
                      </span>
                    </td>
                    <td className="text-secondary">
                      ₹{Number(product.purchasePrice).toLocaleString("en-IN")}
                    </td>
                    <td className="fw-semibold text-success">
                      ₹{Number(product.sellingPrice).toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span className="badge bg-primary rounded-pill px-3 py-2">
                        {product.quantity}
                      </span>
                    </td>
                    <td>{product.reorderLevel}</td>
                    <td>{product.supplier}</td>
                    <td className="fw-semibold">
                      ₹{Stockvalue(product).toLocaleString("en-IN")}
                    </td>
                    <td>
                      ₹{PotentialSalesValue(product).toLocaleString("en-IN")}
                    </td>
                    <td className="fw-semibold text-success">
                      ₹{PotentialProfit(product).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer bg-white border-top px-4 py-3">
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="text-secondary small">Total Stock Quantity</div>
                <div className="fw-bold">
                  {TotalStockQuantity.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="text-secondary small">Total Inventory Value</div>
                <div className="fw-bold text-primary">
                  ₹{TotalInventoryValue.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="text-secondary small">Total Potential Profit</div>
                <div className="fw-bold text-success">
                  ₹{TotalPotentialProfit.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDashBoard
