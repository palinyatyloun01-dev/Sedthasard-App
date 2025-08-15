'use client';

import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { useLanguage } from '@/context/language-context';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { translations, language, setLanguage } = useLanguage();

  // Set default language to Lao on first load
  useEffect(() => {
    if (!localStorage.getItem('language')) {
      setLanguage('lo');
    }
  }, [setLanguage]);

  const correctPassword = '02054539859';

  const handleLogin = () => {
    if (password === correctPassword) {
      toast({
        title: translations.login.successTitle,
        description: translations.login.successDescription,
      });
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: translations.login.errorTitle,
        description: translations.login.errorDescription,
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) {
          setBackgroundImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center transition-all"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <Card className="z-10 w-full max-w-md border-destructive shadow-lg shadow-destructive/10">
        <CardHeader className="items-center text-center">
          <Logo />
          <h1 className="text-2xl font-bold">{translations.login.title}</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={translations.login.passwordPlaceholder}
              className="pr-10"
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button onClick={handleLogin} className="w-full" size="lg">
            {translations.login.loginButton}
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            {translations.login.backgroundButton}
          </Button>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-xs text-muted-foreground">
            {translations.login.footer}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
