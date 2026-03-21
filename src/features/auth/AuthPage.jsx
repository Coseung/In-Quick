import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { MailOpen } from 'lucide-react'; // Wait, let's use a standard icon

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.replace(/[^0-9]/g, '').length < 10) {
      setError('올바른 전화번호를 입력해주세요.');
      return;
    }
    // Simple pseudo-auth: Just save to local storage and move to editor
    localStorage.setItem('in-quick-auth-phone', phoneNumber);
    navigate('/editor');
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/[^0-9-]/g, '');
    setPhoneNumber(val);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <MailOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">In-Quick</h1>
            <p className="text-gray-500 mt-2">나만의 모바일 초대장을 만들어보세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="전화번호"
              type="tel"
              placeholder="010-0000-0000"
              value={phoneNumber}
              onChange={handlePhoneChange}
              error={error}
              required
            />
            
            <Button type="submit" className="w-full" size="lg">
              시작하기
            </Button>
          </form>
        </div>
        <div className="bg-gray-50 p-4 border-t border-gray-100 text-center text-sm text-gray-500">
          입력하신 정보는 초대장 관리를 위해 사용됩니다.
        </div>
      </div>
    </div>
  );
}
