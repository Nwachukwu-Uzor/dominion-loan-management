import React, { useRef, useState } from "react";
import { Container, PageTitle } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { Card } from "@/components/ui/card";
import { MdOutlineCloudUpload } from "react-icons/md";

const NewBulkNotification = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const file = Array.from(e.dataTransfer.files)[0];

    if (file) {
      setUploadedFile(file);
    }
  };
  return (
    <Container>
      <PageTitle title="New Bulk Notification" />
      <Link
        to="/bulk-notifications"
        className="text-black my-2 flex items-center font-bold text-sm hover:opacity-75 gap-1"
      >
        <IoChevronBack /> Back
      </Link>
      <Card className="rounded-sm">
        <p className="text-sm font-medium">
          Create bulk notification by uploading a formatted .CSV sheet
        </p>
        <button className="my-1 text-[#7E21CF] font-bold">
          Download Sample CSV
        </button>
        <div className="max-w-[400px]">
          <div
            className={`${dragging ? "opacity-60 bg-gray-500 rounded-lg" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <label
              htmlFor="bulk-file"
              className={`mt-4 border-2 border-dashed border-[#A8A8A8] flex flex-col items-center justify-center gap-[10px] p-4 py-10 lg:py-6 lg:p-6 rounded-lg cursor-pointer`}
            >
              <p className="flex items-center justify-center h-12 w-12 lg:h-[60px] lg:w-[60px] rounded-full bg-gray-200 active:scale-95 duration-150">
                <MdOutlineCloudUpload className="text-3xl" />
              </p>
              <div>
                <p className="mt-2 text-center">
                  <strong>Click to upload</strong> or drag and drop Only .CSV
                  files are allowed
                </p>
              </div>
            </label>
          </div>
          <input
            type="file"
            name="bulk-file"
            id="bulk-file"
            hidden
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          {/* {isError && (
          <p className="text-sm text-red-600 font-semibold my-2">
            {formatAPIError(error)}
          </p>
        )} */}
          {uploadedFile && (
            <div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-[100px] bg-green-700"></div>
                  <h3 className="font-semibold text-green-700">
                    {uploadedFile.name}
                  </h3>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Button>Process Bulk</Button>
                  <Button
                    onClick={handleClearFile}
                    className="bg-gray-800 text-white"
                  >
                    Clear File
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Container>
  );
};

export default NewBulkNotification;
