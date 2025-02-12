import React from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { RadioGroupIndicator } from '@radix-ui/react-radio-group';
import { Button } from '../ui/button';
import { Link,useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { USER_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react';
const Signup = () => {

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const {loading,user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();    //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {

      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
    }
    } catch (error) {
      console.log(error);
       toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false));
    }
  }
  return (

    <div>
      <Navbar />
      <div className='flex items-center max-w-7xl justify-center  mx-auto mt-20 ' >
        <form onSubmit={submitHandler} style={{ borderRadius: '8px' }} className='w-1/2 border border-gray-200 rounded-lg p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>SignUp</h1>
          <div className='my-2'>
            <Label>Fullname</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your Fullname"
              style={{ borderRadius: '6px' }}
            />
          </div>
          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              style={{ borderRadius: '6px' }}
            />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your Email"
              style={{ borderRadius: '6px' }}
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              style={{ borderRadius: '6px' }}
            />
          </div>

          <div className=' flex items-center justify-between gap-10 '>

            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  style={{ borderRadius: '6px' }}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  style={{ borderRadius: '6px' }}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>

            </RadioGroup>

            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
                style={{ borderRadius: '6px' }}
              />
            </div>

          </div>
          
          {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" style={{ backgroundColor: 'black', color: 'white' }} className="w-full my-4">SignUp</Button>
                    }
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>

      </div>
    </div>
  );
};

export default Signup;
