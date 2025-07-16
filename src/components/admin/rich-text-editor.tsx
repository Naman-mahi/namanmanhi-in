
"use client";

import { forwardRef } from "react";
import { Textarea } from "../ui/textarea";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

// A simple fallback editor that allows editing raw HTML in a textarea.
// This replaces react-quill to avoid persistent compatibility issues with React 18.
export const RichTextEditor = forwardRef<HTMLTextAreaElement, RichTextEditorProps>(
    ({ value, onChange, ...props }, ref) => {
    return (
        <Textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Main content (HTML is supported)..."
            rows={15}
            {...props}
        />
    );
});

RichTextEditor.displayName = 'RichTextEditor';
