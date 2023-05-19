import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton'


const setContent = (process, Component, data) => {
    switch(process){
        case "Waiting": 
            return <Skeleton/>
            break;
        case "Loading": 
            return <Spinner/>
            break;
        case "Confirmed":
            return <Component data={data}/>
            break;
        case "Error": 
            return <ErrorMessage/>
            break
        default:
            throw new Error("Unexpected process state")
        
    }
}

export default setContent