"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { deleteProject, fetchToken } from '@/lib/actions'

type Props = {
    projectId: string
}

const ProjectActions = ({ projectId }: Props) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const router = useRouter()

    
    const handleDeleteProject = async () => {
        setIsDeleting(true)
        
        const { token } = await fetchToken();

        try {
            await deleteProject(projectId, token);
            
            router.push("/");
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Link href={`/edit-project/${projectId}`} className="flex items-center justify-center p-3 text-gray-100 bg-gray-300 rounded-lg text-sm font-medium">
                <Image src="/pencile.svg" width={30} height={30} alt="edit" />
            </Link>

            <button
                type="button"
                disabled={isDeleting}
                className={`flex items-center justify-center p-3 text-gray-100 hover:bg-red-600 rounded-lg text-sm font-medium ${isDeleting ? "bg-[#4D4A4A]" : "bg-[#9747FF]"}`}
                onClick={handleDeleteProject}
            >
                <Image src="/trash.svg" width={28} height={28} alt="delete" />
            </button>
        </>
    )
}

export default ProjectActions