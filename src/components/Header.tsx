'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Menu, Coins, Leaf, Search, Bell, User, ChevronDown, LogIn, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { createUser, getUnreadNotifications, markNotificationAsRead, getUserByEmail, getUserBalance, verifyPassword } from "@/utils/db/actions"

interface HeaderProps {
  onMenuClick: () => void;
  totalEarnings: number;
}

interface Notification {
  id: number;
  type: string;
  message: string;
}

export default function Header({ onMenuClick, totalEarnings }: HeaderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      const fetchUserInfo = async () => {
        const user = await getUserByEmail(email);
        if (user) {
          setUserInfo(user);
          setLoggedIn(true);
        }
        setLoading(false);
      };

      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userInfo && userInfo.email) {
        const user = await getUserByEmail(userInfo.email);
        if (user) {
          const unreadNotifications = await getUnreadNotifications(user.id);
          setNotifications(unreadNotifications);
        }
      }
    };

    fetchNotifications();

    const notificationInterval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(notificationInterval);
  }, [userInfo]);

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (userInfo && userInfo.email) {
        const user = await getUserByEmail(userInfo.email);
        if (user) {
          const userBalance = await getUserBalance(user.id);
          setBalance(userBalance);
        }
      }
    };

    fetchUserBalance();

    const handleBalanceUpdate = (event: CustomEvent) => {
      setBalance(event.detail);
    };
    window.addEventListener('balanceUpdated', handleBalanceUpdate as EventListener);

    return () => {
      window.removeEventListener('balanceUpdated', handleBalanceUpdate as EventListener);
    };
  }, [userInfo]);

  const login = async (email: string, password: string) => {
    try {
      const user = await getUserByEmail(email);
      if (user && await verifyPassword(user.id, password)) {
        setLoggedIn(true);
        setUserInfo(user);
        localStorage.setItem('userEmail', user.email);
      } else {
        console.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    setLoggedIn(false);
    setUserInfo(null);
    localStorage.removeItem('userEmail');
  };

  const handleNotificationClick = async (notificationId: number) => {
    await markNotificationAsRead(notificationId);
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== notificationId)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 md:mr-4" onClick={onMenuClick}>
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center">
            <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-500 mr-1 md:mr-2" />
            <div className="flex flex-col">
              <span className="font-bold text-base md:text-lg text-gray-800">Phoenix</span>
              <span className="text-[8px] md:text-[10px] text-gray-500 -mt-1">24/7</span>
            </div>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2 md:space-x-4">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2">
              <Search className="h-5 w-5" />
            </Button>
          )}

          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.2rem] h-5">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{notification.type}</span>
                        <span className="text-sm text-gray-500">{notification.message}</span>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem>No unread notifications</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!isMobile && (
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">{balance} INR</span>
            </div>
          )}

          {loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                  <ChevronDown className="h-3 w-3 absolute right-0 bottom-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-5 w-5 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => login('user@example.com', 'password123')}>
              <LogIn className="h-5 w-5 mr-2" />
              Log In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}