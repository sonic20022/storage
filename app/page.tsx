"use client";
import { useMemo, FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui";
import DocumentUpload from "@/components/DocumentUpload";
import { upload } from "@vercel/blob/client";

export default function Home() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleBrowserUpload = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!currentFile) {
      return; // prevent form from submitting
    }

    try {
      setUploading(true);
      console.log("uploading");
      const newBlob = await upload(currentFile.name, currentFile, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      console.log(newBlob);
      setUploading(false);
      setCurrentFile(null);
    } catch (error) {
      setUploading(false);
      console.error("An error occurred while uploading the file: ", error);
    }
  };
  return (
    <main className="">
      <h1 className="text-3xl font-bold text-center mt-24 mb-12">@vercel/blobs</h1>
      <form className="w-[500px] mx-auto" encType="multipart/form-data" onSubmit={handleBrowserUpload}>
        <DocumentUpload currentFile={currentFile} setCurrentFile={setCurrentFile} />
        <Button type="submit" className="w-full mt-10" disabled={uploading || !currentFile}>
          Upload Document
        </Button>
      </form>
    </main>
  );
}
