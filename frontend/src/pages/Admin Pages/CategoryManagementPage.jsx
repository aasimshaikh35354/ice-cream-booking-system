import CategoryManagement from '../../components/Admin Components/CategoryManagement';
import Header from '../../components/Admin Components/AdminHeader/Header';
import Footer from '../../components/Common Components/Footer';

export default function CategoryManagementPage() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <CategoryManagement />
      <Footer />
    </div>
  );
}
