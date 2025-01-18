import { Link } from "react-router";

interface WorkspaceLinkProps {
    idWorkspace: string;
    dir?: string ;
    title: string;
    children: React.ReactNode;
}

export default function WorkspaceLink({idWorkspace, dir, title, children}: WorkspaceLinkProps) {
    const isBoardPage = location.pathname.includes("b/");
    return (
        <Link to={`/w/${idWorkspace}${dir || ''}`} className={`w-full text-sm font-semibold ${isBoardPage ? 'hover:bg-white/10' : 'hover:bg-gray-100'}  py-2 px-4 flex gap-1 items-center`}>
            {children}
            {title}
        </Link>
    )
}