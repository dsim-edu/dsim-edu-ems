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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  COURSE_ARRAY,
  GENDER_ARRAY,
  SESSION_RANGES,
} from "@/modules/dashboard/students/constants";
import { getBase64String } from "@/lib/file-to-base64";
import { showMessageOrError } from "@/lib/show-message-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CloudUpload, Delete, Paperclip } from "lucide-react";
import Image from "next/image";
import { AddStudentSchema } from "../../schema/student.schema";
import { createStudent } from "../../server/student.action";
import { AddStudentSchemaType } from "../../types";

export default function CreateStudentForm() {
  const qc = useQueryClient();
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<AddStudentSchemaType>({
    resolver: zodResolver(AddStudentSchema),
    defaultValues: {
      address: "",
      admissionTimePaid: "",
      fatherName: "",
      motherName: "",
      name: "",
      gender: "male",
      course: "Hifz",
      session_range: "no_session",
      dateOfBirth: undefined,
    },
  });

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: createStudent,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc);
      if (info.message) {
        form.reset();
        setFiles([]);
      }
    },
  });

  async function onSubmit(values: AddStudentSchemaType) {
    if (files?.length) {
      const base64 = await getBase64String(files[0]);
      mutate({ student: values, base64 });
    } else {
      mutate({ student: values, base64: null });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 text-white"
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
          name="imageFile"
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
            <FormItem>
              <FormLabel>Course *</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COURSE_ARRAY.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="session_range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Range *</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SESSION_RANGES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
                <Input placeholder="amount" type="number" {...field} />
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
