import { ProjectInterface } from "@/common.types"
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions"

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
}

type Props = {
  searchParams: SearchParams
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface}[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    }
  }
}
export default async function Home({ searchParams: { category, endcursor } }: Props) {
  const data = await fetchAllProjects(category, endcursor) as ProjectSearch;
  console.log("data", data);
  const projectsToDisplay = data?.projectSearch?.edges || [];
  if(projectsToDisplay.length === 0){
    return (
      <section className="flex items-center justify-center flex-col lg:px-20 py-6 px-5">
        <h1 className="text-lg font-semibold">Categories</h1>
          <p className="w-full text-center my-10 px-2 font-semibold text-lg">Oops..! No Projects found. Go create a project now.</p>
      </section>
    )
  }
  return (
    <section className="flex-start flex-col lg:px-20 py-6 px-5 border-[12px]">
      <h1>Categories</h1>

        <section className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10 w-full">
          {projectsToDisplay.map(({node}:{node:ProjectInterface})=>(
            <ProjectCard 
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
            />
          ))}
        </section>
      <h1>Posts</h1>
      <h1>LoadMore</h1>
    </section>
  )
}
