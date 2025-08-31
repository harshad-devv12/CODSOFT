import React, { useState, useEffect } from 'react';
import { Camera as PhotoCameraIcon, Edit as EditIcon, Save as SaveIcon, X as CancelIcon, Eye as VisibilityIcon, EyeOff as VisibilityOffIcon, User as PersonIcon, Lock as LockIcon, Settings as SettingsIcon, Trash2 as DeleteIcon, Palette as PaletteIcon, Moon as MoonIcon, Sun as SunIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Header from './Header';
import Footer from './Footer';

function Profile() {
  const { user, updateProfile, logout, maintenanceMessage } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    actualName: '',
    gender: '',
    bio: '',
    activityStatus: 'active',
    profilePicture: ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });


  // Deletion state
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.user_metadata?.name || '',
        actualName: user.user_metadata?.actualName || '',
        gender: user.user_metadata?.gender || '',
        bio: user.user_metadata?.bio || '',
        activityStatus: user.user_metadata?.activityStatus || 'active',
        profilePicture: user.user_metadata?.avatar_url || ''
      });
    }
  }, [user]);

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setMessage({ type: 'error', text: 'File size must be less than 5MB' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Update user metadata using the updateProfile method from AuthContext
      await updateProfile({
        name: profileData.name,
        actualName: profileData.actualName,
        gender: profileData.gender,
        bio: profileData.bio,
        activityStatus: profileData.activityStatus,
        avatar_url: profileData.profilePicture
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getActivityStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'busy': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'away': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'offline': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      default: return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
    }
  };

  const getActivityStatusText = (status) => {
    switch (status) {
      case 'active': return '🟢 Active';
      case 'busy': return '🔴 Busy';
      case 'away': return '🟡 Away';
      case 'offline': return '⚫ Offline';
      default: return '🟢 Active';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img src={profileData.profilePicture || '/default-avatar.png'} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <PhotoCameraIcon size={16} />
                  <input type="file" className="hidden" accept="image/*" onChange={handleProfilePictureChange} />
                </label>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {profileData.name || user.email}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-3">
                {user.email}
              </p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getActivityStatusBadgeColor(profileData.activityStatus)}`}>
                {getActivityStatusText(profileData.activityStatus)}
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setMessage({ type: '', text: '' });
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors ${
                  isEditing ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isEditing ? <CancelIcon size={16} /> : <EditIcon size={16} />}
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    logout();
                  }
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-md font-semibold bg-gray-600 hover:bg-gray-700 text-white transition-colors"
              >
                <SettingsIcon size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'}`}>
            {message.text}
          </div>
        )}

        {maintenanceMessage && (
          <div className="mb-6 p-4 rounded-md bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
            {maintenanceMessage}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="border-b dark:border-gray-700">
            <button
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 0 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setActiveTab(0)}
            >
              <PersonIcon size={16} />
              <span>Profile Information</span>
            </button>
            <button
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 1 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setActiveTab(1)}
            >
              <LockIcon size={16} />
              <span>Security</span>
            </button>
            <button
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 2 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setActiveTab(2)}
            >
              <SettingsIcon size={16} />
              <span>Preferences</span>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                  <input
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileInputChange}
                    disabled={!isEditing}
                    placeholder="Enter username"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Actual Name</label>
                  <input
                    name="actualName"
                    value={profileData.actualName}
                    onChange={handleProfileInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your actual name"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleProfileInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Activity Status</label>
                  <select
                    name="activityStatus"
                    value={profileData.activityStatus}
                    onChange={handleProfileInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  >
                    <option value="active">🟢 Active</option>
                    <option value="busy">🔴 Busy</option>
                    <option value="away">🟡 Away</option>
                    <option value="offline">⚫ Offline</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio / Description</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileInputChange}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  />
                </div>
                {isEditing && (
                  <div className="md:col-span-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-2 px-4 py-2 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      disabled={loading}
                    >
                      <SaveIcon size={16} />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                    <input
                      name="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordInputChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-4 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                      {showCurrentPassword ? <VisibilityOffIcon size={16} /> : <VisibilityIcon size={16} />}
                    </button>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                    <input
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-4 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                      {showNewPassword ? <VisibilityOffIcon size={16} /> : <VisibilityIcon size={16} />}
                    </button>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordInputChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-4 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon size={16} /> : <VisibilityIcon size={16} />}
                    </button>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      onClick={handleChangePassword}
                      className={`px-4 py-2 rounded-md font-semibold transition-colors w-full ${
                        loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword
                          ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {loading ? 'Changing Password...' : 'Change Password'}
                    </button>
                  </div>
                </div>
                
                {/* Account Deletion Section */}
                <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold mb-4 text-red-700 dark:text-red-400">Delete Account</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    ⚠️ Warning: Account deletion is permanent. Your account will be deleted after 7 days.
                  </p>
                  <input
                    className="p-2 border border-red-300 dark:border-red-600 rounded-md mb-4 w-full dark:bg-gray-700 dark:text-white"
                    type="text"
                    placeholder="Type DELETE to confirm"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                  />
                  <button
                    disabled={deleteConfirmation !== 'DELETE'}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors w-full justify-center ${
                      deleteConfirmation === 'DELETE'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={async () => {
                      if (window.confirm('Are you absolutely sure? This action cannot be undone.')) {
try {
                          setLoading(true);
                          
                          // Debug logging
                          const sessionToken = user?.session_token || localStorage.getItem('jwtToken');
                          console.log('User object:', user);
                          console.log('Session token from user:', user?.session_token);
                          console.log('Session token from localStorage:', localStorage.getItem('jwtToken'));
                          console.log('Final session token:', sessionToken);
                          console.log('Authorization header:', `Bearer ${sessionToken}`);

                          const response = await fetch('/api/account', {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${sessionToken}`
                            }
                          });
                          
                          console.log('Response status:', response.status);
                          console.log('Response headers:', response.headers);
                          
                          if (!response.ok) {
                            const errorText = await response.text();
                            console.log('Error response:', errorText);
                            throw new Error(`Failed to delete account: ${response.status} ${response.statusText}`);
                          }

                          const result = await response.json();
                          setMessage({ 
                            type: 'success', 
                            text: result.message
                          });
                          setDeleteConfirmation('');

                          // Log the user out after a delay (skip backend logout since account is deleted)
                          setTimeout(() => {
                            // Perform local logout only since the account is already deleted
                            localStorage.removeItem('jwtToken');
                            window.location.href = '/login';
                          }, 3000);
                        } catch (error) {
                          setMessage({ 
                            type: 'error', 
                            text: 'Failed to schedule account deletion. Please try again.' 
                          });
                        } finally {
                          setLoading(false);
                        }
                      }
                    }}
                  >
                    <DeleteIcon size={16} />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6">
                {/* Theme Preferences */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                    <PaletteIcon className="mr-2" size={20} />
                    Theme Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Appearance</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Choose your preferred theme
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm ${theme === 'light' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                          Light
                        </span>
                        <button
                          onClick={toggleTheme}
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                          <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                              theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          >
                            <span className="flex items-center justify-center w-full h-full">
                              {theme === 'light' ? (
                                <SunIcon size={10} className="text-yellow-500" />
                              ) : (
                                <MoonIcon size={10} className="text-blue-600" />
                              )}
                            </span>
                          </span>
                        </button>
                        <span className={`text-sm ${theme === 'dark' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                          Dark
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          theme === 'dark' ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {theme === 'light' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {theme === 'light' ? 'Light Mode' : 'Dark Mode'} Active
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {theme === 'light' 
                              ? 'Perfect for bright environments and daytime use'
                              : 'Easy on the eyes, ideal for low-light conditions'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Account Information</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Account created: {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Last sign in: {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      User ID: {user.id || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Account type: Free Plan
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
