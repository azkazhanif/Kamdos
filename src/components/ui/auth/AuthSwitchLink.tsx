import { Link } from "react-router";

interface AuthSwitchLinkProps {
  text: string;
  linkText: string;
  to: string;
}

export default function AuthSwitchLink({
  text,
  linkText,
  to,
}: AuthSwitchLinkProps) {
  return (
    <div className="mt-8 text-center">
      <p className="text-slate-500">
        {text}
        <Link
          to={to}
          className="ml-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}
