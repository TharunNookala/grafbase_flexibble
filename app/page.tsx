import { ProjectInterface } from "@/common.types"
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
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
const Home = async ({ searchParams: { category="", endcursor } }: Props) => {
  const data = await fetchAllProjects(category, endcursor) as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];
  if(projectsToDisplay.length === 0){
    return (
      <section className="flex items-center justify-center flex-col lg:px-20 py-6 px-5">
        <Categories />
          <p className="w-full text-center my-10 px-2 font-semibold text-lg">Oops..! No Projects found. Go create a project now.</p>
      </section>
    )
  }
  const pagination = data?.projectSearch?.pageInfo;
  return (
    <section className="flex-start flex-col lg:px-20 py-6 px-5 border-t-[12px] border-b-[3px]">
      <Categories />

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
      <LoadMore 
      startCursor={pagination.startCursor}
      endCursor={pagination.endCursor}
      hasPreviousPage={pagination.hasPreviousPage}
      hasNextPage={pagination.hasNextPage}
      />
    </section>
  )
}

export default Home;