import OrderStatusManagement from '../../components/Vendor Components/OrderStatusManagement';
import Header from '../../components/Vendor Components/VendorHeader/Header';
import Footer from '../../components/Common Components/Footer';

export default function OrderStatusManagementPage() {
  return (
    <div style={{ paddingTop: '3%' }}>
      <Header />
      <OrderStatusManagement />
      <Footer />
    </div>
  );
}
