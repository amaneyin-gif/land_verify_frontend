import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Navigation from "@/components/Navigation";
import Navbar from '@/components/Navbar';
import UsersTab from "@/components/UserManagement/UserTab";
import RolesTab from "@/components/UserManagement/RoleTab";
import PageAssignmentTab from "@/components/UserManagement/PageAssignmnetTab";

const UserManagement = () => {
    
    { console.log("UserManagement component rendered") }
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
                    <p className="text-muted-foreground">Manage users, roles, and page assignments</p>
                </div>

                <Tabs defaultValue="users" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="roles">Roles</TabsTrigger>
                        <TabsTrigger value="phases">Page Assignment</TabsTrigger>
                    </TabsList>

                    <TabsContent value="users" className="space-y-4">
                        <UsersTab />
                    </TabsContent>

                    <TabsContent value="roles" className="space-y-4">
                        <RolesTab />
                    </TabsContent>

                    <TabsContent value="phases" className="space-y-4">
                        <PageAssignmentTab />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default UserManagement;
