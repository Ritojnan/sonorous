import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";

const StyleSelector = ({
  initialData,
  setInitialData,
  loading,
  setLoading,
  handleUpdateChatbot,
}) => {
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 400;
          const maxHeight = 400;
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);

          // Compress the image to JPEG format with reduced quality
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality as needed

          setImageSrc(compressedBase64);

          // Convert compressed base64 string to bytes array
          const base64String = compressedBase64.split(",")[1];
          const bytes = atob(base64String)
            .split("")
            .map((char) => char.charCodeAt(0));

          setInitialData({
            ...initialData,
            imgData: bytes,
          });
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log(initialData);
  }, [initialData]);

  const handleBlur = (colorType, value) => {
    console.log(`${colorType} color: ${value}`);
  };

  return (
    <form onSubmit={handleUpdateChatbot}>
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="mb-4 flex items-center">
            <Input
              type="color"
              id="primaryColor"
              name="primaryColor"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              onBlur={(e) => handleBlur("Primary", e.target.value)}
              className="w-20"
            />
            <Label
              htmlFor="primaryColor"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Primary Color
            </Label>
          </div>
          <div className="flex items-center">
            <Input
              type="color"
              id="secondaryColor"
              name="secondaryColor"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              onBlur={(e) => handleBlur("Secondary", e.target.value)}
              className="w-20"
            />
            <Label
              htmlFor="secondaryColor"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Secondary Color
            </Label>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {imageSrc && (
          <div className="flex items-center justify-center mt-4">
            <img
              src={imageSrc}
              alt="Uploaded"
              className="w-24 h-24 object-cover rounded-lg border border-gray-300"
            />
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Chatbot"}
        </Button>
      </div>
    </form>
  );
};

export default StyleSelector;
