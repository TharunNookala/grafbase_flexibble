"use client"

import { SessionInterface } from "@/common.types"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import FormField from "./FormField"
import { categoryFilters } from "@/constants"
import CustomMenu from "./CustomMenu"
import Button from "./Button"
import { createNewProject, fetchToken } from "@/lib/actions"
import { useRouter } from "next/navigation"

type Props = {
    type : string,
    session: SessionInterface
}

const ProjectForm =  ({type, session}: Props) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState(
        {
            title : '',
            description  : '',
            image : '',
            liveSiteUrl : '',
            githubUrl : '',
            category: '',

        }
)

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const {token} = await fetchToken()
        try{
            if(type === 'create'){
                await createNewProject(form, session?.user?.id, token);
                router.push('/')
            }
        } catch(error){
            console.log(error);
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];

        if(!file) return;

        if(!file.type.includes('image')) {
            return alert('Please upload an image file')
        };

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange("image", result);
        };
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState)=>({...prevState, [fieldName] : value}))
    };
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-start w-full lg:pt-24 pt-12 gap-10 text-lg max-w-5xl mx-auto">
        <div className="flex items-center justify-start w-full lg:min-h-[400px] min-h-[200px] relative">
            <label htmlFor="poster" 
            className="z-10 flex items-center justify-center text-center w-full h-full p-20 border-2 border-gray-200 border-dashed"
            >
                {!form.image && <p className="text-xl font-semibold">Choose a poster for your project</p>}
            </label>
            <input 
            id="image" 
            type="file" 
            accept="image/*" 
            required={type==='create'}
            className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
            onChange={handleChange}
            />
         {form.image && (
            <Image 
            src={form?.image}
            className='sm:p-10 object-contain z-20'
            alt="project poster"
            fill
            />
         )}
        </div>

        <FormField
            title="Title"
            state={form.title}
            placeholder="Flexibble"
            setState={(value) => handleStateChange('title', value)}
            />
        <FormField
            title="Description"
            state={form.description}
            placeholder="Showcase and discover remarkable developer projects"
            setState={(value) => handleStateChange('description', value)}
            />
        <FormField
            type="url"
            title="Website URL"
            state={form.liveSiteUrl}
            placeholder="https://www.tharunnookala.netlify.app/"
            setState={(value) => handleStateChange('liveSiteUrl', value)}
            />
        <FormField
            type="url"
            title="Github URL"
            state={form.githubUrl}
            placeholder="https://github.com/TharunNookala"
            setState={(value) => handleStateChange('githubUrl', value)}
            />
        <FormField
            title="Title"
            state={form.title}
            placeholder="Flexibble"
            setState={(value) => handleStateChange('title', value)}
            />

        <CustomMenu 
         title="Category"
         state={form.category}
         filters={categoryFilters}
         setState={(value) => handleStateChange('Category', value)}
        />

        <div className="flex items-center justify-start w-full">
            <Button
             title={isSubmitting ? 
                 `${type==='create' ? 'Creating' : 'Editing'}` : 
                 `${type==='create' ? 'Create' : 'Edit'}`
                }
             type="submit"
             leftIcon={isSubmitting ? "" : "/plus.svg"}
             isSubmitting={isSubmitting}
             >Create</Button>
        </div>
    </form>
  )
}

export default ProjectForm