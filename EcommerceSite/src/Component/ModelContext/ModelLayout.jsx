import { useModal } from './ModelContext';
import Login from '../../Component/B-TO-C-Login/LoginUser';
import Register from '../B-TO-C-Login/RegisterUser';
import AuthModal from '../../Component/B-TO-C-Login/MobileLoginPage/AutoMobile'
import '../../Style-CSS/Navbar.css';

const ModelLayout = () => {
  const {
    showB2UModal,
    setShowB2UModal,
    showLoginModal,
    setShowLoginModal,
    showAuthModal,
    setShowAuthModal,
  } = useModal();

  return (
    <>
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Login setShowB2UModal={setShowB2UModal} setShowLoginModal={setShowLoginModal} />
          </div>
        </div>
      )}
      {showB2UModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="RegisterUser-close-btn" onClick={() => setShowB2UModal(false)}>×</button>
            <Register setShowB2UModal={setShowB2UModal} setShowLoginModal={setShowLoginModal} />
          </div>
        </div>
      )}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

export default ModelLayout;