import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconEdit } from '@tabler/icons-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDisclosure } from '@mantine/hooks'
import { DOCTOR_DEPARTMENTS, DOCTOR_SPECIALIZATIONS } from '../../../Data/DropDownData'

/**
 * Mock doctor data object
 * Represents a doctor's profile information with all required fields
 * TODO: Replace with actual API data integration
 */
const doctor: any = {
    name: "John Doe",
    email: "johndoe@example.com",
    dob: "1990-05-15T00:00:00", // ISO format for LocalDateTime compatibility
    phone: "+91-3108501489",
    address: "123, Main Street, Mumbai, India",
    licenseNo: "MED-2020-384756", // Medical council license number
    specialization: "Cardiology", 
    department: "Cardiology Department", 
    totalExperience: 8 // Years of professional experience
}

/**
 * Doctor Profile Component
 * Displays and allows editing of doctor's personal and professional information
 * Features:
 * - View mode: Display formatted doctor information
 * - Edit mode: Form inputs for updating profile data
 * - Profile picture upload functionality
 */
const Profile = () => {
    // =========================================================================
    // STATE MANAGEMENT & HOOKS
    // =========================================================================

    /**
     * Current authenticated user data from Redux store
     * Used for header display (name, email, profile picture)
     */
    const user = useSelector((state: any) => state.user);

    /**
     * Toggle between view and edit modes
     * - false: Display mode (read-only)
     * - true: Edit mode (form inputs enabled)
     */
    const [editMode, setEditMode] = useState<boolean>(false);

    /**
     * Modal state management for profile picture upload
     * Controls visibility of the upload profile picture modal
     */
    const [opened, { open, close }] = useDisclosure(false);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    /**
     * Toggles edit mode and handles form submission
     * TODO: Implement actual form submission logic
     */
    const handleEditToggle = () => {
        if (editMode) {
            // Submit logic would go here
            console.log('Submitting form data...');
        }
        setEditMode(!editMode);
    };

    // =========================================================================
    // COMPONENT RENDER
    // =========================================================================

    return (
        <div className='p-10'>
            
            {/* =================================================================
                PROFILE HEADER SECTION
                Contains profile picture, user info, and edit controls
            ================================================================== */}
            <div className='flex justify-between items-center'>
                
                {/* Left Section: Profile Picture and Basic Info */}
                <div className='flex gap-5 items-center'>
                    
                    {/* Profile Picture with Upload Option */}
                    <div className='flex flex-col items-center gap-3'>
                        <Avatar 
                            variant="filled" 
                            src="/avatar.png" 
                            size={150} 
                            alt="Doctor profile picture" 
                        />
                        {/* Show upload button only in edit mode */}
                        {editMode && (
                            <Button 
                                size='sm' 
                                onClick={open}
                                variant="filled"
                            >
                                Upload Picture
                            </Button>
                        )}
                    </div>

                    {/* Name and Email Display */}
                    <div className='flex flex-col gap-3'>
                        <div className='text-3xl font-medium text-neutral-900'>
                            {user.name}
                        </div>
                        <div className='text-xl text-neutral-700'>
                            {user.email}
                        </div>
                    </div>
                </div>

                {/* Right Section: Edit/Submit Button */}
                {!editMode ? (
                    // Edit Button - Switches to edit mode
                    <Button 
                        size='lg' 
                        onClick={handleEditToggle}
                        variant="filled" 
                        leftSection={<IconEdit />}
                    >
                        Edit Profile
                    </Button>
                ) : (
                    // Submit Button - Saves changes and returns to view mode
                    <Button 
                        size='lg' 
                        onClick={handleEditToggle}
                        variant="filled"
                    >
                        Save Changes
                    </Button>
                )}
            </div>

            {/* Section Divider */}
            <Divider my="xl" />

            {/* =================================================================
                PERSONAL INFORMATION SECTION
                Displays doctor's professional and contact details in table format
            ================================================================== */}
            <div>
                <div className='text-3xl font-medium mb-5 text-neutral-900'>
                    Professional Information
                </div>
                
                <Table 
                    striped 
                    stripedColor="primary.1" 
                    verticalSpacing="md" 
                    withRowBorders={false}
                >
                    <Table.Tbody className="[&>tr]:!mb-3">
                        
                        {/* Date of Birth Row */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl w-1/3'>
                                Date of Birth
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <DateInput
                                        placeholder="Select date of birth"
                                        // TODO: Add value binding and change handler
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {new Date(doctor.dob).toLocaleDateString()}
                                </Table.Td>
                            )}
                        </Table.Tr>
                        
                        {/* Phone Number Row */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                Phone Number
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <NumberInput 
                                        maxLength={10} 
                                        clampBehavior='strict' 
                                        placeholder='Enter phone number' 
                                        hideControls 
                                        // TODO: Add value binding and validation
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {doctor.phone}
                                </Table.Td>
                            )}
                        </Table.Tr>

                        {/* Address Row */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                Address
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <TextInput
                                        placeholder="Enter complete address"
                                        // TODO: Add value binding and change handler
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {doctor.address}
                                </Table.Td>
                            )}
                        </Table.Tr>

                        {/* License Number Row */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                License Number
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <TextInput 
                                        placeholder='Enter medical license number'
                                        // TODO: Add value binding and validation
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {doctor.licenseNo}
                                </Table.Td>
                            )}
                        </Table.Tr>

                        {/* Specialization Row */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                Specialization
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <Select 
                                        data={DOCTOR_SPECIALIZATIONS} placeholder='Specialization'
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {doctor.specialization}
                                </Table.Td>
                            )}
                        </Table.Tr>

                        {/* Department Row */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                Department
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <Select 
                                        data={DOCTOR_DEPARTMENTS} placeholder='Department'
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {doctor.department}
                                </Table.Td>
                            )}
                        </Table.Tr>

                        {/* Total Experience Row */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                Total Experience
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <NumberInput 
                                        placeholder='Enter years of experience' 
                                        min={0} 
                                        max={50}
                                        value={doctor.totalExperience}
                                        onChange={(value) => {
                                            // Update the doctor object with new experience value
                                            const updatedDoctor = {
                                                ...doctor,
                                                totalExperience: Number(value) || 0
                                            };
                                            // TODO: Dispatch to Redux store or update state
                                            console.log('Updated experience:', updatedDoctor.totalExperience);
                                        }}
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {doctor.totalExperience} years
                                </Table.Td>
                            )}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>

            {/* =================================================================
                PROFILE PICTURE UPLOAD MODAL
                Handles profile picture upload functionality
            ================================================================== */}
            <Modal 
                centered 
                opened={opened} 
                onClose={close} 
                title={
                    <span className='text-xl font-medium'>
                        Upload Profile Picture
                    </span>
                }
            >
                {/* TODO: Implement file upload functionality */}
                {/* <div className="p-4">
                    <Text>
                        Profile picture upload functionality to be implemented.
                    </Text>
                    {/* 
                    Suggested implementation:
                    - File input with drag & drop
                    - Image preview
                    - Crop functionality
                    - Upload progress indicator
                    
                </div> */}
            </Modal>
        </div>
    );
};

export default Profile;