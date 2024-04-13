"use client"
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react"
import FileUpload from "../file-upload"
import { useRouter } from "next/navigation"

const schema = z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    }),
    imageUrl: z.string().min(1, {
        message: "Server icon is required"
    })
})

export const InitialModal = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {

            await axios.post("/api/server", data)

            form.reset();

            router.refresh();
            window.location.reload();

        } catch (error) {
            console.log("Error creating server");
            
            console.log(error);

        }
    }

    useEffect(() => {
        setIsMounted(true)

    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500" >
                        Give your server a personality with a name and an icon.You can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 space-x-6">
                            <div className=" flex justify-center items-center text-center">
                                <FormField control={form.control} name="imageUrl"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="imageUrl" className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server Icon</FormLabel>
                                            <FormControl>

                                                <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField control={form.control} name="name"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="name" className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" {...field} />

                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button type="submit" disabled={isLoading} variant="primary">
                                Create Server
                            </Button>

                        </DialogFooter>

                    </form>
                </Form>

            </DialogContent>


        </Dialog>
    )
}