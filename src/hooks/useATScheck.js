import ATSchecker from "@/Apis/ATS";
import { useMutation } from "@tanstack/react-query";

export function useATScheck(){
    const { isPending, isSuccess, error, mutateAsync } = useMutation({
        mutationFn: ATSchecker,
        onSuccess:(data) => {
            if (data.success == false) {
                throw new Error(data.message);
            }
            console.log(data);
            return data;
        },
        onError:(data) => {
            console.log(data);
            return data;
        }
    })

    return {
        isPending,
        isSuccess,
        error,
        mutateAsync
    }
}

export default useATScheck;