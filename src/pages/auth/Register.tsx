import { useState } from "react";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/forms/TextInput";
import AuthSwitchLink from "../../components/ui/auth/AuthSwitchLink";
import AuthHeader from "../../components/ui/auth/AuthHeader";
import { register } from "../../services/authService";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register(formData.email, formData.password);

      if (result?.user) {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      console.error("Register Error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md w-full">
      <AuthHeader
        title="Create an account"
        description="Start your 30-day free trial today."
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <TextInput
          label="Full Name"
          placeholder="John Doe"
          required
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v })}
        />

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
          Create An Account
        </Button>
      </form>

      <AuthSwitchLink
        text="Already have an account?"
        linkText="Log in"
        to="/auth/login"
      />
    </div>
  );
};

export default Register;
