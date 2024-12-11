import React from 'react';
import { Input } from '@/components/ui/input';

interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange }) => (
    <Input
        type="password"
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="bg-gray-700 border-none outline-none  text-white placeholder-white py-6 px-4 h-16"
        style={{fontSize: "2rem" }}
    />
);

export default PasswordInput;
