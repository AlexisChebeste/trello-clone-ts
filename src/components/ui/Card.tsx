interface CardProps {
    title: string
  }
  
  export default function Card({ title }: CardProps) {
    return (
      <div className="bg-white p-2 rounded-xl  mr-1 mb-2 shadow-card  flex items-center">
        <p className="ml-2 text-sm">{title}</p>
      </div>
    )
  }
  
  