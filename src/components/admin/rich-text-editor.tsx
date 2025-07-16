
"use client";

import dynamic from "next/dynamic";
import { useMemo, forwardRef } from "react";
import "react-quill/dist/quill.snow.css";
import { Skeleton } from "../ui/skeleton";
import type ReactQuill from 'react-quill';

interface RichTextEditorProps extends React.ComponentProps<typeof ReactQuill> {
    value: string;
    onChange: (value: string) => void;
}

const ReactQuillComponent = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-[250px] rounded-md" />,
});

export const RichTextEditor = forwardRef<ReactQuill, RichTextEditorProps>((props, ref) => {
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
            <ReactQuillComponent
                ref={ref}
                theme="snow"
                modules={modules}
                className="h-[250px] pb-10"
                {...props}
            />
        </div>
    );
});

RichTextEditor.displayName = 'RichTextEditor';
