import { Button, PasswordInput, SegmentedControl, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconClockHeart } from '@tabler/icons-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { Label } from 'recharts';

const RegisterPage = () => {

    // Define the form type interface
    interface FormValues {
        type: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    const form = useForm<FormValues>({
        
            initialValues: {
              type:"PATIENT",
              email: '',
              password: '',
              confirmPassword: ''
            },
        
            validate: {
              email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
              password: (value: string) => (!value ? "Password is required" : null),
              confirmPassword: (value: string, values: FormValues) => (value == values.password ? null : "Password don't match")
            },
          });
    
          const handleSubmit = (values: typeof form.values) => {
            console.log(values);
          };

          
  return (
    <div style={{background:'url("/bg.jpg")'}} className='h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center'>
        
        {/* ------- logo and name --------- */}
        <div className=" py-3 text-pink-500 flex gap-1 items-center">
            <IconClockHeart size={45} stroke={3} />
        <span className="font-heading font-semibold text-4xl">CareSphere</span>
      </div>

        {/* -------- login form --------- */}
      <div className='w-[450px] backdrop-blur-md p-10 py-8 rounded-lg'>
        <form onSubmit={form.onSubmit(handleSubmit)}
         className='flex flex-col gap-5 
            [&_input]:placeholder-neutral-100 
            [&_input]:pl-2
            [&_input]:text-white
            [&_.mantine-Input-input]:!border-white  
            focus-within:[&_.mantine-Input-input]:!border-pink-400
            [&_svg]:text-white '>

            {/* --- Form Title --- */}
            <div className='self-center font-medium font-heading text-white text-xl'>Register</div>

            {/* Roles */}
            <SegmentedControl 
                {...form.getInputProps("type")}
                fullWidth 
                size="md" 
                radius="md" 
                color='pink'
                bg="none"
                className='[&_*]:!text-white border border-white'
                data={[{label:'Patient', value:'PATIENT'}, {label:'Doctor', value:'DOCTOR'},{label:'Admin', value:'ADMIN'}
                ]} 
            />;

             {/* --- Form Inputs --- */}
            <TextInput
                {...form.getInputProps('email')}
                className='transition duration-300'
                variant="unstyled"
                size="md"
                radius="md"
                placeholder="Email"
            />
            <PasswordInput
                {...form.getInputProps('password')}
                className='transition duration-300'
                variant="unstyled"
                size="md"
                radius="md"
                placeholder="Password"
            />
            <PasswordInput
                {...form.getInputProps('confirmPassword')}
                className='transition duration-300'
                variant="unstyled"
                size="md"
                radius="md"
                placeholder="Confirm password"
            />

            {/* --- Actions --- */}
            <Button radius="md" size='md' type='submit' color='pink'>Register</Button>

            <div className='text-neutral-100 text-sm self-center'>Have an account? <Link to="/login" className='hover:underline hover:text-pink-300'>Login</Link></div>
        </form> 

      </div>
    </div>
  )
}

export default RegisterPage
