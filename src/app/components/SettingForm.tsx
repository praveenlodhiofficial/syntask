"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface iAppProps {
    fullName: string;
    email: string;
    profileImage: string;
}

export function SettingForm({ fullName, email, profileImage }: iAppProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>

            <form>
                {/* Settings Form Content */}
                <CardContent className="flex flex-col gap-y-4">

                    {/* Full Name */}
                    <div className="flex flex-col gap-y-2">
                        <Label>Full Name</Label>
                        <Input 
                            defaultValue={fullName} 
                            placeholder="Praveen Lodhi" 
                            className="placeholder-gray-900" // Placeholder text color
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-y-2">
                        <Label>Email</Label>
                        <Input 
                            defaultValue={email} 
                            placeholder="test-email@gmail.com" 
                            className="placeholder-gray-900" // Placeholder text color
                        />
                    </div>

                </CardContent>

                {/* Settings Form Footer */}
                <CardFooter>
                    <Button>Submit</Button>
                </CardFooter>

            </form>
        </Card>
    )
}
