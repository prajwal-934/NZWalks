import React, { useState } from 'react';
import { TextField, PrimaryButton, Stack } from '@fluentui/react';
import { loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

interface LoginForm {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginForm>({ username: '', password: '' });

    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        const { name } = event.currentTarget;
        setForm((prev) => ({ ...prev, [name]: newValue || '' }));
    };

    const handleSubmit = async () => {
        try {
            const result = await loginUser(form);
            login(result.jwtToken);
            console.log(result)
            navigate('/home');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <>
            <Header />
            <Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300, margin: 'auto', paddingTop: 100 } }}>
                <h2>Login</h2>
                <TextField label="Email" name="username" onChange={handleChange} />
                <TextField label="Password" name="password" type="password" onChange={handleChange} />
                <PrimaryButton text="Login" onClick={handleSubmit} />
            </Stack>
        </>
    );
};

export default Login;
