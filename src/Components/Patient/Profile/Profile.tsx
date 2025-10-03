import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconEdit } from '@tabler/icons-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BLOOD_GROUPS } from '../../../Data/DropDownData'
import { useDisclosure } from '@mantine/hooks'

const patient: any = {
    name: "John Doe",
    email: "johndoe@example.com",
    dob: "1990-05-15",
    phone: "+91-3108501489",
    address: "123, Main sTable.Treet, Mumbai, India",
    aadharNo: "3804-3434-6453",
    bloodGroup: "O_NEGATIVE",
    allergies: "Peanuts",
    chronicDisease: "Diabetes"
}
const Profile = () => {

    // Hooks and State Management
    // The current logged-in user details (e.g., for the header) from Redux store.
    const user = useSelector((state:any) => state.user)

    // State to toggle the table between display mode and input/edit mode.
    const [editMode, setEdit] = useState(false);

    const [opened, {open, close}] = useDisclosure(false);

    // --- COMPONENT RENDER ---

  return (
    <div className='p-10'>

        {/* PROFILE HEADER SECTION */}

        <div className='flex justify-between items-center'>
            <div className='flex gap-5 items-center'>

                <div className='flex flex-col items-center gap-3'>
                    <Avatar variant="filled" src="/avatar.png" size={150} alt="it's me" />
                    {editMode && <Button 
                        size='sm' 
                        onClick={open}
                        variant="filled" >
                            Upload
                    </Button>}
                </div>
                
                <div className='flex flex-col gap-3'>
                    <div className='text-3xl font-medium text-neuTable.Tral-900'>{user.name}</div>
                    <div className='text-xl text-neuTable.Tral-700'>{user.email}</div>
                </div>
            </div>

            {/* EDIT/SUBMIT BUTTON */}
            {/* Toggles the editMode state */}

            {!editMode ? 
                <Button 
                    size='lg' 
                    onClick={() => setEdit(true)}
                    variant="filled" 
                    leftSection={<IconEdit/>}>
                        Edit
                </Button> 
            :
                <Button 
                    size='lg' 
                    onClick={() => setEdit(false)}
                    variant="filled" >
                        Submit
                </Button>
            }
    </div>
    
    <Divider my="xl" />

    {/* PERSONAL INFORMATION SECTION */}

    <div>
        <div className='text-3xl font-medium mb-5 text-neuTable.Tral-900'>Personal Information</div>
        <Table striped stripedColor="primary.1" verticalSpacing="md" withRowBorders={false}>

            <Table.Tbody className="[&>tr]:!mb-3">

                {/* Date of Birth */}
                <Table.Tr>
                    <Table.Td className='font-semibold text-xl'>Date of Birth</Table.Td>
                    {editMode ? <Table.Td className='text-xl'>
                        <DateInput
                            placeholder="Date of birth"
                        />
                    </Table.Td> 
                    : 
                    <Table.Td className='text-xl'>{patient.dob}</Table.Td>}
                </Table.Tr>
                
                {/* Phone number */}
                <Table.Tr>
                    <Table.Td className='font-semibold text-xl'>Phone</Table.Td>
                    {editMode ? <Table.Td className='text-xl'>
                        <NumberInput maxLength={10} clampBehavior='strict' placeholder='Phone number' hideControls />
                    </Table.Td> 
                    : 
                    <Table.Td className='text-xl'>{patient.phone}</Table.Td>}
                </Table.Tr>

                {/* Address */}
                <Table.Tr>
                    <Table.Td className='font-semibold text-xl'>Address</Table.Td>
                    {editMode ? <Table.Td className='text-xl'>
                        <TextInput
                            placeholder="Address"/>
                    </Table.Td> 
                    : 
                    <Table.Td className='text-xl'>{patient.address}</Table.Td>}
                </Table.Tr>

                {/* Aadhar number */}
                <Table.Tr>
                    <Table.Td className='font-semibold text-xl'>Aadhar no</Table.Td>
                    {editMode ? <Table.Td className='text-xl'>
                        <NumberInput maxLength={12} clampBehavior='strict' placeholder='Aadhar number' hideControls />
                    </Table.Td> 
                    : 
                    <Table.Td className='text-xl'>{patient.aadharNo}</Table.Td>}
                </Table.Tr>

                {/* Blood Group */}
                <Table.Tr>
                    <Table.Td className='font-semibold text-xl'>Blood Group</Table.Td>
                    {editMode ? <Table.Td className='text-xl'>
                        <Select data={BLOOD_GROUPS} placeholder='Blood group' />
                    </Table.Td> 
                    : 
                    <Table.Td className='text-xl'>{patient.bloodGroup}</Table.Td>}
                </Table.Tr>

                {/* Allergies */}
                <Table.Tr>
                    <Table.Td className='font-semibold text-xl'>Allergies</Table.Td>
                    {editMode ? <Table.Td className='text-xl'>
                        <TagsInput placeholder='Allergies separated by comma' />
                    </Table.Td> 
                    : 
                    <Table.Td className='text-xl'>{patient.allergies || "None"}</Table.Td>}
                </Table.Tr>

                {/* Chronic Diseases */}
                <Table.Tr>
                    <Table.Td className='font-semibold text-xl'>Chronic Disease</Table.Td>
                    {editMode ? <Table.Td className='text-xl'>
                        <TagsInput placeholder='Chronic diseases separated by comma' />
                    </Table.Td> 
                    : 
                    <Table.Td className='text-xl'>{patient.chronicDisease || "None"}</Table.Td>}
                </Table.Tr>
            </Table.Tbody>
        </Table>
    </div>
    <Modal centered opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>
    </div>
  )
}

export default Profile
