import OrderStatus from '../../components/Common Components/Order';
import Header from '../../components/Common Components/Header';
import Footer from '../../components/Common Components/Footer';

export default function OrderStatusPage() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <OrderStatus />
      <Footer />
    </div>
  );
}
