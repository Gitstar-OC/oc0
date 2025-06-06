import { 
  Heading, 
  type SectionProps 
} from "../shared-components"

export function CaseSection({ fontProperties, updateProperty }: SectionProps) {
  const caseOptions = [
    { value: "none", label: "Aa" },
    { value: "uppercase", label: "AA" },
    { value: "lowercase", label: "aa" },
    { value: "capitalize", label: "Aa" },
  ]

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <Heading>Case</Heading>
        <div className="bg-accent rounded-lg p-0.5 flex">
          {caseOptions.map((caseOption) => (
            <button
              key={caseOption.value}
              className={`h-6 w-7 rounded-md text-xs font-medium transition-all ${
                fontProperties.textTransform === caseOption.value
                  ? "bg-background text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => updateProperty("textTransform", caseOption.value)}
            >
              {caseOption.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
