import { Button, PasswordInput, TextInput } from '@mantine/core'
import { IconClockHeart } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import React from 'react'
import { Link } from 'react-router-dom';


const LoginPage = () => {

    const form = useForm({
    
        initialValues: {
          email: '',
          password: '',
        },
    
        validate: {
          email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value: string) => (!value ? "Password is required" : null)
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
            <div className='self-center font-medium font-heading text-white text-xl'>Login</div>

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

            {/* --- Actions --- */}
            <Button radius="md" size='md' type='submit' color='pink'>Login</Button>

            <div className='text-neutral-100 text-sm self-center'>Don't have an account? <Link to="/register" className='hover:underline hover:text-pink-300'>Register</Link></div>
        </form> 

      </div>
    </div>
  )
}

export default LoginPage
