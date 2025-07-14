import React, { useState } from 'react';
import {
  TextField,
  PrimaryButton,
  Stack,
  Dropdown
} from '@fluentui/react';
import type { IDropdownOption, IDropdownStyles } from '@fluentui/react';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

interface RegisterForm {
  username: string;
  password: string;
  roles: string[];
}

const roleOptions: IDropdownOption[] = [
  { key: 'Reader', text: 'Reader' },
  { key: 'Writer', text: 'Writer' },

];

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    password: '',
    roles: [],
  });

  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    const { name } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: newValue || '' }));
  };

  const handleRoleChange = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    const newRoles = form.roles.includes(option!.key as string)
      ? form.roles.filter((r) => r !== option!.key)
      : [...form.roles, option!.key as string];
    setForm((prev) => ({ ...prev, roles: newRoles }));
  };

  const handleSubmit = async () => {
    try {
      await registerUser(form);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
      console.log(error);
    }
  };

  return (
    <>
    <Header/>
    <Stack
      tokens={{ childrenGap: 15 }}
      styles={{ root: { width: 320, margin: 'auto', paddingTop: 80 } }}
    >
      <h2>Register</h2>
      <TextField label="Username (Email)" name="username" onChange={handleChange} />
      <TextField label="Password" name="password" type="password" onChange={handleChange} />
      <Dropdown
        label="Roles"
        placeholder="Select roles"
        multiSelect
        options={roleOptions}
        selectedKeys={form.roles}
        onChange={handleRoleChange}
        styles={dropdownStyles}
      />
      <PrimaryButton text="Register" onClick={handleSubmit} />
    </Stack>
    </>
  );
};

export default Register;
