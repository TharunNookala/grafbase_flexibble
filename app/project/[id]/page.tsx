import { ProjectInterface } from '@/common.types';
import Modal from '@/components/Modal';
import ProjectActions from '@/components/ProjectActions';
import ProjectForm from '@/components/ProjectForm';
import RelatedProjects from '@/components/RelatedProjects';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session'
import Image from 'next/image';
import Link from 'next/link';

const Project = async ({params : {id}}: {params: {id:string}}) => {
    const session = await getCurrentUser();
    const result = await getProjectDetails(id) as { project?: ProjectInterface};
 
    if(!result?.project){
       return <p>Failed to fetch project inormation</p>
    }
    const projectDetails = result?.project;
    const userDetailsLink = () => `/profile/${projectDetails?.createdBy?.id}`
  return (
    <Modal>
        <section className='w-full flex flex-col items-center justify-between gap-y-8 max-w-4xl max-xs:flex-col'>
            <div className='flex-1 flex items-center gap-5 w-full max-xs:flex-col'>
                <Link href={userDetailsLink()}>
                <Image
                src={projectDetails?.createdBy.avatarUrl}
                alt={`${result?.project?.title} image`}
                width={82}
                height={82}
                className='rounded-full'
                />
                </Link>
            
                <div className='flex-1 flex items-center justify-start flex-col gap-1'>
                    <h1 className='text-lg self-start font-semibold'> {projectDetails?.title} </h1>
                    <div className='flex flex-wrap whitespace-nowrap gap-4 w-full'>
                        <Link href={userDetailsLink()} className='font-medium'>{projectDetails?.createdBy?.name}</Link>
                        <Image src="/dot.svg" width={4} height={4} alt="dot" />
                        <Link href={`/?category=${projectDetails.category}`} className="text-[#9747FF] font-medium"> 
                            {projectDetails?.category}
                        </Link>
                    </div>
                </div>
                {session?.user?.email === projectDetails?.createdBy?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectId={projectDetails?.id} />
                    </div>
                )}
            </div>
            <div className='w-full mt-10'>
                <Image
                    src={`${projectDetails?.image}`}
                    alt='project poster'
                    width={400}
                    height={400}
                    className='object-cover w-full rounded-2xl'
                />
            </div>
        </section>
        <section className="flex items-center justify-center flex-col mt-20">
                <p className="max-w-5xl text-xl font-normal">
                    {projectDetails?.description}
                </p>

                <div className="flex flex-wrap mt-5 gap-5">
                    <Link href={projectDetails?.githubUrl} target="_blank" rel="noreferrer" 
                    className="flex items-center justify-center gap-2 tex-sm font-medium bg-[#9747FF] px-4 py-3 rounded-md text-white"
                    >
                        Github 
                    </Link>
                    <Image src="/dot.svg" width={4} height={4} alt="dot" />
                    <Link href={projectDetails?.liveSiteUrl} target="_blank" rel="noreferrer" 
                    className="flex items-center justify-center gap-4 tex-sm font-medium bg-[#9747FF] px-4 py-3 rounded-md text-white"
                    >
                        Live Site 
                    </Link>
                </div>
        </section>
        <section className="flex items-center justify-center w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-gray-300" />
                <Link href={userDetailsLink()} className="min-w-[82px] h-[82px]">
                    <Image
                        src={projectDetails?.createdBy?.avatarUrl}
                        className="rounded-full"
                        width={82}
                        height={82}
                        alt="profile image"
                    />
                </Link>
                <span className="w-full h-0.5 bg-gray-300" />
        </section>
            <RelatedProjects userId={projectDetails?.createdBy?.id} projectId={projectDetails?.id} />
    </Modal>
  )
}

export default Project