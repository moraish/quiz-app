import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const SigninPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Bear Avatar */}
                <div className="w-40 h-40 mx-auto">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                        {/* Circle background */}
                        <circle cx="100" cy="100" r="90" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" />

                        {/* Bear face */}
                        <circle cx="100" cy="100" r="50" fill="#8B4513" /> {/* Face */}
                        <circle cx="80" cy="85" r="20" fill="#DEB887" /> {/* Left ear */}
                        <circle cx="120" cy="85" r="20" fill="#DEB887" /> {/* Right ear */}

                        {/* Eyes */}
                        {isPasswordFocused ? (
                            <>
                                {/* Covered eyes with paws */}
                                <circle cx="75" cy="100" r="8" fill="#DEB887" /> {/* Left paw */}
                                <circle cx="125" cy="100" r="8" fill="#DEB887" /> {/* Right paw */}
                            </>
                        ) : (
                            <>
                                {/* Open eyes that follow email input */}
                                <g className="transition-transform duration-300">
                                    <circle cx="80" cy="95" r="6" fill="white" /> {/* Left eye white */}
                                    <circle cx="120" cy="95" r="6" fill="white" /> {/* Right eye white */}
                                    <circle
                                        cx={formData.email ? "82" : "80"}
                                        cy="95"
                                        r="3"
                                        fill="black"
                                    /> {/* Left pupil */}
                                    <circle
                                        cx={formData.email ? "122" : "120"}
                                        cy="95"
                                        r="3"
                                        fill="black"
                                    /> {/* Right pupil */}
                                </g>
                            </>
                        )}

                        {/* Nose */}
                        <circle cx="100" cy="110" r="8" fill="black" />

                        {/* Smile */}
                        <path
                            d="M85 120 Q100 130 115 120"
                            fill="none"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
                    <p className="mt-2 text-gray-600">Sign in to continue your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setIsPasswordFocused(false)}
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
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
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

                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 border-gray-300 rounded text-black focus:ring-black"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <a href="/forgot-password" className="text-sm text-black hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center py-3 px-4 bg-black text-white rounded-lg font-medium 
              hover:bg-gray-800 transition-colors duration-300 space-x-2"
                    >
                        <span>Sign in</span>
                        <ArrowRight className="w-5 w-5" />
                    </button>

                    <p className="text-center text-gray-600">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-black font-medium hover:underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SigninPage;