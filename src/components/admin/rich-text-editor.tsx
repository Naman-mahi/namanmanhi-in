
"use client";

import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor = forwardRef<any, RichTextEditorProps>(
    ({ value, onChange }, ref) => {
        const editorRef = useRef<HTMLDivElement>(null);
        const quillRef = useRef<Quill | null>(null);

        // Expose Quill instance to parent components if needed
        useImperativeHandle(ref, () => ({
            getQuill: () => quillRef.current,
        }));

        useEffect(() => {
            if (editorRef.current && !quillRef.current && typeof window !== 'undefined') {
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

                // Set initial content
                if (value) {
                    quill.clipboard.dangerouslyPasteHTML(value);
                }

                // Listen for changes
                quill.on("text-change", (delta, oldDelta, source) => {
                    if (source === "user") {
                        onChange(quill.root.innerHTML);
                    }
                });
            }

            // Cleanup on unmount
            return () => {
                if (quillRef.current) {
                    quillRef.current.off("text-change");
                }
            };
        }, []); // Empty dependency array ensures this runs only once on mount


        // Update Quill content if the 'value' prop changes from outside
        useEffect(() => {
             if (quillRef.current && value !== quillRef.current.root.innerHTML) {
                const currentSelection = quillRef.current.getSelection();
                quillRef.current.clipboard.dangerouslyPasteHTML(value);
                 if (currentSelection) {
                    // Restore selection if possible
                    setTimeout(() => quillRef.current?.setSelection(currentSelection.index, currentSelection.length), 0);
                 }
            }
        }, [value]);


        return <div ref={editorRef} style={{ minHeight: '300px', backgroundColor: 'white', color: 'black' }} />;
    }
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
