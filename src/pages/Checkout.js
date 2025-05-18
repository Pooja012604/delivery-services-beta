import React, { useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Checkout() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ Ensure qty is converted to number before multiplying
  const total = cartItems.reduce((sum, item) => {
    const qty = Number(item.qty) || 1;
    return sum + item.price * qty;
  }, 0);

  const handleProceed = () => {
    navigate('/checkout/details');
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Review Your Order</h2>

      <Table bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Store</th>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => {
            const qty = Number(item.qty) || 1;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.store || '-'}</td>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{qty}</td>
                <td>₹{item.price * qty}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <h4 className="text-end">Total Payable: ₹{total}</h4>

      <div className="text-end mt-3">
        <Button variant="success" onClick={handleProceed}>
          Proceed to Payment
        </Button>
      </div>
    </Container>
  );
}

export default Checkout;
