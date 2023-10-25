import {GraphQLClient} from 'graphql-request';
import { createProjectMutation, createUserMutation, getUserQuery, projectsQuery } from '@/graphql';
import { ProjectForm } from '@/common.types';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '': 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '': 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL :  'http://localhost:3000';
const client = new GraphQLClient(apiUrl)

export const fetchToken = async ()=> {
    try { 
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } catch (error) {
        throw error;
    }
} 

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({path:imagePath})
        });  
        return await response.json();
    } catch (error) {
        console.log("Error while uploading image: ", error);
    } 
};

const makeGraphQLRequest = async (query: string, variables={}) => {
    try {
        return await client.request(query, variables)
    } catch (error) {
        console.error("GraphQL Request Error...!");
    }
}

export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, {email})
}

export const createUser = (name: string, email: string, avatarUrl:string) => { 
    client.setHeader('x-api-key', apiKey);
    console.log("CREATING USER... ")
    const variables = {
            input : {
                name, email, avatarUrl 
            }
        }
    return makeGraphQLRequest(createUserMutation, variables)
}

export const createNewProject = async (form : ProjectForm, creatorId : string, token: string) => {
        const imageUrl = await uploadImage(form.image);

        if(imageUrl.url){
            client.setHeader("Authorization",`Bearer ${token}`)
            const variables = {
              input: { 
                ...form,
                image: imageUrl.url,
                createdBy:{
                    link: creatorId
                }
              }
            }
            return makeGraphQLRequest(createProjectMutation, variables)
        }
};

export const fetchAllProjects = (category?: string | null, endcursor? : string | null)=> {
    client.setHeader('x-api-key', apiKey);
    console.log("Fetching...")
    return makeGraphQLRequest(projectsQuery, {category, endcursor})
}