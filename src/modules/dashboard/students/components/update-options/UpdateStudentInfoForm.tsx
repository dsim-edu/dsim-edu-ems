"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { CustomBtn } from "@/components/ui/custom-button";
import { DatetimePicker } from "@/components/ui/datetime-picker";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { showMessageOrError } from "@/lib/show-message-error";
import { GENDER_ARRAY } from "@/modules/dashboard/students/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CloudUpload, Delete, Paperclip } from "lucide-react";
import Image from "next/image";
import { UpdateStudentSchema } from "../../schema/student.schema";
import { updateStudent } from "../../server/student.action";
import { DBStudentType, UpdateStudentSchemaType } from "../../types";
import { getBase64String } from "@/lib/file-to-base64";

export default function UpdateStudentInfoForm({
  data,
}: {
  data: DBStudentType;
}) {
  const qc = useQueryClient();
  const [files, setFiles] = useState<File[] | null>(null);
  // checking the data

  // ✅ Ensure hooks are always called, even if `queryPending` is true
  const form = useForm<UpdateStudentSchemaType>({
    resolver: zodResolver(UpdateStudentSchema),
    defaultValues: data
      ? {
          address: data.address || "",
          admissionTimePaid: data.admissionTimePaid
            ? data.admissionTimePaid
            : 0,
          fatherName: data.fatherName || "",
          motherName: data.motherName || "",
          imageUrl: data.imageUrl || undefined,
          imagePublicId: data.imagePublicId || undefined,
          name: data.name,
          gender: data.gender,
          course: data.course,
          sessionRange: data.sessionRange,
          dateOfBirth: new Date(data.dataOfBirth),
          physicalCondition: data.physicalCondition
            ? data.physicalCondition
            : undefined,
        }
      : {
          address: "",
          admissionTimePaid: 0,
          fatherName: "",
          motherName: "",
          imageUrl: undefined,
          imagePublicId: undefined,
          name: "",
          dateOfBirth: new Date(),
          physicalCondition: "",
        },
  });

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: updateStudent,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc, ["single_student", "table_students"]);
    },
  });
  async function onSubmit(values: UpdateStudentSchemaType) {
    console.log("clicked", values);

    const newData = { ...data, ...values };
    if (files?.length) {
      const base64 = await getBase64String(files[0]);
      mutate({ student: newData, base64 });
    } else {
      mutate({ student: newData, base64: null });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mx-auto py-10 text-white"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
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
                ) : field.value ? (
                  <div className="relative ">
                    <Delete
                      className="text-red-500 my-2 cursor-pointer"
                      onClick={() => form.setValue("imageUrl", "")}
                    />
                    <Image
                      src={field.value}
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
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth *</FormLabel>
              <DatetimePicker
                dtOptions={{
                  date: undefined,
                  hour12: true,
                }}
                {...field}
                format={[["days", "months", "years"]]}
              />

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-gray-500">Course *</FormLabel>
              <FormControl>
                <Input placeholder="amount" disabled type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sessionRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-gray-500">Session Range *</FormLabel>
              <FormControl>
                <Input placeholder="amount" disabled type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter address"
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
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender *</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  {GENDER_ARRAY.map((option, index) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={index}
                    >
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormDescription>Select your gender</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="physicalCondition"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Physical condition *</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  {[
                    ["Normal", "normal"],
                    ["Abnormal", "abnormal"],
                  ].map((option, index) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={index}
                    >
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="admissionTimePaid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Addmission Time paid</FormLabel>
              <FormControl>
                <Input
                  placeholder="amount"
                  type="number"
                  value={field.value}
                  onChange={(e) =>
                    form.setValue("admissionTimePaid", Number(e.target.value))
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <CustomBtn pending={isPending} variant={"signature"} type="submit">
          Update
        </CustomBtn>
      </form>
    </Form>
  );
}
