import React, { useState } from "react";
import { toast } from "react-toastify";
import { shortenURLs } from "../../services";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder: string;
  required?: boolean;
  addon?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  addon,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2" htmlFor={label}>
      {label}
    </label>
    <div className="flex items-center border rounded-md overflow-hidden">
      {addon && (
        <div className="bg-gray-200 text-gray-700 px-3 flex h-10 items-center">
          {addon}
        </div>
      )}
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2 border-0 focus:outline-none ${addon ? "" : "bg-[#F9FAFB]"}`}
        placeholder={placeholder}
        required={required}
      />
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

interface UrlShortenerProps {
  onNewUrlCreated: () => void;
}

const UrlShortener: React.FC<UrlShortenerProps> = ({ onNewUrlCreated }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name?: string; website?: string }>({});

  const resetForm = () => {
    setName("");
    setWebsite("");
    setDescription("");
    setErrors({});
  };

  const validateName = () => {
    const nameError = !name ? "Name is required." : "";
    setErrors((prevErrors) => ({ ...prevErrors, name: nameError }));
  };

  const validateWebsite = () => {
    const websiteError = !website
      ? "Website is required."
      : !/^\S+\.\S+\.\S+$/.test(website)
        ? "Website address is invalid."
        : "";
    setErrors((prevErrors) => ({ ...prevErrors, website: websiteError }));
  };

  const validateForm = (): boolean => {
    validateName();
    validateWebsite();
    return !errors.name && !errors.website;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      try {
         await shortenURLs(name, website, description);
        resetForm()
        onNewUrlCreated();
        toast.success('URL created')
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="bg-white p-8 rounded w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Shorten URL</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={validateName}
            placeholder="Input name"
            required
            error={errors.name}
          />
          <InputField
            label="Website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            onBlur={validateWebsite}
            placeholder="www.placeholder.com"
            addon="http://"
            required
            error={errors.website}
          />
          <InputField
            label="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Input description"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3976E8] text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
           {isLoading ? 'Loading' : 'Shorten URL' }  
          </button>
        </form>
      </div>
    </div>
  );
};

export default UrlShortener;
