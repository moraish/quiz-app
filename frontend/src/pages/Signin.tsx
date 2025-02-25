import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();

    // Typed state hooks
    const [formData, setFormData] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Validate form inputs
    const validateForm = (): { [key: string]: string } => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            try {
                await authService.signin(formData);
                navigate('/');
            } catch (error) {
                console.error('Signin failed:', error);
                setErrors({ general: 'Failed to sign in. Please try again.' });
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
                    <h2 className="text-4xl font-bold text-white mb-6">Welcome Back</h2>
                    <p className="text-xl text-gray-200 mb-8">
                        "The beautiful thing about learning is that no one can take it away from you."
                    </p>
                    <p className="text-gray-300 font-medium">- B.B. King</p>
                </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-gray-600">Continue your learning journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <a href="/forgot-password" className="text-sm text-black hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${errors.password ? 'border-red-500' : 'border-gray-300'
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
                            {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4 border-gray-300 rounded text-black focus:ring-black" />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-3 px-4 bg-black text-white rounded-lg font-medium 
                hover:bg-gray-800 transition-colors duration-300 space-x-2"
                        >
                            <span>Sign in</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <p className="text-center text-gray-600">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-black font-medium hover:underline">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;
