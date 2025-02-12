import React from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { RadioGroupIndicator } from '@radix-ui/react-radio-group';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }


  return (

    <div>
      <Navbar />
      <div className='flex items-center max-w-7xl justify-center  mx-auto mt-20 ' >
        <form onSubmit={submitHandler} style={{ borderRadius: '8px' }} className='w-1/2 border border-gray-200 rounded-lg p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>


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



          </div>

          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" style={{ backgroundColor: 'black', color: 'white' }} className="w-full my-4">Login</Button>
          }
          
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>SignUp</Link></span>
        </form>

      </div>
    </div>
  );
};

export default Login;
