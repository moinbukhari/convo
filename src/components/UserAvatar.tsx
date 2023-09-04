//import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"


export const UserAvatar = () => {

    //const {user} = useUser();

    return (
        <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/moinbukhari.png" />
            <AvatarFallback>MB</AvatarFallback>
        </Avatar>
    )
}