import { FaExclamationCircle } from "react-icons/fa";

interface ErrorMsgProps {
  errMsg: string;
}

export default function ErrorMsg({ errMsg }: ErrorMsgProps) {
  return (
    <div className="flex items-center justify-center text-red-600 w-[20rem] bg-gray-200 mx-auto h-[6rem] border border-gray-400 rounded font-semibold">
      <FaExclamationCircle className="mr-2" size={50} />
      <span>{errMsg}</span>
    </div>
  );
}
