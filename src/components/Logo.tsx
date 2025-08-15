'use client';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Users, Camera } from 'lucide-react';
import LaoFlagIcon from './icons/LaoFlagIcon';
import PartyFlagIcon from './icons/PartyFlagIcon';
import { Button } from './ui/button';

const Logo = () => {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedLogo = localStorage.getItem('customLogo');
    if (savedLogo) {
      setLogoSrc(savedLogo);
    }
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const result = event.target.result as string;
          setLogoSrc(result);
          localStorage.setItem('customLogo', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  const DefaultLogo = () => (
    <div className="flex items-center justify-center gap-2 text-primary">
      <LaoFlagIcon className="h-10 w-10" />
      <div className="flex flex-col items-center">
        <Users className="h-8 w-8" />
        <span className="text-xs font-bold text-primary-foreground">ນສ</span>
      </div>
      <PartyFlagIcon className="h-10 w-10" />
    </div>
  );

  return (
    <div className="relative group">
      {logoSrc ? <img src={logoSrc} alt="Custom Logo" className="h-16 w-auto object-contain" /> : <DefaultLogo />}
      <Button
        variant="ghost"
        size="icon"
        className="absolute inset-0 m-auto h-10 w-10 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100"
        onClick={triggerFileSelect}
      >
        <Camera className="h-5 w-5" />
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default Logo;
