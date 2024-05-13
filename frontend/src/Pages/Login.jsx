import React, { useState } from 'react';
import Logo from '../img/logo.png';
import GoogleLogo from '../img/google.svg';
import Background from '../img/login-bg.jpg';

async function SendLogin(email, password, setError) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    } else {
      const data = await response.json();
      //save token in cookie
      document.cookie = `token=${data.token}; path=/;`;
      //go home
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Login failed:', error);
    setError('Invalid email or password');
  }
  
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    SendLogin(email, password, setError);
  };

  return (
    <div className='items-center h-screen grid md:grid-cols-2 bg-no-repeat bg-cover bg-right md:bg-center' style={{ backgroundImage: `url(${Background})` }}>
      <div className=' ml-10 '>
        <div className='w-full max-w-2xl p-8 min-h-[90vh] max-h-[95vh] rounded-[60px] shadow-md backdrop-blur-xl bg-white/30 flex flex-col justify-center'>
          <div className='flex w-full justify-center'>
            <div className='max-w-md w-full'>
              <div>
                <div className='flex items-center text-sm font-semibold text-white gap-4 justify-center mb-10'>
                  <div>
                    <img src={Logo} alt="Logo" className='w-40 rounded-full' />
                  </div>
                </div>

                <h1 className='text-black/50 text-center mb-10 text-2xl font-semibold'>
                  Sign In 
                </h1>
              </div>

              <div className=''>
                <form onSubmit={handleSubmit} className='space-y-3 '>
                  <div> 
                    <div className='mb-2 hidden'>
                      <label htmlFor="email" className='text-xs font-semibold'>Email</label>
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Email'
                      className='w-full backdrop-blur-xl bg-white/30 py-2 px-3 rounded-lg placeholder:text-sm placeholder:text-neutral-500 text-black'
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div>
                    <div className='mb-2 hidden'>
                      <label htmlFor="password" className='text-xs font-semibold'>Password</label>
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Password'
                      className='w-full backdrop-blur-xl bg-white/30 py-2 px-3 rounded-lg placeholder:text-sm placeholder:text-neutral-500 text-black'
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  <div className='text-black text-right text-xs'>
                    <span className='text-black/60'>Forgot your password?</span> Click here
                  </div>

                  <div className='text-red-700' >
                    {error && <p>{error}</p>}
                  </div>

                  <button type="submit" className='w-full bg-blue-600 py-2 px-3 rounded-lg text-white font-semibold text-sm'>Sign In </button>
                </form>

                <div>
                  <div className='text-center my-5 text-black/50'>
                    or
                  </div>

                  <div>
                    <button className='bg-white/60 px-4 py-2 w-fit mx-auto text-xs font-semibold rounded-lg flex items-center gap-2'>
                      <div>
                        <img className='w-6' src={GoogleLogo} alt="" />
                      </div>
                      <span className='text-black'>Sign in with Google</span>
                    </button>
                  </div>

                  <div className='text-xs text-center text-black/50 mt-10 border-t border-neutral-100/30 pt-3'>
                  FitFlex 2024 | All rights reserved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
