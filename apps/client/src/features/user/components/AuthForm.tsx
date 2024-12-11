import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleButton from './GoogleButton';
import PasswordInput from './PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuthForm from '../hooks/useAuthForm';

const AuthForm = () => {
    const { isLogin, fullName, email, username, password, confirmPassword, setFullName, setEmail, setUsername, setPassword, setConfirmPassword, toggleAuthMode, handleSubmit } = useAuthForm();

    return (
        <Card className="w-1/3 bg-gradient-to-br from-black via-gray-900 to-black text-white text-5xl flex-col justify-items-center">
            <CardHeader>
                <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
            </CardHeader>
            <CardContent className='w-4/5'>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <GoogleButton />

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 py-2 mt-4 mb-4 text-black font-semibold text-xl rounded-lg">
                                Or {isLogin ? 'login' : 'sign up'} with email
                            </span>
                        </div>
                    </div>

                    {!isLogin && <Input
                        type="text"
                        placeholder="FullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="bg-gray-700 outline-white border-none text-white placeholder-white py-6 px-4 h-16"
                        style={{fontSize: "2rem" }}
                    />}
                    {!isLogin && <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="bg-gray-700 outline-white border-none text-white placeholder-white py-6 px-4 h-16"
                        style={{fontSize: "2rem" }}
                    />}
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-gray-700 outline-white border-none text-white placeholder-white py-6 px-4 h-16"
                        style={{fontSize: "2rem" }}
                    />
                    <PasswordInput label="Password" value={password} onChange={setPassword} />
                    {!isLogin && <PasswordInput label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />}

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-8 text-2xl">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>

                    <div className="text-center">
                        <span onClick={toggleAuthMode} className="text-white-400 hover:text-gray-300 text-2xl bg-none cursor-pointer">
                            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                        </span>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default AuthForm;
