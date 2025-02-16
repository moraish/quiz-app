import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        organization: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted:', formData);
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
                        "Education is not just about going to school and getting a degree. It's about widening your knowledge and absorbing the truth about life."
                    </p>
                    <p className="text-gray-300 font-medium">
                        - Shakuntala Devi
                    </p>
                </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
                        <p className="mt-2 text-gray-600">Start your journey with us today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                School/Company
                            </label>
                            <input
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${errors.organization ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.organization && (
                                <p className="mt-1 text-red-500 text-sm">{errors.organization}</p>
                            )}
                        </div>

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
                            {errors.email && (
                                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
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
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-3 px-4 bg-black text-white rounded-lg font-medium 
                hover:bg-gray-800 transition-colors duration-300 space-x-2"
                        >
                            <span>Create Account</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <p className="text-center text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-black font-medium hover:underline">
                                Sign in
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;