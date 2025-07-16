
"use client";

import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import type Quill from "quill";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor = forwardRef<any, RichTextEditorProps>(
    ({ value, onChange }, ref) => {
        const editorRef = useRef<HTMLDivElement>(null);
        const quillRef = useRef<Quill | null>(null);

        useImperativeHandle(ref, () => ({
            getQuill: () => quillRef.current,
        }));

        useEffect(() => {
            const initializeQuill = async () => {
                const { default: Quill } = await import('quill');
                await import('quill/dist/quill.snow.css');

                if (editorRef.current && !quillRef.current) {
                    const quill = new Quill(editorRef.current, {
                        theme: "snow",
                        modules: {
                            toolbar: [
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                ["bold", "italic", "underline", "strike"],
                                ["blockquote", "code-block"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                [{ script: "sub" }, { script: "super" }],
                                [{ indent: "-1" }, { indent: "+1" }],
                                [{ direction: "rtl" }],
                                [{ color: [] }, { background: [] }],
                                [{ font: [] }],
                                [{ align: [] }],
                                ["link", "image", "video"],
                                ["clean"],
                            ],
                        },
                    });

                    quillRef.current = quill;

                    if (value) {
                        quill.clipboard.dangerouslyPasteHTML(value);
                    }

                    quill.on("text-change", (delta, oldDelta, source) => {
                        if (source === "user") {
                            onChange(quill.root.innerHTML);
                        }
                    });
                }
            };
            
            initializeQuill();

        }, []);


        useEffect(() => {
             if (quillRef.current && value !== quillRef.current.root.innerHTML) {
                const currentSelection = quillRef.current.getSelection();
                quillRef.current.clipboard.dangerouslyPasteHTML(value);
                 if (currentSelection) {
                    setTimeout(() => quillRef.current?.setSelection(currentSelection.index, currentSelection.length), 0);
                 }
            }
        }, [value]);


        return <div ref={editorRef} style={{ minHeight: '300px', backgroundColor: 'white', color: 'black' }} />;
    }
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
