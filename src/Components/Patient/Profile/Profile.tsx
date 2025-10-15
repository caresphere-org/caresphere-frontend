import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BLOOD_GROUPS } from '../../../Data/DropDownData'
import { useDisclosure } from '@mantine/hooks'
import { getPatient } from '../../../Service/PatientProfileService'
import { formatDate } from '../../../Utility/DateUtil'
import { useForm } from '@mantine/form'

/**
 * Mock patient data object
 * Represents a patient's profile information with medical and personal details
 * TODO: Replace with actual API data integration from healthcare system
 */
const patient: any = {
    name: "John Doe",
    email: "johndoe@example.com",
    dob: "1990-05-15", // Date of birth in YYYY-MM-DD format
    phone: "+91-3108501489",
    address: "123, Main Street, Mumbai, India",
    aadharNo: "3804-3434-6453", // Indian identification number
    bloodGroup: "O_NEGATIVE", // Blood group for medical emergencies
    allergies: "Peanuts", // Known allergies for treatment safety
    chronicDisease: "Diabetes" // Long-term health conditions
}

/**
 * Patient Profile Component
 * Displays and allows editing of patient's personal and medical information
 * Features:
 * - View mode: Display formatted patient information
 * - Edit mode: Form inputs for updating profile and medical data
 * - Profile picture upload functionality
 * - Medical information tracking (allergies, chronic diseases)
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

    const [profile, setProfile] = useState<any>({});

    const form = useForm({
            mode: 'uncontrolled',
            initialValues: {
              dob: profile.dob,
              phone: profile.phone,
              address: profile.address,
              aadharNo: profile.aadharNo,
              bloodGroup: profile.bloodGroup,
              allergies: profile.allergies,
              chronicDisease: profile.chronicDisease
            },
        
            validate: {
                dob: (value: any) => !value ? 'Date of Birth is required' : undefined,
                phone: (value: any) => !value ? 'Phone is required' : undefined,
                address: (value: any) => !value ? 'Address is required' : undefined,
                aadharNo: (value: any) => !value ? 'Aadhar number is required' : undefined,
            },
          });

    useEffect(() => {
        getPatient((user.profileId)).then((data) => {
            setProfile(data);
        }).catch((error) => {
            console.log(error); 
        })
    }, [])

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    /**
     * Toggles edit mode and handles form submission
     * TODO: Implement actual form submission logic with API call
     */
    const handleEditToggle = () => {
        if (editMode) {
            // Submit logic would go here - save to backend
            console.log('Submitting patient form data...');
            // TODO: Add API call to update patient information
        }
        setEditMode(!editMode);
    };

    const handleSubmit = (values: any) => {
        console.log(values); 
    }

    // =========================================================================
    // COMPONENT RENDER
    // =========================================================================

    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className='p-10'>
            
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
                            alt="Patient profile picture" 
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
                        type='submit'
                        variant="filled"
                    >
                        Submit
                    </Button>
                )}
            </div>

            {/* Section Divider */}
            <Divider my="xl" />

            {/* =================================================================
                PERSONAL & MEDICAL INFORMATION SECTION
                Displays patient's personal details and medical information
                Critical for healthcare providers during treatment
            ================================================================== */}
            <div>
                <div className='text-3xl font-medium mb-5 text-neutral-900'>
                    Personal & Medical Information
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
                                        {...form.getInputProps("dob")}
                                        placeholder="Select date of birth"
                                        // TODO: Add value binding and change handler
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {formatDate(profile.dob) ?? '-'}
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
                                        {...form.getInputProps("phone")}
                                        maxLength={10} 
                                        clampBehavior='strict' 
                                        placeholder='Enter phone number' 
                                        hideControls 
                                        // TODO: Add value binding and validation
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.phone ?? '-'}
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
                                        {...form.getInputProps("address")}
                                        placeholder="Enter complete address"
                                        // TODO: Add value binding and change handler
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.address ?? '-'}
                                </Table.Td>
                            )}
                        </Table.Tr>

                        {/* Aadhar Number Row */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                Aadhar Number
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <NumberInput 
                                        {...form.getInputProps("aadharNo")}
                                        maxLength={12} 
                                        clampBehavior='strict' 
                                        placeholder='Enter Aadhar number' 
                                        hideControls 
                                        // TODO: Add value binding and validation
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.aadharNo ?? '-'}
                                </Table.Td>
                            )}
                        </Table.Tr>

                        {/* Blood Group Row - Critical Medical Information */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                Blood Group
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <Select 
                                        {...form.getInputProps("bloodGroup")}
                                        data={BLOOD_GROUPS} 
                                        placeholder='Select blood group'
                                        // TODO: Add value binding and change handler
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.bloodGroup ?? '-'}
                                </Table.Td>
                            )}
                        </Table.Tr>

                        {/* Allergies Row - Important for Treatment Safety */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                Allergies
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <TagsInput 
                                        {...form.getInputProps("allergies")}
                                        placeholder='Enter allergies separated by comma'
                                        // TODO: Add value binding and change handler
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.allergies ?? '-'}
                                </Table.Td>
                            )}
                        </Table.Tr>

                        {/* Chronic Diseases Row - Long-term Health Conditions */}
                        <Table.Tr>
                            <Table.Td className='font-semibold text-xl'>
                                Chronic Diseases
                            </Table.Td>
                            {editMode ? (
                                <Table.Td className='text-xl'>
                                    <TagsInput 
                                        {...form.getInputProps("chronicDisease")}
                                        placeholder='Enter chronic diseases separated by comma'
                                        // TODO: Add value binding and change handler
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.chronicDisease ?? '-'}
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
                {/* TODO: Implement file upload functionality for patient profile
                <div className="p-4">
                    <Text>
                        Patient profile picture upload functionality to be implemented.
                    </Text>
                    {/* 
                    Suggested implementation:
                    - File input with drag & drop
                    - Image preview and cropping
                    - File size and format validation
                    - Upload progress indicator
                    - Integration with patient records system
                    
                </div> */}
            </Modal>
    
        </form>
    );
};

export default Profile;