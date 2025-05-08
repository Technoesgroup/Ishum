import React, { useState } from 'react';
import MobileLogin from './MobileLogin';
import MobileSignUp from './SignUp';
import OTPVerify from './MobileOtp';

const AuthModal = ({ onClose }) => {
  const [step, setStep] = useState('login'); // 'login' | 'signup' | 'verify'

  const handleOTP = () => setStep('verify');
  const handleSwitchToSignup = () => setStep('signup');
  const handleSwitchToLogin = () => setStep('login');

  return (
    <>
      {step === 'login' && (
        <MobileLogin
          onClose={onClose}
          onSendOTP={handleOTP}
          onSignupClick={handleSwitchToSignup}
        />
      )}
      {step === 'signup' && (
        <MobileSignUp
          onClose={onClose}
          onSendOTP={handleOTP}
          onLoginClick={handleSwitchToLogin}
        />
      )}
      {step === 'verify' && (
        <OTPVerify onClose={onClose} />
      )}
    </>
  );
};

export default AuthModal;
