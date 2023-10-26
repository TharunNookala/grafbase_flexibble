import Link from 'next/link'

import { getUserProjects } from '@/lib/actions'
import { ProjectInterface, UserProfile } from '@/common.types'
import Image from 'next/image'

type Props = {
    userId: string
    projectId: string
}

const RelatedProjects = async ({ userId, projectId }: Props) => {
    const result = await getUserProjects(userId) as { user?: UserProfile}

    const filteredProjects = result?.user?.projects?.edges
        ?.filter(({ node }: { node: ProjectInterface }) => node?.id !== projectId)

    if (filteredProjects?.length === 0) return null;

    return (
        <section className="flex flex-col mt-32 w-full">
            <div className="flex items-center justify-between">
                <p className="text-base font-bold">
                    More by {result?.user?.name}
                </p>
                <Link
                    href={`/profile/${result?.user?.id}`}
                    className="text-[#9747FF] text-base"
                >
                    View All
                </Link>
            </div>

            <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-5">
                {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
                    <div className="flex items-center justify-center flex-col rounded-2xl min-w-[210px] min-h-[197px] drop-shadow-2xl">
                    <Link href={`/project/${node?.id}`} className="flex items-center justify-center group relative w-full h-full">
                        <Image src={node?.image} width={414} height={314} className="w-full h-full object-cover rounded-2xl" alt="project image" />
        
                        <div className="hidden group-hover:flex justify-end items-end w-full h-1/3 bg-gradient-to-b from-transparent to-black/50 rounded-b-2xl gap-2 absolute bottom-0 right-0 font-semibold text-lg text-white p-4">
                            <p className="w-full">{node?.title}</p>
                        </div>
                    </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RelatedProjects