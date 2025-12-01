// import { Link, useLocation } from 'react-router-dom';
// import { LogOut, LayoutDashboard, MapPin } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';

// const Navbar = () => {
//   const { logout, user } = useAuth();
//   const location = useLocation();

//   const navItems = [
//     { path: '/home', label: 'Home', icon: LayoutDashboard },
//     { path: '/verify', label: 'Verify Village', icon: MapPin },
//   ];

//   return (
//     <nav className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center gap-8">
//             <Link to="/home" className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" >
//                 <MapPin className="h-5 w-5 text-primary-foreground" />
//               </div>
//               <div style={{ marginRight:"5px"}}>
//               <span className="font-semibold text-lg text-foreground" >AgriStack</span>
//               </div>
//             </Link>

//             <div className="hidden md:flex items-center gap-2">
//               {navItems.map((item) => (
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

//           <div className="flex items-center gap-4">
//             <span className="text-sm text-muted-foreground hidden sm:block">
//               {user?.name}
//             </span>
//             <Button onClick={logout} variant="outline" size="sm" className="gap-2">
//               <LogOut className="h-4 w-4" />
//               <span className="hidden sm:inline">Logout</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// --- navbar with mobile drawer menu version --

// import { Link, useLocation } from 'react-router-dom';
// import { LogOut, LayoutDashboard, MapPin, Menu } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// const Navbar = () => {
//   const { logout, user } = useAuth();
//   const location = useLocation();

//   const navItems = [
//     { path: '/home', label: 'Home', icon: LayoutDashboard },
//     { path: '/verify', label: 'Verify Village', icon: MapPin },
//   ];

//   return (
//     <nav className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between h-16">

//           {/* LEFT SECTION — Logo + Nav Buttons (like original) */}
//           <div className="flex items-center gap-6">
//             {/* Logo */}
//             <Link to="/dashboard" className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                 <MapPin className="h-5 w-5 text-primary-foreground" />
//               </div>
//               <span className="font-semibold text-lg text-foreground">AgriStack</span>
//             </Link>

//             {/* Desktop Nav Links */}
//             <div className="hidden md:flex items-center gap-2">
//               {navItems.map((item) => (
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

//           {/* RIGHT SECTION — User + Logout (Desktop) */}
//           <div className="hidden md:flex items-center gap-4">
//             <span className="text-sm text-muted-foreground">{user?.name}</span>
//             <Button onClick={logout} variant="outline" size="sm" className="gap-2">
//               <LogOut className="h-4 w-4" />
//               <span>Logout</span>
//             </Button>
//           </div>

//           {/* MOBILE MENU (Drawer) */}
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
//                   {navItems.map((item) => (
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

//                 {/* Logout Section (bottom) */}
//                 <div className="border-t pt-4 mt-4">
//                   <div className="flex flex-col gap-2">
//                     <span className="text-sm text-muted-foreground">{user?.name}</span>
//                     <Button
//                       onClick={logout}
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
//   );
// };

// export default Navbar;



import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, MapPin, Menu, UserPen, } from 'lucide-react';
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
import { useState } from 'react';
import path from 'path';

const Navbar = () => {
  const { logout, user, accessibleRoutes } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const navItems = [
    { path: '/home', label: 'Home', icon: LayoutDashboard },
    { path: '/verify', label: 'Verify Village', icon: MapPin },
    { path: '/user-management', label: 'User Management', icon: UserPen },
  ];
  console.log(accessibleRoutes, "___navbar accessibleRoutes");
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

  return (
    <>
      <nav className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* LEFT: Logo + Nav */}
            <div className="flex items-center gap-6">
              <Link to="/home" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg text-foreground">AgriStack <span className="text-xs align-center">(GRMAS)</span></span>
              </Link>

              <div className="hidden md:flex items-center gap-2">
                {navItems.filter(item => accessibleRoutes.includes(item.path)).map((item) => (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={location.pathname === item.path ? 'default' : 'ghost'}
                      size="sm"
                      className="gap-2"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT: User + Logout (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.name} ({user.userid})</span>
              <Button
                onClick={() => setOpenDialog(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>

            {/* MOBILE MENU */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="flex flex-col justify-between p-4">
                  {/* Nav Links */}
                  <div className="flex flex-col gap-2 mt-6">
                    {navItems.filter(item => accessibleRoutes.includes(item.path)).map((item) => (
                      <Link key={item.path} to={item.path}>
                        <Button
                          variant={location.pathname === item.path ? 'default' : 'ghost'}
                          className="w-full justify-start gap-2"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                  </div>

                  {/* Logout (bottom) */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">{user?.name} ({user.userid})</span>
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
          </div>
        </div>
      </nav>

      {/* 🔒 Logout Confirmation Dialog */}
      {/* <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogoutConfirm}>
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      {/* 🔒 Logout Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Confirm Logout</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)} className="rounded-md">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogoutConfirm} className="rounded-md">
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Navbar;

