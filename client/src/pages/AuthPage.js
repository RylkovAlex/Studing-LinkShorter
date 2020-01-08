import React, {useState, useEffect, useContext} from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/auth.context";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp();

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {

    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {

    }
  }

  return (
    <div className="row">
      <div className="col s10">
        <h1>LinkShorter ver.1.0</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title" style={{ marginBottom: 25 }}>Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  className="validate yellow-input"
                  placeholder="Введите email"
                  value = {form.email}
                  id="email"
                  type="text"
                  name="email"
                  onChange = {changeHandler}
                />
                <label htmlFor="email">Email:</label>
              </div>
              <div className="input-field">
                <input
                  className="validate yellow-input"
                  value = {form.password}
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  onChange = {changeHandler}
                />
                <label htmlFor="password">Password:</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled = {loading}
              onClick = {loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              disabled = {loading}
              onClick = {registerHandler}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
