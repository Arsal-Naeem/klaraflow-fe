import { ReactNode } from "react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"

type FormBuilderProps = {
  form: UseFormReturn<any>
  onSubmit: (data: any) => void
  children: ReactNode
  submitText?: string
  className?: string
  isLoading?: boolean
}

export function FormBuilder({ 
  form, 
  onSubmit, 
  children, 
  submitText = "Submit", 
  className = "",
  isLoading = false 
}: FormBuilderProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
        {children}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Loading..." : submitText}
        </Button>
      </form>
    </Form>
  )
}