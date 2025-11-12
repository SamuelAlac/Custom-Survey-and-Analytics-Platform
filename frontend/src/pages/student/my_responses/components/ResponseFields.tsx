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