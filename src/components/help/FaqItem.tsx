import * as React from "react"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItemProps {
  item: {
    id: string
    question: string
    answer: string
  }
}

export function FaqItem({ item }: FaqItemProps) {
  return (
    <AccordionItem value={item.id}>
      <AccordionTrigger className="text-left text-xl font-headline">{item.question}</AccordionTrigger>
      <AccordionContent className="text-lg">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  )
}
