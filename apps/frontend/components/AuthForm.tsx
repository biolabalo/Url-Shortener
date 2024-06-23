import { useState } from "react";

type AuthFormProps = {
  isSignUp: boolean;
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean
};

export default function AuthForm({ isSignUp, onSubmit, isLoading }: AuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  const validateEmail = () => {
    const emailError = !email ? "Email is required." : !/\S+@\S+\.\S+/.test(email) ? "Email address is invalid." : "";
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
  };

  const validatePassword = () => {
    const passwordError = !password
      ? "Password is required."
      : isSignUp && password.length < 8
      ? "Password must be at least 8 characters."
      : "";
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  const validateConfirmPassword = () => {
    if (isSignUp) {
      const confirmPasswordError = password !== confirmPassword ? "Passwords do not match." : "";
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: confirmPasswordError }));
    }
  };

  const validateForm = (): boolean => {
    validateEmail();
    validatePassword();
    if (isSignUp) validateConfirmPassword();
    return !errors.email && !errors.password && !errors.confirmPassword;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(email, password);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          EMAIL ADDRESS
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            required
            className="block w-full rounded-md border-[1px] border-[#D0D5DD] p-3 text-gray-900 shadow-sm placeholder:text-[#98A2B3] sm:text-sm sm:leading-6 focus:border-[#92B7FE] focus:ring-2 focus:ring-[#92B7FE]"
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            {isSignUp ? "CREATE " : ""}PASSWORD
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            required
            className="block w-full rounded-md border-[1px] border-[#D0D5DD] p-3 text-gray-900 shadow-sm placeholder:text-[#98A2B3] sm:text-sm sm:leading-6 focus:border-[#92B7FE] focus:ring-2 focus:ring-[#92B7FE]"
          />
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
        </div>
      </div>

      {isSignUp && (
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
              CONFIRM PASSWORD
            </label>
          </div>
          <div className="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateConfirmPassword}
              required
              className="block w-full rounded-md border-[1px] border-[#D0D5DD] p-3 text-gray-900 shadow-sm placeholder:text-[#98A2B3] sm:text-sm sm:leading-6 focus:border-[#92B7FE] focus:ring-2 focus:ring-[#92B7FE]"
            />
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-[#3976E8] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? 'Loading' : isSignUp ? "Create Account" : "Log into Account"} 
        </button>
      </div>
    </form>
  );
}
