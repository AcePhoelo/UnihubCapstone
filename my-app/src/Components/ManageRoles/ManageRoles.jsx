import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ManageRoles.css';
import Edit from '../../assets/edit.png';
import Delete from '../../assets/delete.png';

const ManageRoles = () => {
    const [clubMembers, setClubMembers] = useState([]);
    const [standardRoles, setStandardRoles] = useState([]);
    const [existingRoles, setExistingRoles] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');
    const { club_id } = useParams();
    const navigate = useNavigate();

    const [selectedStandardRole, setSelectedStandardRole] = useState('');
    const [newRoleName, setNewRoleName] = useState('');
    const [selectedNewRoleMembers, setSelectedNewRoleMembers] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    // Function to get authentication headers
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.error('No refresh token found in localStorage');
            return null;
        }
    
        try {
            const response = await fetch('https://54.169.81.75:8000/api/token/refresh/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
    
            const data = await response.json();
            localStorage.setItem('access_token', data.access); // Update the access token
            return data.access;
        } catch (err) {
            console.error('Error refreshing access token:', err);
            return null;
        }
    };
    
    const getAuthHeaders = async () => {
        let token = localStorage.getItem('access_token');
        if (!token) {
            console.warn('Access token missing, attempting to refresh...');
            token = await refreshAccessToken();
            if (!token) {
                alert('You must be logged in to access this page.');
                navigate('/login'); // Redirect to login page
                return null;
            }
        }
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
    };

    // Fetch club members
    const fetchClubMembers = async () => {
        const headers = await getAuthHeaders();
        if (!headers) return;

        try {
            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/members/`, { headers });
            if (!response.ok) {
                throw new Error('Failed to fetch club members');
            }
            const data = await response.json();

            const processedMembers = (data.results || []).map((member) => ({
                id: member.student?.id || member.id,
                full_name: member.student?.full_name || member.full_name || member.name,
                position: member.position || 'Member',
                // Add other needed properties here
            }));

            setClubMembers(processedMembers);
        } catch (err) {
            console.error('Error fetching club members:', err);
            setClubMembers([]);
        }
    };

    // Fetch existing roles
    const fetchExistingRoles = async () => {
        const headers = await getAuthHeaders(); // Await the headers
        if (!headers) return;

        try {
            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/roles/`, { headers });
            if (!response.ok) {
                throw new Error('Failed to fetch club roles');
            }
            const data = await response.json();
            setExistingRoles(data.roles || []);
        } catch (err) {
            console.error('Error fetching club roles:', err);
            setExistingRoles([]);
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.warn('Access token missing, attempting to refresh...');
                const refreshedToken = await refreshAccessToken();
                if (!refreshedToken) {
                    navigate('/login'); // Redirect to login page
                }
            }
        };
    
        checkToken();
    }, []);

    // Fetch data on component mount
    useEffect(() => {
        if (club_id) {
            fetchClubMembers();
            fetchExistingRoles();
        }
    }, [club_id]);

    // Fetch POSITION_CHOICES from the backend
    useEffect(() => {
        const fetchPositionChoices = async () => {
            const headers = await getAuthHeaders(); // Await the headers
            if (!headers) return;
        
            try {
                const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/roles/position_choices/`, {
                    headers,
                });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch position choices');
                }
        
                const data = await response.json();
                setStandardRoles(data.map((choice) => choice.label)); // Use the "label" field
            } catch (err) {
                console.error('Error fetching position choices:', err);
                setStandardRoles([]); // Fallback to an empty array if the fetch fails
            }
        };

        fetchPositionChoices();
    }, []);

    // Handle clicking outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.plus-button')) {
                return;
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Filter available members
    const availableMembers = clubMembers.filter(
        (member) => !selectedNewRoleMembers.includes(member.id)
    );

    const handleSelectMember = (member) => {
        setSelectedNewRoleMembers([...selectedNewRoleMembers, member.id]);
    };

    const handleRemoveSelectedMember = (memberId) => {
        setSelectedNewRoleMembers(selectedNewRoleMembers.filter((id) => id !== memberId));
    };

    const handleAddStandardRole = async () => {
        if (!selectedStandardRole) {
            alert('Please select a role to add');
            return;
        }
    
        const headers = await getAuthHeaders(); // Await the headers
        if (!headers) return;
    
        try {
            const memberIds = selectedNewRoleMembers; // Use selected members
            if (memberIds.length === 0) {
                alert('Please select at least one member');
                return;
            }
    
            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/roles/add/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    role: selectedStandardRole,
                    type: 'standard',
                    members: memberIds, // Include selected members
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add standard role');
            }
    
            const data = await response.json();
            setExistingRoles([...existingRoles, data.role]);
            setSelectedStandardRole('');
            setSelectedNewRoleMembers([]); // Clear selected members
        } catch (err) {
            console.error('Error adding standard role:', err);
            alert('Failed to add role. Please try again.');
        }
    };
    

    // Create custom role
    const handleCreateNewRole = async () => {
        if (!newRoleName) {
            alert('Please enter a role name');
            return;
        }
    
        const headers = await getAuthHeaders(); // Await the headers
        if (!headers) return;
    
        try {
            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/roles/add/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    role: newRoleName,
                    members: selectedNewRoleMembers,
                    type: 'custom',
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create new role');
            }
    
            const data = await response.json();
            setExistingRoles([...existingRoles, data.role]);
            setNewRoleName('');
            setSelectedNewRoleMembers([]);
        } catch (err) {
            console.error('Error creating new role:', err);
            alert('Failed to create role. Please try again.');
        }
    };

    // Function to update a role
    const handleUpdateRole = async (roleId, updatedRoleName) => {
        if (!updatedRoleName) {
            alert('Role name cannot be empty');
            return;
        }
    
        const headers = await getAuthHeaders(); // Await the headers
        if (!headers) return;
    
        try {
            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/roles/${roleId}/update/`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({
                    name: updatedRoleName,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update role');
            }
    
            const data = await response.json();
    
            // Update the existing roles list with the updated role
            setExistingRoles((prevRoles) =>
                prevRoles.map((role) =>
                    role.id === roleId ? { ...role, name: data.name } : role
                )
            );
    
            setEditingIndex(null); // Exit editing mode
        } catch (err) {
            console.error('Error updating role:', err);
            alert('Failed to update role. Please try again.');
        }
    };

    const handleDeleteRole = async (index) => {
        const roleToDelete = existingRoles[index];
        if (!roleToDelete || !roleToDelete.id) {
            console.error('Invalid role to delete');
            return;
        }
    
        const headers = await getAuthHeaders();
        if (!headers) return;
    
        try {
            // Check if the role is a standard role or a custom role
            const roleId = roleToDelete.id;
            const isCustomRole = typeof roleId === 'string' && roleId.startsWith('custom_');
            let url;
            
            if (isCustomRole) {
                // Extract the numeric ID from the custom role ID
                const numericId = roleId.replace('custom_', '');
                url = `https://54.169.81.75:8000/clubs/clubs/${club_id}/roles/${numericId}/delete/`;
            } else {
                // For standard roles or numeric IDs
                url = `https://54.169.81.75:8000/clubs/clubs/${club_id}/roles/${roleId}/delete/`;
            }
    
            console.log(`Sending DELETE request to: ${url}`);
            
            const response = await fetch(url, {
                method: 'DELETE',
                headers,
                body: JSON.stringify({
                    role: roleToDelete.name, // Send the role name for standard roles
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete role: ${response.status} ${response.statusText}`);
            }
    
            setExistingRoles(existingRoles.filter((_, i) => i !== index));
        } catch (err) {
            console.error('Error deleting role:', err);
            alert('Failed to delete role. Please try again.');
        }
    };

    return (
        <div className="manage-roles-page">
            <div className="manage-roles-header">
                <div className="manage-roles-title">Manage Roles</div>
            </div>
            <div className="manage-roles-content">
                {/* Add Role Section */}
                <div className="column add-role">
                    <h2 className="column-title">Add Role</h2>
                    <div className="manage-roles-group">
                        <h3 className="column-subtitle">Choose from Existing</h3>
                        <select
                            value={selectedStandardRole}
                            onChange={(e) => setSelectedStandardRole(e.target.value)}
                            className="manage-roles-custom-dropdown"
                        >
                            <option value="">Select Role</option>
                            {standardRoles.map((role, index) => (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                        <button className="create-role" onClick={handleAddStandardRole}>
                            Add Role
                        </button>
                    </div>
                    <div className="manage-roles-group">
                        <h3 className="column-subtitle">Create New</h3>
                        <input
                            className="manage-roles-name"
                            type="text"
                            placeholder="Name"
                            value={newRoleName}
                            onChange={(e) => setNewRoleName(e.target.value)}
                        />
                        <div className="manage-roles-select-wrapper" ref={dropdownRef}>
                            {selectedNewRoleMembers.length === 0 && (
                                <div className="placeholder-text">Add Members</div>
                            )}
                            {selectedNewRoleMembers.map((id) => {
                                const member = clubMembers.find((m) => m.id === id);
                                if (!member) return null;
                                return (
                                    <div key={id} className="selected-member-chip">
                                        <span>{member.full_name || member.name}</span>
                                        <button onClick={() => handleRemoveSelectedMember(id)}>×</button>
                                    </div>
                                );
                            })}
                            <button
                                className="plus-button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                +
                            </button>
                            {isDropdownOpen && availableMembers.length > 0 && (
                                <div className="manage-roles-dropdown-menu">
                                    {availableMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className="manage-roles-dropdown-item"
                                            onClick={() => {
                                                handleSelectMember(member);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {member.full_name || member.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="create-role" onClick={handleCreateNewRole}>
                            Create Role
                        </button>
                    </div>
                </div>
                {/* Edit Existing Roles Section */}
                <div className="column edit-existing">
                    <h2 className="column-title">Edit Existing</h2>
                    <div className="manage-roles-list">
                        {existingRoles.map((role, index) => (
                            <div className="manage-role-box" key={role.id || index}>
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedRoleName}
                                        onChange={(e) => setEditedRoleName(e.target.value)}
                                        onBlur={() => handleUpdateRole(role.id, editedRoleName)}
                                        autoFocus
                                        className="edit-role-input"
                                    />
                                ) : (
                                    <span className="manage-role-name">{role.name}</span>
                                )}
                                <div className="manage-role-controls">
                                    <button onClick={() => handleDeleteRole(index)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageRoles;