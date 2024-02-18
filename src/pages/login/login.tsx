import { SignInButton } from '@/components/Button';
import './login.scss';
import FigmaLogo from '@assets/images/figma/figma-logo.png';
import GoogleLogo from '@assets/images/google-logo.svg';
import LinkedInLogo from '@assets/images/linkedin-logo.svg';
import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { useDocuments } from '@/store/documents';
import { ModalLoader } from '@/components/Modal/ModalLoader';
import { API_URL } from '@/env';
import { useSearchParams } from 'react-router-dom';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const { userId, setUserId, setIsAuthorized } = useUserStore();

  const paramsUserId = searchParams.get('userId');

  useEffect(() => {
    if (paramsUserId) {
      setUserId(paramsUserId);
    }
  }, [paramsUserId]);

  const { loading, fetchDocuments } = useDocuments();

  const handleVerifyUser = async () => {
    const data = await fetchDocuments(userId!);

    if (data) {
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    handleVerifyUser();
  }, [userId]);

  const googleAuthLink = `${API_URL}/auth/google/`;

  return (
    <section className='home-page'>
      <img src={FigmaLogo} className='home-page__figma-logo' />
      <h1 className='home-page__title'>Sign in to your account</h1>
      <div className='home-page__button-container'>
        <SignInButton
          as='a'
          buttonStyle='secondary'
          className='home-page__button-container_center'
          href={googleAuthLink}
        >
          <img src={LinkedInLogo} alt='LinkedInLogo' width='28px' />
          Sign in with Google
        </SignInButton>
        <SignInButton buttonStyle='secondary' className='home-page__button-container_center'>
          <img src={GoogleLogo} alt='GoogleLogo' width='28px' /> Sign in with Linkedin
        </SignInButton>
        <SignInButton
          as='a'
          buttonStyle='primary'
          className='home-page__button-container_email'
          href={googleAuthLink}
        >
          Sign in with your email
        </SignInButton>
      </div>
      <p className='home-page__create-account'>
        New to Figma?{' '}
        <a href={googleAuthLink} className='home-page__create-account__link'>
          Create an account
        </a>
      </p>
      <ModalLoader isOpen={loading} />
    </section>
  );
};
