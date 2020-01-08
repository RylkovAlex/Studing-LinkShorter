import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const { request } = useHttp();
  const [link, setLink] = useState("");

  const keyPressHandler = async evt => {
    if (evt.key === "Enter") {
      try {
        const data = await request(
          "api/link/generate",
          "POST",
          {
            from: link
          },
          {
            Authorization: `Bearer ${auth.token}`
          }
        );
        history.push(`/detail/${data._id}`);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="row">
      <h2 className="center">Create new link</h2>
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Введите ссылку"
            value={link}
            id="link"
            type="text"
            name="link"
            onChange={evt => setLink(evt.target.value)}
            onKeyPress={keyPressHandler}
          />
          <label htmlFor="link">Исходная ссылка:</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
