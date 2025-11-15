interface ResponseFieldProps {
    ans: any;
    index: number;
}

export const McqResponse = ({ ans, index }: ResponseFieldProps) =>{
    return (
        <div className="bg-[#F0F6FF] min-h-fit p-5 space-y-3">
            <h1 className="text-2xl font-semibold">{index + 1}. {ans?.question_text}</h1>
            <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#F37611] rounded-full"></div>
            <p className="text-[#595959]">{ans?.answer}</p>
            </div>
        </div>
    )
}

export const LikertResponse = ({ ans, index }: ResponseFieldProps) =>{
    return (
        <div className="bg-[#F0F6FF] min-h-fit p-5 space-y-3">
            <h1 className="text-2xl font-semibold">{index + 1}. {ans?.question_text}</h1>
            <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#F37611] rounded-full"></div>
            <p className="text-[#595959]">{ans?.answer}</p>
            </div>
        </div>
    )
}

export const TextResponse = ({ ans, index }: ResponseFieldProps) =>{
    return (
        <div className="bg-[#F0F6FF] min-h-fit p-5 space-y-3">
            <h1 className="text-2xl font-semibold">{index + 1}. {ans?.question_text}</h1>
            <p className="text-[#595959]">{ans?.answer}</p>
        </div>
    )
}

export const McqResponseSkeleton = () =>{
    return (
        <div className="bg-[#F0F6FF]/80 min-h-fit p-5 space-y-3">
            <h1 className="text-2xl font-semibold skeleton h-5 w-100"></h1>
            <div className="flex items-center gap-3">
            <div className="w-5 h-5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-70"></p>
            </div>
        </div>
    )
}

export const LikertResponseSkeleton = () =>{
    return (
        <div className="bg-[#F0F6FF]/80 min-h-fit p-5 space-y-3">
            <h1 className="text-2xl font-semibold skeleton h-5 w-100"></h1>
            <div className="flex items-center gap-3">
            <div className="w-5 h-5 skeleton rounded-full"></div>
            <p className="text-[#595959] skeleton h-5 w-70"></p>
            </div>
        </div>
    )
}

export const TextResponseSkeleton = () =>{
    return (
        <div className="bg-[#F0F6FF]/80 min-h-fit p-5 space-y-3">
            <h1 className="text-2xl font-semibold skeleton h-5 w-100"></h1>
            <p className="text-[#595959] skeleton p-5 w-200"></p>
        </div>
    )
}