import { ReactNode } from "react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"

type FormBuilderProps = {
  form: UseFormReturn<any>
  onSubmit: (data: any) => void
  children: ReactNode
  className?: string
}

export function FormBuilder({ 
  form, 
  onSubmit, 
  children, 
  className = "",
}: FormBuilderProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
        {children}
      </form>
    </Form>
  )
}