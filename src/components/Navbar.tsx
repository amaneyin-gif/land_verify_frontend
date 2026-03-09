import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, MapPin, Menu, UserPen, ChevronDown, } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import path from 'path';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CardContent } from "@/components/ui/card";
import { verify } from "crypto";
import SearchableDropdown from './SearchableDropdown';

const Navbar = ({ extraContent }) => {
  const { logout, user, accessibleRoutes } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [collapsed, setCollapsed] = useState(false);


  // useEffect(() => {
  //   setCollapsed(true); // close on page change
  // }, [location.pathname]);

  const PAGE_ROUTE_MAP = {
    "Home": "/home",
    "Verify Village": "/verify",
    "User Management": "/user-management",
    "User Creation": "/user-management",
    "Role Creation": "/user-management",
    "Village Assignment": "/user-management",
  };

  const navItems = [
    { path: '/home', label: 'Home', icon: LayoutDashboard },
    { path: '/verify', label: 'Verify Village', icon: MapPin },
    { path: '/user-management', label: 'User Management', icon: UserPen },
  ];
  /** ✅ build allowed paths from backend response */
  // if (loadingRoutes) return null; 
  const allowedPaths = accessibleRoutes.flatMap(route => {
    const parent = PAGE_ROUTE_MAP[route.name];
    const children = route.children.map(c => PAGE_ROUTE_MAP[c]);
    return [parent, ...children].filter(Boolean);
  });
  // console.log(accessibleRoutes, "___navbar accessibleRoutes");
  const handleLogoutConfirm = async () => {
    try {
      await logout(); // call your logout function
      navigate('/login'); // redirect to login
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setOpenDialog(false);
    }
  };
  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  // return (
  //   <>
  //     <nav className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
  //       <div className="container mx-auto px-6">
  //         <div className="flex items-center justify-between h-16">

  //           {/* LEFT: Logo + Nav */}
  //           <div className="flex items-center gap-6">
  //             <Link to="/home" className="flex items-center gap-2">
  //               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
  //                 <MapPin className="h-5 w-5 text-primary-foreground" />
  //               </div>
  //               <span className="font-semibold text-lg text-foreground">AgriStack <span className="text-xs align-center">(GRMAS)</span></span>
  //             </Link>

  //             <div className="hidden md:flex items-center gap-2">
  //               {navItems.filter(item => allowedPaths.includes(item.path)).map((item) => (
  //                 <Link key={item.path} to={item.path}>
  //                   <Button
  //                     variant={location.pathname === item.path ? 'default' : 'ghost'}
  //                     size="sm"
  //                     className="gap-2"
  //                   >
  //                     <item.icon className="h-4 w-4" />
  //                     {item.label}
  //                   </Button>
  //                 </Link>
  //               ))}
  //             </div>
  //           </div>

  //           {/* RIGHT: User + Logout (Desktop) */}
  //           <div className="hidden md:flex items-center gap-4">
  //             <span className="text-sm text-muted-foreground">{user?.name} ({user.userid})</span>
  //             <Button
  //               onClick={() => setOpenDialog(true)}
  //               variant="outline"
  //               size="sm"
  //               className="gap-2"
  //             >
  //               <LogOut className="h-4 w-4" />
  //               <span>Logout</span>
  //             </Button>
  //           </div>

  //           {/* MOBILE MENU */}
  //           <div className="md:hidden">
  //             <Sheet>
  //               <SheetTrigger asChild>
  //                 <Button variant="ghost" size="icon">
  //                   <Menu className="h-5 w-5" />
  //                 </Button>
  //               </SheetTrigger>

  //               <SheetContent side="right" className="flex flex-col justify-between p-4">
  //                 {/* Nav Links */}
  //                 <div className="flex flex-col gap-2 mt-6">
  //                   {navItems.filter(item => allowedPaths.includes(item.path)).map((item) => (
  //                     <Link key={item.path} to={item.path}>
  //                       <Button
  //                         variant={location.pathname === item.path ? 'default' : 'ghost'}
  //                         className="w-full justify-start gap-2"
  //                       >
  //                         <item.icon className="h-4 w-4" />
  //                         {item.label}
  //                       </Button>
  //                     </Link>
  //                   ))}
  //                 </div>

  //                 {/* Logout (bottom) */}
  //                 <div className="border-t pt-4 mt-4">
  //                   <div className="flex flex-col gap-2">
  //                     <span className="text-sm text-muted-foreground">{user?.name} ({user.userid})</span>
  //                     <Button
  //                       onClick={() => setOpenDialog(true)}
  //                       variant="outline"
  //                       className="w-full justify-start gap-2"
  //                     >
  //                       <LogOut className="h-4 w-4" />
  //                       Logout
  //                     </Button>
  //                   </div>
  //                 </div>
  //               </SheetContent>
  //             </Sheet>
  //           </div>
  //         </div>
  //       </div>
  //     </nav>

  //     {/* 🔒 Logout Confirmation Dialog */}
  //     <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  //       <DialogContent className="sm:max-w-md rounded-2xl shadow-lg">
  //         <DialogHeader>
  //           <DialogTitle className="text-lg font-semibold">Confirm Logout</DialogTitle>
  //           <DialogDescription className="text-sm text-muted-foreground">
  //             Are you sure you want to log out of your account?
  //           </DialogDescription>
  //         </DialogHeader>

  //         <DialogFooter className="flex justify-end gap-2 pt-4">
  //           <Button variant="outline" onClick={() => setOpenDialog(false)} className="rounded-md">
  //             Cancel
  //           </Button>
  //           <Button variant="destructive" onClick={handleLogoutConfirm} className="rounded-md">
  //             Yes, Logout
  //           </Button>
  //         </DialogFooter>
  //       </DialogContent>
  //     </Dialog>

  //   </>
  // );
  // above is with top navbar, below is with sidebar

  return (
    <>
      {/* <aside
        className={`bg-card border-r border-border shadow-soft transition-all duration-300 
        ${collapsed ? "w-16" : "w-64"} h-screen flex flex-col`}
      > */}
      {/* <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`bg-card border-r border-border shadow-soft transition-all duration-300 
  ${collapsed ? "w-16" : "w-64"} h-screen flex flex-col`}
      > */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`hidden md:flex bg-card border-r border-border shadow-soft transition-all duration-300
        ${collapsed ? "w-16" : "w-64"} h-screen flex-col`}
      >
        {/* TOP */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!collapsed && (
            <Link to="/home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">
                AgriStack <span className="text-xs">(GRMAS)</span>
              </span>
            </Link>
          )}

          {/* <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-muted rounded"
          >
            <Menu className="h-5 w-5" />
          </button> */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(prev => !prev);
            }}
            className="p-2 hover:bg-muted rounded"
          >
            <Menu className="h-5 w-5" />
          </button>

        </div>

        {/* NAV */}
        <div className="flex-1 p-2 space-y-2">
          {navItems
            .filter(item => allowedPaths.includes(item.path))
            .map(item => (
              <Link key={item.path} to={item.path}>

                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && item.label}
                </Button>
              </Link>
            ))}
          {extraContent && (
            // <div className="mt-3 px-2">
            //   {extraContent}
            // </div>
            <div className={`mt-3 px-2 transition-opacity duration-200 ${collapsed ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
              {extraContent}
            </div>
          )}


        </div>

        {/* USER */}
        <div className="border-t p-3">
          {!collapsed && (
            <div className="text-xs text-muted-foreground mb-2">
              {user?.name} ({user?.userid})
            </div>
          )}

          <Button
            onClick={() => setOpenDialog(true)}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && "Logout"}
          </Button>

        </div>
      </aside>

      {/* ================= MOBILE HAMBURGER ONLY ================= */}
      {/* <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b flex items-center justify-between px-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">


              <div className="h-14 flex items-center px-4 border-b">
                <span className="font-semibold">AgriStack</span>
              </div>


              <div className="flex-1 p-2 space-y-2">
                {navItems
                  .filter(item => allowedPaths.includes(item.path))
                  .map(item => (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={location.pathname === item.path ? "default" : "ghost"}
                        className="w-full justify-start gap-3"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
              </div>

              <div className="border-t p-3">
                <div className="text-xs text-muted-foreground mb-2">
                  {user?.name} ({user?.userid})
                </div>

                <Button
                  onClick={() => setOpenDialog(true)}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div> */}
      <div className='md:hidden fixed top-3 left-3 z-50'>
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Menu className='h-5 w-5 text-primary-foreground' />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">

              <div className="h-14 flex items-center px-4 border-b">
                <span className="font-semibold">AgriStack <span className="text-xs">(GRMAS)</span></span>
              </div>
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {navItems
                  .filter(item => allowedPaths.includes(item.path))
                  .map(item => (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={location.pathname === item.path ? "default" : "ghost"}
                        className="w-full justify-start gap-3"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                {extraContent && (
                  <div className="mt-3 px-2">
                    {extraContent}
                  </div>
                )}
              </div>
              <div className="border-t p-3">
                <div className="text-xs text-muted-foreground mb-2">
                  {user?.name} ({user?.userid})
                </div>
                <Button
                  onClick={() => setOpenDialog(true)}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* LOGOUT DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl shadow-lg">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogoutConfirm}>
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;