import React from "react";
import { useAppContext } from "../reducer/Provider";

const Footer = () => {
  const [state, dispatch] = useAppContext();
  const { theme } = state;
  return (
    <>
      <footer>
        <div className={`c-text-${theme}`}>
          <a
            className={`c-text-${theme} mx-5`}
            rel="noreferrer"
            href="https://github.com/charo164"
            target="_blank"
          >
            charo164
          </a>
          @
          <a
            className={`c-text-${theme} mx-5`}
            href="https://DevChallenges.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            DevChallenges.io
          </a>
        </div>
      </footer>
      <style jsx>{`
        footer {
          display: flex;
          justify-content: center;
          padding: 20px;
        }
        footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Footer;
