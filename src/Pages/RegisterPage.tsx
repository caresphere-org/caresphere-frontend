import { Button, PasswordInput, SegmentedControl, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconClockHeart } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import UserService from '../Service/UserService';
import { AxiosError } from 'axios';
import { useState } from 'react';

const RegisterPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Define the form type interface
  interface FormValues {
      role: string;
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  const passwordErrorMessage = "Password must be 8-15 characters, including one uppercase, one lowercase, one number, and one special character (@$!%*?&)";

  const form = useForm<FormValues>({
      
          initialValues: {
            name: '',
            role:"PATIENT",
            email: '',
            password: '',
            confirmPassword: ''
          },
      
          validate: {
            name: (value) => (!value ? "Name is required" : null),
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value: string) => {
                if (!value) return "Password is required";
                return passwordRegex.test(value) ? null : passwordErrorMessage;
            },

            confirmPassword: (value: string, values: FormValues) => (value === values.password ? null : "Passwords don't match")
          },
        });
  
        const handleSubmit = (values: typeof form.values) => {
          setLoading(true);
          UserService.registerUser(values)
            .then((data: any) => {
              console.log(data)
              successNotification("Registered successfully.")
              navigate('/login')
            }).catch((error: AxiosError<any>) => {
              console.log(error)
              const errorMessage = error.response?.data?.errorMessage || "Registration failed! Check server connection and input."
              errorNotification(errorMessage);
            }).finally(() => setLoading(false))
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
          />

           {/* --- Form Inputs --- */}
           <TextInput
              {...form.getInputProps('name')}
              className='transition duration-300'
              variant="unstyled"
              size="md"
              radius="md"
              placeholder="Name"
          />
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
              {...form.getInputProps('confirmPassword')}
              className='transition duration-300'
              variant="unstyled"
              size="md"
              radius="md"
              placeholder="Confirm password"
          />

          {/* --- Actions --- */}
          <Button 
            loading={loading}
            radius="md" 
            size='md' type='submit' 
            color='pink'>
              Register
          </Button>

          <div className='text-neutral-100 text-sm self-center'>Have an account? <Link to="/login" className='hover:underline hover:text-pink-300'>Login</Link></div>
      </form> 

    </div>
  </div>
)
}

export default RegisterPage