import { useState, useEffect } from "react";
import { useAppContext } from "../reducer/Provider";

const Images = () => {
  const [state, dispatch] = useAppContext();
  const { theme, images } = state;

  const deleteImage = async (url) => {
    const pwd = prompt("Your password :");
    if (pwd === null) return pwd;
    const res = await fetch("api/delete?url=" + url + "&pwd=" + pwd).then((res) => res.json());
    console.log(res);
    if (res?.error) return alert(res?.message);
    dispatch({ type: "setImages", value: res.img });
    alert("deleted");
  };

  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((img) => {
        dispatch({ type: "setImages", value: img });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <main className={`py-20`}>
        {images ? (
          <ul className="img-container">
            {images.length !== 0 ? (
              images.map((img, i) => {
                return (
                  <li key={i}>
                    <div
                      onClick={() => deleteImage(img.url)}
                      className={`delete c-danger-${theme} b-2 fs-16 py-2 px-11`}
                    >
                      Delete
                    </div>
                    <img src={img.url} alt="" />
                    <div className="label c-white">{img.label}</div>
                  </li>
                );
              })
            ) : (
              <h2 className={`c-text-${theme}`}>No Images found 🌵</h2>
            )}
          </ul>
        ) : (
          <div className="loaderContainer">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </main>
      <style jsx>{`
        main {
          flex: auto;
        }
        .img-container {
          position: relative;
          column-count: 3;
          min-height: 500px;
        }
        .img-container h2 {
          position: absolute;
          left: 50%;
          top: 30%;
          transform: translate(-50%, -50%);
        }
        .img-container li {
          position: relative;
          display: block;
          list-style-type: none;
          margin-bottom: 30px;
        }
        .label,
        .delete {
          position: absolute;
          display: none;
          z-index: 100;
          cursor: pointer;
        }
        .label {
          bottom: 30px;
          left: 24px;
          font-size: 18px;
          font-weight: 700;
        }
        .delete {
          top: 18px;
          right: 18px;
          border-radius: 38px;
          font-weight: 500;
          transition: 0.4s;
        }
        .delete:hover {
          color: #fff;
          background-color: #eb5757;
          border-color: #eb5757;
        }
        .img-container img {
          transition: 0.4s;
        }
        .img-container li:hover img {
          filter: brightness(38%);
        }
        .img-container li:hover .label,
        .img-container li:hover .delete {
          display: block;
        }
        /**LOADER */
        .loaderContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
        }
        .lds-ring {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .lds-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 64px;
          height: 64px;
          margin: 8px;
          border: 8px solid #bdbdbd;
          border-radius: 50%;
          animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: #bdbdbd transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes lds-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        /**RESPONSIVE */
        @media screen and (max-width: 850px) {
          .img-container {
            column-count: 2;
          }
        }
        @media screen and (max-width: 550px) {
          .img-container {
            column-count: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Images;
