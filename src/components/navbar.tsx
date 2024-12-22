"use client";

import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

type NavbarUser = {
    id: string
    username: string
    name: string
    description: string
    avatar: string
    created: Date
    isAuthor: boolean
}

export default function Navbar({ user }: { user: NavbarUser }) {
    const [isAuthor, setIsAuthor] = useState<boolean>(false);

    const session = useSession();
    const sessionUser = session?.data?.user;
    const { setTheme, theme } = useTheme();
    console.log(theme)

    useEffect(() => {
        setIsAuthor(user?.id === sessionUser?.id);
    }, [user, sessionUser]);

    return (
        <nav className="min-h-[10vh] h-[10vh] max-h-[10vh] w-full flex flex-row justify-between items-center gap-4 px-4 md:px-20    ">
            <div className="flex justify-center items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex flex-row justify-between items-center gap-2 px-6 py-6">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar ?? "avatar.png"} alt={user.username} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col justify-start items-start gap-0">
                                <span>{user.name}</span>
                                <span className="text-xs text-gray-500">@{user.username}</span>
                            </div>

                            <ChevronsUpDown className="ml-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>Copy Link</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {
                            isAuthor === true ?
                                <>
                                    <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                                    <DropdownMenuItem>{sessionUser?.email?.substring(0, 25)}</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="focus:bg-transparent hover:bg-transparent" asChild>
                                        <div className="flex flex-row justify-end items-center gap-2">
                                            <Button size="icon" variant="outline" asChild><Link href="/settings"><Settings /></Link></Button>
                                            <Button size="icon" variant="outline" asChild><Link href="/logout"><LogOut /></Link></Button>
                                        </div>
                                    </DropdownMenuItem>
                                </>
                                : null
                        }
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-row justify-center items-center">

                </div>
            </div>
        </nav>
    )
}