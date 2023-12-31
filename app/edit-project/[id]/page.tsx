import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal"
import ProjectForm from "@/components/ProjectForm"
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation";

const EditProject = async ({params : {id}}: {params: {id:string}}) => {
    const session = await getCurrentUser();

    if(!session?.user) redirect('/')

    const result = await getProjectDetails(id) as { project?: ProjectInterface }
  return (
    <Modal>
        <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full">Edit project</h3>
        <ProjectForm type="edit" session={session} project={result?.project}/>
    </Modal>
  )
}

export default EditProject