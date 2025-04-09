"use client";
import { CustomBtn } from "@/components/ui/custom-button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getBase64String } from "@/lib/file-to-base64";
import { showMessageOrError } from "@/lib/show-message-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CloudUpload, Delete, Paperclip } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { teacherSchema } from "../schema/teacher.schema";
import { createTeacher } from "../server/teacher.action";
import { TeacherSchemaType } from "../types/type";

export default function CreateTeacher() {
  const qc = useQueryClient();
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<TeacherSchemaType>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone_number: "",
      salary: "",
      education_des: "",
    },
  });

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: createTeacher,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc, ["teachersa"]);
      if (info.message) {
        form.reset();
        setFiles([]);
      }
    },
  });

  async function onSubmit(values: TeacherSchemaType) {
    if (files?.length) {
      const base64 = await getBase64String(files[0]);
      mutate({ teacher: values, base64 });
    } else {
      mutate({ teacher: values, base64: null });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl mx-auto py-10 text-white"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileFile"
          render={() => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                {files?.length ? (
                  <div className="relative ">
                    <Delete
                      className="text-red-500 my-2 cursor-pointer"
                      onClick={() => setFiles([])}
                    />
                    <Image
                      src={URL.createObjectURL(files[0])}
                      height={200}
                      width={200}
                      alt="student-img"
                      className="rounded-md"
                    />
                  </div>
                ) : (
                  <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropZoneConfig}
                    className="relative bg-black/20 rounded-lg p-2"
                  >
                    <FileInput
                      id="fileInput"
                      className="outline-dashed outline-1 outline-slate-500"
                    >
                      <div className="flex items-center justify-center flex-col p-8 w-full ">
                        <CloudUpload className="text-gray-500 w-10 h-10" />
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {files &&
                        files.length > 0 &&
                        files.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                )}
              </FormControl>
              {!files?.length && (
                <FormDescription>Select a file to upload.</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone NO. *</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education_des"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Educational Qualifications *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="eg: Master in arts"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fixed Salary *</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <CustomBtn pending={isPending} variant={"signature"} type="submit">
          Submit
        </CustomBtn>
      </form>
    </Form>
  );
}
