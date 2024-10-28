interface ColumnProps {
    children: React.ReactNode;
}

export default function Column({ children }: ColumnProps) {
    return (
        <div className="w-full space-y-5 container px-4 sm:px-6 lg:px-8 py-10">
            {children}
        </div>
    )
}