import { useState } from "react";
import AuthHeader from "../../components/ui/auth/AuthHeader";
import TextInput from "../../components/ui/forms/TextInput";
import Button from "../../components/ui/Button";
import AuthSwitchLink from "../../components/ui/auth/AuthSwitchLink";
import { login } from "../../services/authService";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(formData.email, formData.password);

      if (result?.aud) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Register Error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md w-full">
      <AuthHeader
        title="Welcome Back!"
        description="Enter your details to access your workspace."
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <TextInput
          label="Email"
          placeholder="john@mail.com"
          type="email"
          required
          value={formData.email}
          onChange={(v) => setFormData({ ...formData, email: v })}
        />

        <TextInput
          label="Password"
          placeholder="John Doe"
          type="password"
          required
          value={formData.password}
          onChange={(v) => setFormData({ ...formData, password: v })}
        />

        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>

      <AuthSwitchLink
        text="Don't have an account?"
        linkText="Register"
        to="/auth/register"
      />
    </div>
  );
};

export default Login;
