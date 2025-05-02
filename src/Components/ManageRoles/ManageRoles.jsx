import React, { useState, useEffect, useRef } from 'react';
import './ManageRoles.css';
import Edit from '../../assets/edit.png'
import Delete from '../../assets/delete.png'

const ManageRoles = () => {
    const [clubMembers, setClubMembers] = useState([]);
    const [standardRoles, setStandardRoles] = useState([]);
    const [existingRoles, setExistingRoles] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');

    const [selectedStandardRole, setSelectedStandardRole] = useState('');
    const [newRoleName, setNewRoleName] = useState('');
    const [selectedNewRoleMembers, setSelectedNewRoleMembers] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        fetch('/api/club-members')
            .then((response) => response.json())
            .then((data) => {
                setClubMembers(data.members);
            })
            .catch((err) => {
                console.error(err);
                setClubMembers([
                    { name: "Hans Hartowidjojo", id: "234607" },
                    { name: "Benjamin Smith", id: "234608" },
                    { name: "Emily Johnson", id: "234609" },
                    { name: "Lucas Brown", id: "234610" },
                    { name: "Olivia Wilson", id: "234611" },
                    { name: "Noah Davis", id: "234612" },
                    { name: "Sophia Miller", id: "234613" }
                ]);
            });
    }, []);

    useEffect(() => {
        setStandardRoles([
            'Deputy Leader',
            'Secretary',
            'Treasurer',
            'Event Coordinator',
            'Marketing Manager'
        ]);
    }, []);

    useEffect(() => {
        fetch('/api/club-roles')
            .then((response) => response.json())
            .then((data) => {
                if (data && data.roles && data.roles.length > 0) {
                    setExistingRoles(data.roles);
                } else {
                    setExistingRoles([
                        { id: 1, name: "Vice President", assignedMember: null },
                        { id: 2, name: "Treasurer", assignedMember: { id: "234609", name: "Emily Johnson" } },
                        { id: 101, name: "Event Coordinator", assignedMember: { id: "234609", name: "Emily Johnson" } }
                    ]);
                }
            })
            .catch((err) => {
                console.error(err);
                setExistingRoles([
                    { id: 1, name: "Vice President", assignedMember: null },
                    { id: 2, name: "Treasurer", assignedMember: { id: "234609", name: "Emily Johnson" } },
                    { id: 101, name: "Event Coordinator", assignedMember: { id: "234609", name: "Emily Johnson" } }
                ]);
            });
    }, []);

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

    const availableMembers = clubMembers.filter(
        (member) => !selectedNewRoleMembers.includes(member.id)
    );

    const handleSelectMember = (member) => {
        setSelectedNewRoleMembers([...selectedNewRoleMembers, member.id]);
    };

    const handleRemoveSelectedMember = (memberId) => {
        setSelectedNewRoleMembers(selectedNewRoleMembers.filter((id) => id !== memberId));
    };

    const handleAddStandardRole = () => {
        if (!selectedStandardRole) return;
        fetch('/api/club-roles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                role: selectedStandardRole,
                type: 'standard'
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setExistingRoles([...existingRoles, data.role]);
                setSelectedStandardRole('');
            })
            .catch((err) => console.error(err));
    };

    const handleCreateNewRole = () => {
        if (!newRoleName) return;
        fetch('/api/club-roles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                role: newRoleName,
                members: selectedNewRoleMembers,
                type: 'custom'
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setExistingRoles([...existingRoles, data.role]);
                setNewRoleName('');
                setSelectedNewRoleMembers([]);
            })
            .catch((err) => console.error(err));
    };

    const moveRoleUp = (index) => {
        if (index <= 0) return;

        const updatedRoles = [...existingRoles];
        const temp = updatedRoles[index - 1];
        updatedRoles[index - 1] = updatedRoles[index];
        updatedRoles[index] = temp;

        setExistingRoles(updatedRoles);
    };

    const moveRoleDown = (index) => {
        if (index >= existingRoles.length - 1) return;

        const updatedRoles = [...existingRoles];
        const temp = updatedRoles[index + 1];
        updatedRoles[index + 1] = updatedRoles[index];
        updatedRoles[index] = temp;

        setExistingRoles(updatedRoles);
    };

    const handleStartEditing = (index) => {
        setEditingIndex(index);
        setEditedRoleName(existingRoles[index].name);
    };

    const handleConfirmEdit = () => {
        const updated = [...existingRoles];
        updated[editingIndex].name = editedRoleName;
        setExistingRoles(updated);
        setEditingIndex(null);
    };

    const handleDeleteRole = (index) => {
        const updated = [...existingRoles];
        updated.splice(index, 1);
        setExistingRoles(updated);
    };

    return (
        <div className="manage-roles-page">
            <div className="manage-roles-header">
                <div className="manage-roles-title">Manage Roles</div>
            </div>
            <div className="manage-roles-content">
                {/* Left Column: Add Role */}
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
                        <button className="create-role" onClick={handleAddStandardRole}>Add Role</button>
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
                        {/* Replace the native multiple select with a custom component */}
                        <div className="manage-roles-select-wrapper" ref={dropdownRef}>
                            {selectedNewRoleMembers.length === 0 && (
                                <div className="placeholder-text">Add Members</div>
                            )}

                            {selectedNewRoleMembers.map((id) => {
                                const member = clubMembers.find((m) => m.id === id);
                                if (!member) return null;
                                return (
                                    <div key={id} className="selected-member-chip">
                                        <span>{member.name}</span>
                                        <button onClick={() => handleRemoveSelectedMember(id)}>×</button>
                                    </div>
                                );
                            })}

                            <button
                                className="plus-button"
                                onClick={() => {
                                    setIsDropdownOpen(!isDropdownOpen);
                                }}
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
                                            {member.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="create-role" onClick={handleCreateNewRole}>Create Role</button>
                    </div>
                </div>
                {/* Right Column: Edit Existing */}
                <div className="column edit-existing">
                    <h2 className="column-title">Edit Existing</h2>
                    <div className="manage-roles-list">
                        {existingRoles.map((role, index) => (
                            <div className="manage-role-box">
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedRoleName}
                                        onChange={(e) => setEditedRoleName(e.target.value)}
                                        onBlur={handleConfirmEdit}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleConfirmEdit();
                                            if (e.key === 'Escape') setEditingIndex(null);
                                        }}
                                        autoFocus
                                        className="edit-role-input"
                                    />
                                ) : (
                                    <span className="manage-role-name">{role.name}</span>
                                )}

                                <div className="manage-role-controls">
                                    <button onClick={() => moveRoleUp(index)}>▲</button>
                                    <button onClick={() => moveRoleDown(index)}>▼</button>
                                    <button onClick={() => handleStartEditing(index)} className="icon-button">
                                        <img src={Edit} alt="Edit" className="edit-role" />
                                    </button>
                                    <button onClick={() => handleDeleteRole(index)} className="icon-button">
                                        <img src={Delete} alt="Delete" className="delete-role" />
                                    </button>
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
