import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDisclosure } from '@mantine/hooks'
import { DOCTOR_DEPARTMENTS, DOCTOR_SPECIALIZATIONS } from '../../../Data/DropDownData'
import { getDoctor, updateDoctor } from '../../../Service/DoctorProfileService'
import { formatDate } from '../../../Utility/DateUtil'
import { useForm } from '@mantine/form'
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil'

const Profile = () => {
    const user = useSelector((state: any) => state.user);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [profile, setProfile] = useState<any>({});

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            dob: '' as string | Date, // Fix: Allow both string and Date types
            phone: '',
            address: '',
            licenseNo: '',
            specialization: '',
            department: '',
            totalExperience: 0
        },
    
        validate: {
          dob: (value: any) => !value ? 'Date of Birth is required' : undefined,
          phone: (value: any) => !value ? 'Phone is required' : undefined,
          address: (value: any) => !value ? 'Address is required' : undefined,
          licenseNo: (value: any) => !value ? 'License number is required' : undefined,
        },
    });

    useEffect(() => {
        console.log('🔍 useEffect triggered - User:', user, 'ProfileId:', user?.profileId);
        
        if (user?.profileId) {
            console.log('🚀 Calling getDoctor with ID:', user.profileId);
            getDoctor(user.profileId).then((data) => {
                setProfile(data);
                // Set form values when profile data is loaded
                form.setValues({
                    dob: data.dob ? new Date(data.dob) : '',
                    phone: data.phone || '',
                    address: data.address || '',
                    licenseNo: data.licenseNo || '',
                    specialization: data.specialization || '',
                    department: data.department || '',
                    totalExperience: data.totalExperience || 0 // Fix: Changed from 'experience' to 'totalExperience'
                });
            }).catch((error) => {
                console.log('❌ Error:', error.response?.data || error.message);
            })
        }
    }, [user]);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleSubmit = (values: any) => {
        const validation = form.validate();
        if (validation.hasErrors) {
            errorNotification("Please fix the form errors before submitting");
            return;
        }
    
        updateDoctor({...profile, ...values}).then((data) =>{
            successNotification("Profile updated successfully!")
            setProfile(data);
            setEditMode(false);
        }).catch((error) => {
            console.error('Update failed:', error);
            if (error.response?.status === 401) {
                errorNotification("Session expired. Please login again.");
            // Optional: Redirect to login
            // localStorage.removeItem('token');
            // window.location.href = '/login';
            } else {
                errorNotification(error.response?.data?.error || error.response?.data?.errorMessage || "Update failed");
            }    
        })
    }

    // =========================================================================
    // COMPONENT RENDER
    // =========================================================================

    return (
        <form 
            className='p-10' 
            onSubmit={(e) => {
                e.preventDefault();
                if (editMode) {
                    handleSubmit(form.getValues());
                }
            }}
        >
            
            {/* =================================================================
                PROFILE HEADER SECTION
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
                        onClick={() => {
                            setEditMode(true);
                            // Populate form with current profile data when entering edit mode
                            form.setValues({
                                dob: profile.dob ? new Date(profile.dob) : '',
                                phone: profile.phone || '',
                                address: profile.address || '',
                                licenseNo: profile.licenseNo || '',
                                specialization: profile.specialization || '',
                                department: profile.department || '',
                                totalExperience: profile.totalExperience || 0
                            });
                        }}
                        variant="filled" 
                        leftSection={<IconEdit />}
                    >
                        Edit Profile
                    </Button>
                ) : (
                    // Submit Button - Saves changes and returns to view mode
                    <Button 
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(form.getValues());
                        }}
                        size='lg' 
                        variant="filled"
                    >
                        Submit
                    </Button>
                )}
            </div>

            {/* Section Divider */}
            <Divider my="xl" />

            {/* =================================================================
                PERSONAL INFORMATION SECTION
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
                                        {...form.getInputProps("dob")}
                                        placeholder="Select date of birth"
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
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.address ?? '-'}
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
                                        {...form.getInputProps("licenseNo")}
                                        placeholder='Enter medical license number'
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.licenseNo ?? '-'}
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
                                        {...form.getInputProps("specialization")}
                                        data={DOCTOR_SPECIALIZATIONS} 
                                        placeholder='Specialization'
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.specialization ?? '-'}
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
                                        {...form.getInputProps("department")}
                                        data={DOCTOR_DEPARTMENTS} 
                                        placeholder='Department'
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.department ?? '-'}
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
                                        {...form.getInputProps("totalExperience")} 
                                        placeholder='Enter years of experience' 
                                        min={0} 
                                        max={50}
                                    />
                                </Table.Td>
                            ) : (
                                <Table.Td className='text-xl'>
                                    {profile.totalExperience ?? '-'} years
                                </Table.Td>
                            )}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>

            {/* =================================================================
                PROFILE PICTURE UPLOAD MODAL
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
            </Modal>
       
        </form>
    );
};

export default Profile;