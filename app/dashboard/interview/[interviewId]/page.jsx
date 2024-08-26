"use client";
import React, { useEffect, useState } from 'react'
import { MockInterview } from "@/utils/schema";
import db from "@/utils/db";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Webcam from 'react-webcam';
import Link from 'next/link';
import {Button} from "@/components/ui/button";

function Interview({params}) {
    const [interviewDetails, setInterviewDetails] = useState();
    const [webCamEnabled,setWebCamEnabled]=useState(false);
    useEffect(() => {
        console.log(params?.interviewId);
        GetInterviewDetails();
    });

    //this is for getting the interview details
    const GetInterviewDetails=async ()=>{
        const result =await db.select().from(MockInterview).where(eq(MockInterview.mockId,params?.interviewId));
        console.log(result);
        setInterviewDetails(result[0]);
    }
    console.log(interviewDetails?.jopDesc);
  return (
    <div className='my-10'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-col my-5 gap-3 ' >
                <div className='flex flex-col p-5 rounded-lg border gap-5'>

                    <h2 className='text-lg'>
                        <strong>Job Position/ Job Role: </strong> {interviewDetails?.jopPosition}
                    </h2>
                
                    <h2 className='text-lg'>
                        <strong>Job Description / Tech Stack: </strong>{interviewDetails?.jopDesc}
                    </h2>
                    <h2 className='text-lg'>
                        <strong>Years Of Experience: </strong>{interviewDetails?.jopExperience}
                    </h2>
                </div>
                <div className='p-5 border rounded-lg border-yellow-400 bg-yellow-200'>
                    <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
                    <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_CAMERA_INFO}</h2>
                </div>
            </div>
            <div className=''>
                {/*webcam*/}
                {webCamEnabled ?
                <Webcam
                onUserMedia={()=>setWebCamEnabled(true)} 
                onUserMediaError={()=>setWebCamEnabled(false)}
                mirrored={true} 
                style={{height:300,width:300}}/> :
                <>
                    <WebcamIcon className='h-72 p-20 w-full my-7 bg-secondary rounded-lg border'/>
                    <Button variant="ghost" onClick={()=>setWebCamEnabled(true)} className='w-full border rounded-xl' >Enable Web Cam and Microphone</Button>
                </>
                }
            </div>
           
        </div>
        <div className='flex justify-end items-end'>
            <Link href={`/dashboard/interview/${params?.interviewId}/start`} >
                <Button>Start Interview</Button>
            </Link>
        </div>
    </div>
  )
}

export default Interview
