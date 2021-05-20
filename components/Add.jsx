import { useState } from "react";
import { useAppContext } from "../reducer/Provider";

const Add = () => {
  const [state, dispatch] = useAppContext();
  const [photo, setPhoto] = useState({ label: "", url: "" });
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const { theme } = state;

  const handleChange = (e) => {
    switch (e.target.id) {
      case "label":
        setPhoto({ ...photo, label: e.target.value });
        break;
      case "photoUrl":
        setPhoto({ ...photo, url: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e, setUploading) => {
    setUploading(true);
    e.preventDefault();
    fetch("api/uploads", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    })
      .then((res) => res.json())
      .then((res) => {
        setUploading(false);
        console.log(res)
        if (!res.error) {
          dispatch({
            type: "setImages",
            value: [...state.images, { ...photo, url: res.url }],
          });
          return dispatch({ type: "togglePopup", value: "" });
        }
        setMsg("Error !, please check your url");
      })
      .catch((error) => {
        console.log("Error ! : ", error);
      });
  };
  return (
    <>
      <div className="add">
        <div className={`popup rw-95 fs-20 bgc-${theme} px-30 py-26`}>
          <h2 className={`c-text-${theme} mb-22`}>Add a new photo</h2>
          <form onSubmit={(e) => handleSubmit(e, setUploading)}>
            <div>
              <label htmlFor="label" className={`c-text-${theme} mb-22 `}>
                Label
              </label>
              <input
                type="text"
                name="label"
                id="label"
                required
                minLength={3}
                maxLength={30}
                autoFocus
                className={`c-text-${theme} rw-100 h-16 mb-22 b-2 bc-border-${theme} px-20`}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label htmlFor="photoUrl" className={`c-text-${theme} mb-22`}>
                Photo URL
              </label>
              <input
                type="text"
                name="photoUrl"
                id="photoUrl"
                required
                minLength={5}
                maxLength={200}
                className={`c-text-${theme} rw-100 h-16 mb-10 b-2 bc-border-${theme} px-20`}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="popupBtn">
              <span className={`msg c-danger-${theme}`}>
                {uploading ? (
                  <span className={`loaderContainer bgc-border-${theme} w-30 h-2`}>
                    <span className={`bgc-primary-${theme} w-10 h-2`}></span>
                  </span>
                ) : (
                  msg
                )}
              </span>
              <button
                onClick={() => dispatch({ type: "togglePopup", value: "" })}
                className={`px-25 py-18 mr-10 fs-18 bgc-border-${theme} c-white`}
                type="button"
              >
                Cancel
              </button>
              <button
                disabled={
                  photo.url === "" ||
                  photo.label === "" ||
                  photo.label.length < 3 ||
                  photo.url.length < 3
                }
                type="submit"
                className={`px-25 py-18 fs-18 bgc-primary-${theme} c-white`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .add {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          width: 100%;
          height: 100vh;
          background-color: #00000067;
          z-index: 9999;
        }
        .popup {
          max-width: 620px;
          height: 368px;
          opacity: 1;
          border-radius: 12px;
        }
        form label,
        form input {
          display: block;
        }

        form input,
        button {
          outline: none;
          border-radius: 12px;
        }
        form button {
          cursor: pointer;
          transition: all 0.4s;
        }
        form button:hover {
          filter: brightness(80%);
        }
        form button:disabled {
          background-color: #bdbdbd;
        }
        .popupBtn {
          display: flex;
          justify-content: flex-end;
        }
        form label.photo {
          cursor: pointer;
          display: inline-block;
        }
        .photo:hover {
          text-decoration: underline;
        }
        .msg {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        .loaderContainer {
          display: inline-block;
          position: relative;
          border-radius: 4px;
          overflow: hidden;
        }
        .loaderContainer span {
          position: absolute;
          border-radius: 4px;
          left: -10%;
          animation: loader 0.8s linear infinite;
        }
        @keyframes loader {
          0% {
            left: -10%;
          }
          50% {
            left: 82%;
          }
          100% {
            left: -10%;
          }
        }
      `}</style>
    </>
  );
};

export default Add;
