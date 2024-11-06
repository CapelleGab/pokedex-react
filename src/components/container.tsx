interface Props{
    children?: React.ReactNode
    className?: String
}

export default function Container({children, className} : Props) {
    return (
        <div className={className + "m-4 w-auto px-6 py-2 radius rounded-lg bg-gray-400"}>
            {children}
        </div>
    )
}