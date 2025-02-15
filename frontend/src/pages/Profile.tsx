import { useState } from "react";
import { PencilIcon } from "lucide-react";

interface ProfileField {
    first_name: string;
    last_name: string;
    username: string;
    date_of_birth: string;
    email_id: string;
    country?: string;
    school?: string;
    bio?: string;
}

export default function Profile() {
    const [profile, setProfile] = useState<ProfileField>({
        first_name: "John",
        last_name: "Doe",
        username: "JDoe",
        date_of_birth: "1997-05-15",
        email_id: "john.doe@example.com",
        country: "United States",
        school: "University of Example",
        bio: "Quiz enthusiast and knowledge seeker",
    });

    const [editingFields, setEditingFields] = useState<Set<keyof ProfileField>>(new Set());
    const [tempValues, setTempValues] = useState<Partial<ProfileField>>({});
    const [hasChanges, setHasChanges] = useState(false);

    const handleEdit = (field: keyof ProfileField) => {
        setEditingFields(prev => {
            const newSet = new Set(prev);
            newSet.add(field);
            return newSet;
        });
        setTempValues(prev => ({
            ...prev,
            [field]: profile[field]?.toString() || ""
        }));
    };

    const handleChange = (field: keyof ProfileField, value: string) => {
        setTempValues(prev => ({
            ...prev,
            [field]: value
        }));
        setHasChanges(true);
    };

    const handleUpdate = () => {
        const updatedProfile = { ...profile };
        Object.entries(tempValues).forEach(([field, value]) => {
            updatedProfile[field as keyof ProfileField] = value;

        });
        setProfile(updatedProfile);
        setEditingFields(new Set());
        setTempValues({});
        setHasChanges(false);
    };

    const handleCancel = () => {
        setEditingFields(new Set());
        setTempValues({});
        setHasChanges(false);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isFieldModified = (field: keyof ProfileField) => {
        return tempValues[field] !== undefined &&
            tempValues[field]?.toString() !== profile[field]?.toString();
    };

    const renderField = (field: keyof ProfileField) => (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.split('_').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
            </label>
            {editingFields.has(field) ? (
                <input
                    type={field === 'date_of_birth' ? 'date' : 'text'}
                    className={`w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm
                        ${isFieldModified(field)
                            ? 'border-yellow-300 bg-yellow-50'
                            : 'border-gray-300'}`}
                    value={tempValues[field] || ''}
                    onChange={(e) => handleChange(field, e.target.value)}
                />
            ) : (
                <div className="group flex justify-between items-center py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-900">
                        {field === 'date_of_birth'
                            ? profile[field]
                            : profile[field]}
                    </p>
                    <button
                        onClick={() => handleEdit(field)}
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-150"
                    >
                        <PencilIcon className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-gray-50 py-8 px-4 mt-20">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md">
                    {/* Header */}
                    <div className="px-6 py-4 bg-black text-white rounded-t-lg">
                        <h1 className="text-xl font-semibold">Profile</h1>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left Column - Avatar and Bio */}
                            <div className="md:w-1/3 flex flex-col items-center space-y-6">
                                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 text-2xl font-semibold border-2 border-black">
                                    {profile.first_name[0]}
                                    {profile.last_name[0]}
                                </div>
                                <div className="text-center w-full">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {profile.first_name} {profile.last_name}
                                    </h2>
                                    <p className="text-sm text-gray-600">{profile.username}</p>
                                </div>
                                <div className="w-full h-px bg-gray-200" />
                                <div className="w-full">
                                    {renderField('bio')}
                                </div>
                            </div>

                            {/* Right Column - Profile Fields */}
                            <div className="md:w-2/3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {(Object.keys(profile) as Array<keyof ProfileField>)
                                        .filter(field => field !== 'bio')
                                        .map((field) => (
                                            <div key={field} className="bg-gray-50 p-4 rounded-lg">
                                                {renderField(field)}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Update Button Section */}
                        <div className="mt-8 flex justify-end space-x-4 border-t border-gray-200 pt-6">
                            <button
                                onClick={handleCancel}
                                className={`px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 
                                    transition-colors duration-300 border border-gray-300 rounded-lg
                                    ${!hasChanges && 'opacity-50 cursor-not-allowed'}`}
                                disabled={!hasChanges}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className={`px-6 py-2 bg-black text-white text-sm font-medium rounded-lg 
                                    hover:bg-gray-800 transition-colors duration-300
                                    ${!hasChanges && 'opacity-50 cursor-not-allowed'}`}
                                disabled={!hasChanges}
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}