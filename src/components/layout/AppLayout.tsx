
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart,
  LogOut,
  Menu,
  Share2,
  LifeBuoy,
  Info,
  Star,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import Logo from '../Logo';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { useToast } from '@/hooks/use-toast';
import { FeedbackDialog } from './FeedbackDialog';
import { RatingDialog } from './RatingDialog';
import { AboutDialog } from './AboutDialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import LaoFlagIcon from '../icons/LaoFlagIcon';
import EnglishFlagIcon from '../icons/EnglishFlagIcon';
import ChineseFlagIcon from '../icons/ChineseFlagIcon';
import VietnameseFlagIcon from '../icons/VietnameseFlagIcon';
import ThaiFlagIcon from '../icons/ThaiFlagIcon';
import { useLanguage } from '@/context/language-context';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFeedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [isRatingDialogOpen, setRatingDialogOpen] = useState(false);
  const [isAboutDialogOpen, setAboutDialogOpen] = useState(false);
  const { language, setLanguage, translations } = useLanguage();

  const navItems = [
    { href: '/dashboard', label: translations.mainNav.dashboard, icon: Home },
    { href: '/students', label: translations.mainNav.students, icon: Users },
    { href: '/income', label: translations.mainNav.income, icon: TrendingUp },
    { href: '/expenses', label: translations.mainNav.expenses, icon: TrendingDown },
    { href: '/report', label: translations.mainNav.reports, icon: BarChart },
  ];

  useEffect(() => {
    setIsMounted(true);
    const authFlag = localStorage.getItem('isAuthenticated');
    if (authFlag === 'true') {
      setIsAuthenticated(true);
    } else {
      router.replace('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: translations.share.title,
          text: translations.share.text,
          url: window.location.origin,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
            variant: 'destructive',
            title: translations.share.errorTitle,
            description: translations.share.errorDescription,
        })
      }
    } else {
       toast({
            variant: 'destructive',
            title: translations.share.notSupportedTitle,
            description: translations.share.notSupportedDescription,
        })
    }
  };

  const handleFeedbackSubmit = (feedback: string) => {
    console.log('Feedback submitted:', feedback);
    toast({
        title: translations.feedback.thanksTitle,
        description: translations.feedback.thanksDescription,
    })
    setFeedbackDialogOpen(false);
  };

  const handleRatingSubmit = (rating: number, comment: string) => {
    console.log('Rating submitted:', rating, 'Comment:', comment);
    toast({
        title: translations.rating.thanksTitle.replace('{rating}', rating.toString()),
        description: translations.rating.thanksDescription,
    })
    setRatingDialogOpen(false);
  };
  
  const secondaryNavItems = [
    { label: translations.secondaryNav.share, icon: Share2, action: handleShare },
    { label: translations.secondaryNav.feedback, icon: LifeBuoy, action: () => setFeedbackDialogOpen(true) },
    { label: translations.secondaryNav.rate, icon: Star, action: () => setRatingDialogOpen(true) },
    { label: translations.secondaryNav.about, icon: Info, action: () => setAboutDialogOpen(true) }, 
  ];

  const languageOptions = [
      { code: 'lo', name: 'ພາສາລາວ', icon: LaoFlagIcon },
      { code: 'en', name: 'English', icon: EnglishFlagIcon },
      { code: 'zh', name: '中文', icon: ChineseFlagIcon },
      { code: 'vi', name: 'Tiếng Việt', icon: VietnameseFlagIcon },
      { code: 'th', name: 'ภาษาไทย', icon: ThaiFlagIcon },
  ];

  const CurrentLanguageIcon = languageOptions.find(opt => opt.code === language)?.icon || LaoFlagIcon;

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center justify-center border-b border-b-destructive">
        <Logo />
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-primary hover:text-primary-foreground',
                pathname === item.href && 'bg-primary text-primary-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
           <Separator className="my-2 bg-destructive/20" />
           {secondaryNavItems.map((item) => (
            <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 text-base font-normal text-foreground"
                onClick={item.action}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t border-t-destructive p-4">
        <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          {translations.logout}
        </Button>
      </div>
    </div>
  );

  if (!isMounted) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen w-full ${language === 'en' ? 'font-english' : 'font-body'}`}>
      <div className="flex flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-b-destructive bg-card px-4 lg:px-6">
            <div className="flex items-center gap-2">
                <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost">
                        <Menu className="h-6 w-6 mr-2" />
                        {translations.menu}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col p-0 bg-card border-r-destructive w-[280px]">
                       <SheetHeader className="p-4 sr-only">
                            <SheetTitle>{translations.menu}</SheetTitle>
                        </SheetHeader>
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="flex flex-1 items-center justify-center gap-2">
                <Logo />
                <h1 className="text-xl font-semibold hidden sm:block">Sedthasard App</h1>
            </div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <CurrentLanguageIcon className="h-4 w-4 mr-2" />
                            {languageOptions.find(opt => opt.code === language)?.name}
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {languageOptions.map(opt => (
                            <DropdownMenuItem key={opt.code} onClick={() => setLanguage(opt.code as any)}>
                                <opt.icon className="h-4 w-4 mr-2" />
                                {opt.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="pr-4">
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>
      <FeedbackDialog 
        isOpen={isFeedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        onSubmit={handleFeedbackSubmit}
      />
      <RatingDialog
        isOpen={isRatingDialogOpen}
        onOpenChange={setRatingDialogOpen}
        onSubmit={handleRatingSubmit}
      />
      <AboutDialog
        isOpen={isAboutDialogOpen}
        onOpenChange={setAboutDialogOpen}
      />
    </div>
  );
}
