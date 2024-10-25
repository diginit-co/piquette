  
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export default function OrganizationIndex() {
    return (
        <>[List Organizations]</>
    )
}