
"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import { Skeleton } from "../ui/skeleton";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { 
        ssr: false,
        loading: () => <Skeleton className="w-full h-[250px] rounded-md" />,
    }), []);
    
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    };

    return (
        <div className="bg-background">
            <ReactQuill 
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                className="h-[250px] pb-10"
            />
        </div>
    );
}
