import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

// Define the shape of form data
interface FormData {
    firstName: string;
    lastName: string;
    institution: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = () => {
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        institution: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // State for password visibility
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // State for form errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Validate the form and return an error object
    const validateForm = (): Record<string, string> => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            try {
                console.log("Form submitted:", formData);
                await authService.signup(formData);
                navigate("/");
            } catch (error) {
                console.error("Signup failed:", error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-[calc(100vh-50px)] flex">
            {/* Left Side - Background Image and Quote */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 z-10" />
                <img
                    src="/api/placeholder/1000/1000"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 flex flex-col justify-center px-12 w-full">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Join the Future of Interactive Learning
                    </h2>
                    <p className="text-xl text-gray-200 mb-8">
                        "Education is not just about going to school and getting a degree. It's about widening
                        your knowledge and absorbing the truth about life."
                    </p>
                    <p className="text-gray-300 font-medium">- Shakuntala Devi</p>
                </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center mt-12 p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
                        <p className="mt-2 text-gray-600">Start your journey with us today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {["firstName", "lastName"].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field === "firstName" ? "First Name" : "Last Name"}
                                    </label>
                                    <input
                                        name={field}
                                        value={formData[field as keyof FormData]}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${errors[field] ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
                                </div>
                            ))}
                        </div>

                        {["institution", "email"].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field === "institution" ? "School/Company" : "Email address"}
                                </label>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    value={formData[field as keyof FormData]}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${errors[field] ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
                            </div>
                        ))}

                        {["password", "confirmPassword"].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field === "password" ? "Password" : "Confirm Password"}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name={field}
                                        value={formData[field as keyof FormData]}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${errors[field] ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
                            </div>
                        ))}

                        <button type="submit" className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
                            Create Account <ArrowRight className="inline-block ml-2 w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
