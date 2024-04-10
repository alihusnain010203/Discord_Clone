"use client"

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css"
interface FileUploadProps {
    endpoint: "messageFile" | "serverImage";
    onChange: (url?: string) => void;
    value: string;

}

const fileUpload = ({
    endpoint,
    onChange,
    value
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf" && fileType !== "video") {
        return (
            <div className="h-20 w-20 relative">
                <Image fill src={value} className=" rounded-full" alt="Server Image" />
                {/* Remove Photo */}
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 cursor-pointer">
                    <X size={24} onClick={() => onChange("")} />
                </div>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)

            }}
            onUploadError={(error: Error) => {
                console.log("error");

            }}
        />
    )
}

export default fileUpload