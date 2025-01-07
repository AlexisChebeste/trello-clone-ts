interface CardProps {
    title: string
  }
  
  export default function Card({ title }: CardProps) {
    return (
      <div className="bg-white p-2 rounded-xl pl-3 mr-1 mb-2 shadow-card  flex items-center">
        <p className="text-sm">{title}</p>
      </div>
    )
  }
  
  