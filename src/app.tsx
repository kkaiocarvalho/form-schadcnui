import './index.css';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Terminal } from 'lucide-react';

const schema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email(),
  company: z.string().min(3, "Company name must be at least 3 characters"),
  dateOfBirth: z.object({
    month: z.string().optional(),
    day: z.string().optional(),
    year: z.string().optional()
  })
})

type FormData = z.infer<typeof schema>;

export function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleSubmit, register, watch, formState, setValue } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const data = watch();

  function onSubmit(data: FormData) {
    setIsSubmitted(true);
    return data;
  }

  return (
    <div className='flex items-center justify-center h-screen w-full bg-zinc-100'>
      <div className='w-full max-w-2xl bg-white shadow rounded-md p-8'>
        <h1 className='text-2xl font-bold text-center'>Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 flex gap-6 flex-col'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>First Name</Label>
              <Input type='text' {...register("firstName")}/>
              {formState.errors.firstName?.message && <p className='text-red-500 text-sm'>{formState.errors.firstName.message}</p>}
            </div>

            <div>
              <Label>Last Name</Label>
              <Input type='text' {...register("lastName")}/>
              {formState.errors.lastName?.message && <p className='text-red-500 text-sm'>{formState.errors.lastName.message}</p>}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>E-mail</Label>
              <Input type='email' {...register("email")}/>
              {formState.errors.email?.message && <p className='text-red-500 text-sm'>Please enter a valid email address</p>}
            </div>

            <div>
              <Label>Company</Label>
              <Input type='text' {...register("company")}/>
              {formState.errors.company?.message && <p className='text-red-500 text-sm'>{formState.errors.company.message}</p>}
            </div>
            </div>
            <div className='grid grid-cols-3 gap-4 items-end'>
              <div>
                <Label>Date of birth</Label>
                <Select onValueChange={(value) => setValue("dateOfBirth.month", value)}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Month' />
                  </SelectTrigger>
                  <SelectContent>
                    {Array(12).fill(1).map((_, index) => { 
                      const value = String(index+1).padStart(2, '0');
                      return (
                      <SelectItem key={String(index)} value={value}>{value}</SelectItem>
                    )})}
                  </SelectContent>
                </Select>
                {formState.errors.dateOfBirth?.month?.message && <p className='text-red-500 text-sm'>Please enter a valid date of birth</p>}
              </div>

              <div>        
                <Select onValueChange={(value) => setValue("dateOfBirth.day", value)}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Day' />
                  </SelectTrigger>
                  <SelectContent>
                  {Array(31).fill(1).map((_, index) => { 
                      const value = String(index+1).padStart(2, '0');
                      return (
                      <SelectItem key={String(index)} value={value}>{value}</SelectItem>
                    )})}
                  </SelectContent>
                </Select>
                {formState.errors.dateOfBirth?.day?.message && <p className='text-red-500 text-sm'>Please enter a valid date of birth</p>}
              </div>

              <div>
                <Select onValueChange={(value) => setValue("dateOfBirth.year", value)}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Year'/>
                  </SelectTrigger>
                  <SelectContent>
                  {Array(150).fill(1).map((_, index) => { 
                      const value = String(index+1901).padStart(4, '0');
                      return (
                      <SelectItem key={String(index)} value={value}>{value}</SelectItem>
                    )})}
                  </SelectContent>
                </Select>
                {formState.errors.dateOfBirth?.year?.message && <p className='text-red-500 text-sm'>Please enter a valid date of birth</p>}
              </div>
            </div>
          <Button className='mt-8' type='submit'>Register</Button>
        </form>
        {isSubmitted && (
          <>
            {/*<h1 className='mt-8 text-sm'>{"First name: " + JSON.stringify(data.firstName)}</h1>
            <h1 className='mt-8 text-sm'>{"Last name: " + JSON.stringify(data.lastName)}</h1>
            <h1 className='mt-8 text-sm'>{"E-mail: " + JSON.stringify(data.email)}</h1>
            <h1 className='mt-8 text-sm'>{"Company: " + JSON.stringify(data.company)}</h1>
            <h1 className='mt-8 text-sm'>{"Month: " + JSON.stringify(data.dateOfBirth?.month)}</h1>
            <h1 className='mt-8 text-sm'>{"Day: " + JSON.stringify(data.dateOfBirth?.day)}</h1>
            <h1 className='mt-8 text-sm'>{"Year: " + JSON.stringify(data.dateOfBirth?.year)}</h1>*/}

            <Alert className='mt-8'>
            <Terminal className="h-4 w-4" />
            <AlertTitle>{"Hello " +  data.firstName + data.lastName}</AlertTitle>
            <AlertDescription>
              {"You have successfully registered with the email address " + data.email + " and the company " + data.company + ". Your date of birth is " + data.dateOfBirth.month + "/" + data.dateOfBirth.day + "/" + data.dateOfBirth.year + "."}
            </AlertDescription>
          </Alert>
          </>
        )}
      </div>
    </div>
  );
}