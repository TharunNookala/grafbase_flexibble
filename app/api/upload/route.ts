import { NextResponse } from "next/server";
import {v2 as cloudinary} from "cloudinary";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});

export async function POST(request: Request){
    const {path} = await request.json();
    if(!path) {
        return NextResponse.json(
            {message:"Image Path is required"},
            {status : 400}
        )
    }

    try {
        const options = {
            use_filename : true,
            unique_filename : false,
            overwrite: true,
            transformation: [{
                width: 1000, height: 752, crop: 'scale'
            }]
        }
        const result = await cloudinary.uploader.upload(path, options); 
        return NextResponse.json(result, {status:200});
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return NextResponse.json({message:"Failed to upload image on Cloudinary"}, {status:500});     
    }
}