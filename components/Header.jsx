import { useAppContext } from "../reducer/Provider";

const Header = () => {
  const [state, dispatch] = useAppContext();
  const { theme } = state;

  const search = async (e) => {
    dispatch({ type: "setImages", value: null });
    const res = await fetch("api/search?q=" + e.target.value).then((res) => res.json());
    if (!res.error) {
      dispatch({ type: "setImages", value: res.img });
    } else {
      dispatch({ type: "setImages", value: [] });
    }
  };

  return (
    <>
      <header className="py-42">
        <div className={`px-12 c-text-${theme}`}>
          <svg
            width="34"
            height="37"
            viewBox="0 0 34 37"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 14.6C18.9096 14.6 20.7409 13.8414 22.0912 12.4911C23.4414 11.1409 24.2 9.30951 24.2 7.39995C24.2 5.49039 23.4414 3.65904 22.0912 2.30878C20.7409 0.958521 18.9096 0.199951 17 0.199951C15.0905 0.199951 13.2591 0.958521 11.9088 2.30878C10.5586 3.65904 9.80001 5.49039 9.80001 7.39995C9.80001 9.30951 10.5586 11.1409 11.9088 12.4911C13.2591 13.8414 15.0905 14.6 17 14.6ZM0.200012 36.2C0.200012 33.9937 0.634557 31.8091 1.47884 29.7709C2.32312 27.7326 3.56059 25.8806 5.12062 24.3206C6.68064 22.7605 8.53266 21.5231 10.5709 20.6788C12.6092 19.8345 14.7938 19.4 17 19.4C19.2062 19.4 21.3908 19.8345 23.4291 20.6788C25.4674 21.5231 27.3194 22.7605 28.8794 24.3206C30.4394 25.8806 31.6769 27.7326 32.5212 29.7709C33.3655 31.8091 33.8 33.9937 33.8 36.2H0.200012Z"
              fill="currentColor"
            />
          </svg>
          <div className="w-53 ml-20 titleContainer">
            <a className={`title fs-20 c-text-${theme}`} href="/">
              My Unsplash
            </a>
            <br />
            <a className={`fs-13 c-text-${theme}`} href="devchallenges.io">
              devchallenges.io
            </a>
          </div>
        </div>
        <div>
          <form>
            <div className={`input b-2 bc-border-${theme}`}>
              <div className="icon w-15 ml-5"></div>
              <input
                className={`py-23 px-10 fs-18 mnw-77 c-text-${theme}`}
                type="search"
                name="search"
                id="search"
                required
                placeholder="Search by name"
                minLength={3}
                onChange={search}
              />
            </div>
          </form>
        </div>

        <div className="btn-container">
          <div className="toggle-theme mr-15">
            <span
              onClick={() => dispatch({ type: "toggleTheme", value: "" })}
              className={`btn-toggle-theme btn-toggle-${theme} px-12 w-15 h-15`}
            ></span>
          </div>
          <button
            onClick={() => dispatch({ type: "togglePopup", value: "" })}
            className={`p-23 fs-18 bgc-primary-${theme} c-white`}
          >
            Add a photo
          </button>
        </div>
      </header>
      <style jsx>{`
        header {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          justify-content: space-between;
        }
        header > div {
          display: flex;
          flex: auto;
        }

        .toggle-theme {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .btn-toggle-theme {
          display: inline-block;
          cursor: pointer;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          background-size: 80%;
        }
        .btn-toggle-light {
          background-image: url("/img/dark_mode_black_24dp.svg");
        }
        .btn-toggle-dark {
          background-image: url("/img/light_mode_black_24dp.svg ");
        }
        .btn-toggle-theme:hover img {
          transform: scale(1.08);
        }

        .icon {
          background-image: url("/img/search_black_24dp.svg");
          background-repeat: no-repeat;
          background-position: 50% 50%;
        }

        .title {
          font-weight: 900;
        }

        .input,
        button {
          outline: none;
          box-shadow: 0px 1px 6px #0000001a;
          border-radius: 12px;
        }
        .input {
          display: flex;
        }
        input[type="search"] {
          outline: none;
          border-radius: 12px;
          filter: none;
        }
        .btn-container {
          justify-content: flex-end;
        }
        button {
          position: relative;
          right: 0;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s;
        }
        button:hover {
          filter: brightness(90%);
        }
        /*responsive */
        @media screen and (max-width: 865px) {
          header {
            grid-template-columns: auto auto;
            grid-template-areas:
              "title btn-add"
              "search search";
          }
          svg {
            width: 25px;
          }
          form {
            margin-top: 10px;
          }
          form,
          form > div {
            width: 100%;
          }
          form input {
            flex: auto;
            padding: 0.8rem 0.5rem;
            font-size: 0.8rem;
          }
          header div:nth-child(1) {
            grid-area: title;
          }
          header div:nth-child(2) {
            grid-area: search;
          }
          header div:nth-child(3) {
            grid-area: btn-add;
          }
        }

        @media screen and (max-width: 458px) {
          .titleContainer {
            width: auto;
          }
          .titleContainer .title {
            font-size: 0.8rem;
          }
          .btn-container button {
            font-size: 0.7rem;
            padding: 0.5rem;
          }
          .btn-toggle-theme {
            width: 2.3rem;
            height: 2.3rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
