import React from 'react';
import '../../style/pageStyle/searchStyle/JoinWithSocialMedia.scss';
import { LinkedinIcon, FacebkIcon, GoogleIcon, TwitterIcon } from '../../icon';

const JoinWithSocialMedia = () => {
  return (
    <div className="join-with-social-media">
      <h2>Join With Social Media</h2>
      <div className="underline"></div>
      <p className="text-content">
        By creating an account, I agree to Old-Employer{' '}
        <a href="/terms" className="link">Terms of Use</a> and <a href="/privacy" className="link">Privacy Policy</a>.
      </p>
      <div className="social-icons">
        <a href="/auth/linkedin">
          <LinkedinIcon className="icon" />
        </a>
        <a href="/auth/facebook">
          <FacebkIcon className="icon" />
        </a>
        <a href="/auth/google">
          <GoogleIcon className="icon" />
        </a>
        <a href="/auth/twitter">
          <TwitterIcon className="icon" />
        </a>
      </div>
    </div>
  );
};

export default JoinWithSocialMedia;
