import { useState } from "react";

import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const { login, isLoading, error: authError } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      email: null,
      password: null,
    };

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
          setErrors({ email: null, password: null });
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* EMAIL */}
      <FormRowVertical label="Email address" error={errors.email}>
        <Input
          type="email"
          id="email" // ✅ required for FormRowVertical
          autoComplete="username"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email)
              setErrors((prev) => ({ ...prev, email: null }));
          }}
          disabled={isLoading}
        />
      </FormRowVertical>

      {/* PASSWORD */}
      <FormRowVertical label="Password" error={errors.password}>
        <Input
          type="password"
          id="password" // ✅ required for FormRowVertical
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: null }));
          }}
          disabled={isLoading}
        />
      </FormRowVertical>

      {/* AUTH ERROR (no label → safe) */}
      {authError && (
        <FormRowVertical>
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            {authError.message}
          </p>
        </FormRowVertical>
      )}

      {/* BUTTON ROW (NO label) */}
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

