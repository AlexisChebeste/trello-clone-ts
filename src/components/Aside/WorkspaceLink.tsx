import { Link } from "react-router";

interface WorkspaceLinkProps {
    idWorkspace: string;
    dir?: string ;
    title: string;
}

export default function WorkspaceLink({idWorkspace, dir, title}: WorkspaceLinkProps) {
    const isBoardPage = location.pathname.includes("b/");
    return (
        <Link to={`/w/${idWorkspace}${dir || ''}`} className={`w-full text-sm font-semibold ${isBoardPage ? 'hover:bg-white/10' : 'hover:bg-gray-100'}  py-2 px-4`}>{title}</Link>
    )
}