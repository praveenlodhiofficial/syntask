import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { AuthModal } from "./AuthModal";

export const Navbar = () => {
    return (
        <div className="flex py-5 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} width={40} height={40} alt="Logo" />

                <h4 className="text-3xl font-semibold">
                    Syn<span className="text-blue-500">Task</span>
                </h4>
            </Link>

            <AuthModal />
        </div>
    );
};
