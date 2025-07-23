import { Spinner } from "@heroui/react"

const loading = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <Spinner variant="wave" size="lg" className="text-blue-600 mb-4" />
      </div>
    </div>
  )
}

export default loading