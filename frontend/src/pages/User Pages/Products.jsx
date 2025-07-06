import Products from '../../components/Common Components/Products';
import Header from '../../components/Common Components/Header';
import Footer from '../../components/Common Components/Footer';

export default function ProductPage() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <Products />
      <Footer />
    </div>
  );
}
